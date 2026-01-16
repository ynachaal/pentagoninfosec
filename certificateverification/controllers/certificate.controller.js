const mongoose = require("mongoose");
const Certificate = mongoose.model("Certificate");
const CertificateType = mongoose.model("CertificateType");
const {
  generateCertificateNumber,
} = require("../utils/generate-certicate-number");
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const fs = require('fs');
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEYID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

// const listObjects = async () => {
//   const params = {
//     Bucket: AWS_S3_BUCKET_NAME
//   };

//   try {
//     const data = await s3.listObjectsV2(params).promise();
//     return data.Contents;
//   } catch (error) {
//     console.error('Error listing objects:', error);
//     throw error;
//   }
// };

// const getSignedUrl = async (bucketName, key) => {
//   const params = {
//     Bucket: bucketName,
//     Key: key,
//     Expires: 13600
//   };

//   try {
//     const url = await s3.getSignedUrlPromise('getObject', params);
//     return url;
//   } catch (error) {
//     console.error('Error generating signed URL:', error);
//     throw error;
//   }
// };

// get all certificates
module.exports.getCertificates = async (req, res, next) => {
  try {
    const perPage = req.query.perPage || 10;
    const currentPage = req.query.page || 1;

    const certificates = await Certificate.find({ isDeleted: false }).limit(perPage).sort({ createdAt: -1 })
      .skip(+perPage * +(currentPage - 1));
    const totalCount = await Certificate.find({ isDeleted: false }).countDocuments().lean();

    certificates.forEach((certificate) => {
      const evidenceUrls = [];
      for (const evd of certificate.evidence) {
        const evidence = evd.split('.com/')[1];
        const params = {
          Bucket: AWS_S3_BUCKET_NAME,
          Key: evidence,
          Expires: 13600 // URL expiration time in seconds (e.g., 1 hour = 3600)
        };
        const url = s3.getSignedUrl('getObject', params);
        evidenceUrls.push(url);
      }
      certificate.evidence = evidenceUrls;

      // const url = await getSignedUrl(AWS_S3_BUCKET_NAME, evidence);
      // if (!certificate.evidence.includes(baseURL)) {
      //   const evidence = certificate.evidence.split('.com/')[1];
      //   if (s3BucketUrlKeys.includes(evidence)) {
      //     const evidenceUrl = s3BucketUrls.find(urlOb => {
      //       return urlOb.key === evidence
      //     });
      //     if (evidenceUrl && evidenceUrl.url) {
      //       certificate.evidence = evidenceUrl.url;
      //     }
      //   }
      // }
    });

    if (!certificates || certificates.length < 1) {
      return res.status(200).json({
        success: true,
        message: "No expiring or expired certificates.",
        certificates: [],
        totalCount: totalCount
      });
    }
    return res.status(200).json({
      success: true,
      certificates: certificates,
      message: "Cerificates fetched successfully!",
      totalCount: totalCount
    });
  } catch (err) {
    return next(err);
  }
};

// get single certificate based on CERTIFICATE NUMBER
module.exports.getCertificate = async (req, res, next) => {
  try {
    if (!req.query.certificateNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide certificate number to get vertified.",
      });
    }
    const certificate = await Certificate.findOne({
      certicateNumber: req.query.certificateNumber,
      isDeleted: false,
    });
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "No certificate found.",
      });
    }
    return res.status(200).json({
      success: true,
      certificate: certificate,
      message: "Cerificate verified successfully.",
    });
  } catch (err) {
    return next(err);
  }
};

// controller to start generating certificate number
module.exports.generateCertificate = async (req, res, next) => {
  try {
    if (!req.body.issueBy || req.body.issueBy === 'undefined') {
      return res.status(422).json({
        success: false,
        message: "Please provide the name of person providing the certificate",
      });
    }

    if (!req.files || req.files.length <= 0) {
      return res.status(422).json({
        success: false,
        message: "Please provide an evidence file",
      });
    }
    // Set the starting number for OTPs
    const findCertificateType = await CertificateType.findOne({
      valueOfCertificate: req.body.certicateNamePostFix,
    });
    if (!findCertificateType) {
      return res.status(404).json({
        success: false,
        message: "No certificate type found with this value.",
      });
    };
    const startingNumber =
      process.env.CERTIFICATE_PREFIX +
      req.body.certicateNamePostFix.replace(/ /g, '-') +
      "-" +
      100001;
    // Generate and save the certificate
    const savedCertificate = await generateAndSaveCertificate(
      startingNumber,
      req,
      next
    );
    if (!savedCertificate) {
      return res.status(500).send({
        success: false,
        message: "An error occurred! Please try again.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Certificate created successfully!",
      certificate: savedCertificate,
    });
  } catch (err) {
    return next(err);
  }
};

// Genrate certificate and check if exists in database
const generateAndSaveCertificate = async (startingNumber, req, next) => {
  try {
    let certificateNumber = generateCertificateNumber(startingNumber);
    const existingCertificate = await Certificate.find()
      .sort({ createdAt: -1 })
      .limit(1);
    if (existingCertificate && existingCertificate.length > 0) {
      certificateNumber = existingCertificate[0].certicateNumber;
      const delimiter = "-";
      let lastIndex = certificateNumber.lastIndexOf(delimiter);
      let incrementedNumber = +certificateNumber.split("-")[1] + 1;
      if (lastIndex !== -1) {
        // let firstPart = certificateNumber.substring(0, lastIndex);
        incrementedNumber = +certificateNumber.substring(lastIndex + 1) + 1;
      }

      startingNumber =
        process.env.CERTIFICATE_PREFIX +
        (req.body.certicateNamePostFix.includes(' ') ? req.body.certicateNamePostFix.replace(/ /g, '-') : req.body.certicateNamePostFix) +
        "-" +
        incrementedNumber;
      certificateNumber = generateCertificateNumber(startingNumber);
    }
    try {
      const evidences = [];
      for (const file of req.files) {
        const fileContent = fs.readFileSync(file.path);
        const params = {
          Bucket: AWS_S3_BUCKET_NAME,
          Key: process.env.AWS_S3_BUCKET_FOLDER + file.filename,
          Body: fileContent,
          ContentType: file.mimetype
        };
        try {
          const location = await multipartUpload(file.path, params.Bucket, params.Key, file.mimetype);
          evidences.push(location);
        } catch (err) {
          console.error("Error uploading file to S3", err);
        }
      };
      // const params = {
      //   Bucket: AWS_S3_BUCKET_NAME,
      //   Key: process.env.AWS_S3_BUCKET_FOLDER + req.file.filename,
      //   Body: fileContent,
      //   ContentType: req.file.mimetype
      // };

      // const data = await s3.upload(params).promise();

      const certicate = new Certificate({
        certificateName: req.body.certificateName,
        certicateNamePostFix: req.body.certicateNamePostFix,
        certicateNumber: certificateNumber,
        companyName: req.body.companyName,
        issuedDate: req.body.issuedDate,
        validTill: req.body.validTill,
        // approvedOn: req.body.approvedOn,
        association: req.body.association,
        evidence: evidences,
        issueBy: req.body.issueBy,
        issueTo: req.body.issueTo,
        notes: req.body.notes,
        isDeleted: false
      });

      const savedCertificate = await certicate.save();
      return savedCertificate;
    } catch (error) {
      const baseURL = `${req.protocol}://${req.get('host')}`;
      const evidences = [];
      for (const file of req.files) {
        evidences.push(baseURL + '/' + process.env.UPLOAD_FOLDER + '/' + file.filename);
      };
      const certicate = new Certificate({
        certicateName: req.body.certicateName,
        certicateNamePostFix: req.body.certicateNamePostFix,
        certicateNumber: certificateNumber,
        companyName: req.body.companyName,
        issuedDate: req.body.issuedDate,
        validTill: req.body.validTill,
        // approvedOn: req.body.approvedOn,
        association: req.body.association,
        evidence: evidences,
        issueBy: req.body.issueBy,
        issueTo: req.body.issueTo,
        notes: req.body.notes,
        isDeleted: false
      });

      const savedCertificate = await certicate.save();
      return savedCertificate;
    }

  } catch (error) {
    return next(error);
  }
};

const multipartUpload = async (filePath, bucketName, key, fileMimeType) => {
  const fileContent = fs.readFileSync(filePath);
  // const params = {
  //   Bucket: bucketName,
  //   Key: key,
  //   Body: fileContent,
  //   ContentType: fileMimeType
  // };

  const multipartMap = {
    Parts: []
  };

  const partSize = 1024 * 1024 * 5; // 5 MB
  const numParts = Math.ceil(fileContent.length / partSize);

  const createMultipartUpload = async () => {
    const multipart = await s3.createMultipartUpload({
      Bucket: bucketName,
      Key: key,
      ContentType: fileMimeType
    }).promise();

    return multipart.UploadId;
  };

  const uploadPart = async (uploadId, partNumber, partParams) => {
    const uploadPartParams = {
      ...partParams,
      UploadId: uploadId,
      PartNumber: partNumber,
    };

    const part = await s3.uploadPart(uploadPartParams).promise();
    multipartMap.Parts[partNumber - 1] = {
      ETag: part.ETag,
      PartNumber: partNumber
    };
  };

  const completeMultipartUpload = async (uploadId) => {
    const completeParams = {
      Bucket: bucketName,
      Key: key,
      MultipartUpload: multipartMap,
      UploadId: uploadId,
    };

    return await s3.completeMultipartUpload(completeParams).promise();
  };

  try {
    const uploadId = await createMultipartUpload();

    const uploadPromises = [];
    for (let i = 0; i < numParts; i++) {
      const partParams = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent.slice(i * partSize, (i + 1) * partSize),
      };

      uploadPromises.push(uploadPart(uploadId, i + 1, partParams));
    }

    await Promise.all(uploadPromises);

    const result = await completeMultipartUpload(uploadId);
    return decodeURIComponent(result.Location);
  } catch (error) {
    console.error('Error during multipart upload', error);
    throw error;
  }
};

// Soft delete certificate
module.exports.softDeleteCertificate = async (req, res, next) => {
  try {
    const existingCertificate = await Certificate.findOne({
      certicateNumber: req.body.certicateNumber,
    });
    if (!existingCertificate) {
      return res.status(404).json({
        success: false,
        message: "No certificate found.",
      });
    }
    existingCertificate.isDeleted = true;
    const savedCertificateType = await existingCertificate.save();
    if (!savedCertificateType) {
      return res.status(404).json({
        success: false,
        message: "No certificate found.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Deleted Successfully!",
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.postGetInTouchMail = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_AUTH_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_AUTH_EMAIL,
        pass: process.env.MAILER_AUTH_PASS
      }
    });

    const mailOptions = {
      from: `${req.body.firstName} ${req.body.lastName} <${process.env.ADMIN_EMAIL}>`,
      to: process.env.MAIL_RECIEVER,
      subject: `Query on Pentagon from GET IN TOUCH section`,
      html: `<h2>Query from ${(req.body.firstName ? req.body.firstName : '') + ' ' + (req.body.lastName ? req.body.lastName : '')} </h2> 
            <h3> Email:  <strong>${req.body.email || 'N/A'}</strong></h3>
            <h3> Contact number:  <strong>${req.body.contactNumber || 'N/A'}</strong></h3>
            <h3> Company Name:  <strong>${req.body.companyName || 'N/A'}</strong></h3>
            <h3> Certificate/Service Type:  <strong>${req.body.certificateType || 'N/A'}</strong></h3>
            <h3> Message:  <strong>${req.body.message || 'N/A'}</strong></h3>
            `
    };
    let info = { response: 'Sending mail' };
    try {
      info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log('Error in mail', error)
    }

    res.send({
      res: info.response,
      message: 'E-mail sent successfully.',
      success: true
    });
  } catch (err) {
    return next(err);
  }
};


// get expired and expiring certificates within 15 days
module.exports.getExpiringCertificates = async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    // Calculate the date after 15 days
    const dateAfter15Days = new Date();
    dateAfter15Days.setDate(dateAfter15Days.getDate() + 15);
    const expiryDateAfter15Days = dateAfter15Days.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    // Construct the query;
    const query = {
      $and: [
        { isDeleted: false }, // filter for non-deleted items
        {
          $or: [
            { validTill: { $lte: currentDate } }, // expired items
            { validTill: { $gt: currentDate, $lte: expiryDateAfter15Days } } // expiring within 15 days
          ]
        }
      ]
    };

    const perPage = req.query.perPage || 10;
    const currentPage = req.query.page || 1;
    // if (req.query.perPage) {
    //   perPage = req.query.perPage;
    // }
    // if (req.query.page) {
    //   currentPage = req.query.page;
    // }
    const certificates = await Certificate.find(query).limit(perPage)
      .skip(+perPage * +(currentPage - 1)).sort({ createdAt: -1 });

    const totalCount = await Certificate.find(query).countDocuments();

    certificates.forEach((certificate) => {
      const evidence = certificate.evidence.split('.com/')[1];
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: evidence,
        Expires: 13600 // URL expiration time in seconds (e.g., 1 hour = 3600 sec)
      };

      const url = s3.getSignedUrl('getObject', params);
      certificate.evidence = url;
    });

    if (!certificates || certificates.length < 1) {
      return res.status(200).json({
        success: true,
        message: "No expiring or expired certificates.",
        certificates: [],
        totalCount: totalCount
      });
    }

    return res.status(200).json({
      success: true,
      certificates: certificates,
      message: "Expired and expiring certificates fetched successfully.",
      totalCount: totalCount
    });
  } catch (err) {
    return next(err);
  }
};