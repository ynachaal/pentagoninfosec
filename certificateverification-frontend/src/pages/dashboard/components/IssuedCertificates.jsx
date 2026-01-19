import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { DashboardContext } from '../context/DashboardContext';
import html2pdf from 'html2pdf.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#eb7f44',
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(id, companyName, expiredOn, certificateType, issuedOn, certicateNumber, association, issuedBy, notes, evidence) {
    return { id, companyName, expiredOn, certificateType, issuedOn, certicateNumber, association, issuedBy, notes, evidence };
}

let rows = [];

const IssuedCertificates = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { getIssuedCertificates, issuedCertificates, issuedTotalCount } = React.useContext(DashboardContext);

    React.useEffect(
        () => {
            getIssuedCertificates();
        }, []
    )

    const renderTableData = () => {
        rows = []
        issuedCertificates.map(cert => {
            rows.push(
                createData(cert._id, cert.companyName, cert.validTill, cert.certificateName, cert.issuedDate, cert.certicateNumber, cert.association, cert.issueBy, cert.notes, cert.evidence)
            )
        });
    }

    const handleChangePage = (event, newPage) => {
        const pagination = {
            page: newPage + 1,
            perPage: rowsPerPage
        }
        getIssuedCertificates(pagination);
        renderTableData();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        const pagination = {
            page: 1,
            perPage: event.target.value
        }
        getIssuedCertificates(pagination);
        renderTableData();
    };

    renderTableData();

    const generatePDF = (data) => {
        let content = '';
        let orientation_val = 'portrait';
        if (data.certificateType.includes('ISO') || data.certificateType.includes('iso')) {
            content = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                <title>Template</title>
                <style>
                    .pdf-wrapper {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-weight: 500;
                    }
                    .pdf-container {
                    width: 90%;
                    margin: auto;
                    font-size: 13.5px;
                    padding-top: 20px;
                    }
                    .img {
                    margin: auto;
                    text-align: center;
                    }
                    .pdf-main {
                    margin-top: 20px;
                    margin: auto;
                    }
                    .pdf-main-content {
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 15px;
                    }
                    .head-content {
                    font-weight: bold;
                    border: 1px solid #dddd;
                    display: inline-block;
                    padding: 2px;
                    padding-bottom: 12px;
                    margin-top: 8px;
                    margin-bottom: 10px;
                    }
                    .content {
                    margin-bottom: 1px;
                    }
                    .para-content {
                    margin-top: 0px;
                    margin-bottom: 5px;
                    }
                    .footer {
                    text-align: center;
                    padding-top: 20px;
                    font-size: 13px;
                    font-weight: 500;
                    margin-top: 20px;
                    }
                    .footer p {
                    line-height: 1;
                    }
                    .Dear {
                    margin-bottom: 10px;
                    margin-top: 10px;
                    }
                    .Last-content {
                    display: flex;
                    font-size: 15px;
                
                    }
                    .Conclusion-cont {
                    margin-top: 5px;
                    margin-bottom: 5px;
                    }
                    .Approved {
                    font-size: 35px;
                    font-style: italic;
                    background-color: #edf3e6;
                    color: #416a1c;
                    border: 1px solid #dddd;
                    border-radius: 5px;
                    padding: 2px;
                    padding-bottom: 32px;
                    text-align: center;
                    }
                    .Approved-cont {
                    display: flex;
                    background-image: url();
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    }
                    .Approved-text {
                    font-size: 26px;
                    margin-top: 15px;
                    }
                    .Approved-content {
                    margin-top: 5px;
                    }
                    .conclusion-para {
                    margin-top: 15px;
                    font-size: 12.5px;
                    text-decoration: none;
                    }
                </style>
                </head>
                <body>
                    <div class="pdf-wrapper">
                    <div class="pdf-container">
                        <div class="img">
                        <img src="/assets/logo.png" alt="Logo">
                        </div>
                        <div class="pdf-main">
                        <p class="pdf-main-content">An ISO27001:2013 Certified Company</p>
                        <div class="">
                            <p class="head-content content">Date: ${data.issuedOn}</p><br />
                            <p class="head-content content">To: ${data.companyName}.</p><br />
                            <p class="head-content content">Subject: Certification of IT Systems Audit Accuracy</p>
                        </div>
                        <div class="">
                            <p class="Dear">Dear ${data.companyName},</p>
                            <p class="Dear">This document certifies that a comprehensive IT Systems Audit was conducted on</p>
                            <p class="">${data.issuedOn} by Techtweek Infotech LLC. The audit aimed to assess the accuracy,<br />
                            effectiveness, and security of your organization's IT systems, infrastructure, and related<br />
                            controls.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Audit Summary:</p>
                            <p class="para-content">The IT Systems Audit covered the following key areas:</p>
                        </div>
                        <div class="">
                            <p class="head-content">Network Architecture and Security:</p>
                            <p class=" para-content">Assessment of network design and security measures, including firewalls,
                            intrusion<br />
                            detection/prevention systems, and overall network security.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Access Controls:</p>
                            <p class=" para-content">Evaluation of access controls to ensure appropriate user privileges, authentication,
                            and<br />
                            authorization mechanisms.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Data Protection and Encryption:</p>
                            <p class="para-content ">Review of data protection measures, encryption protocols, and safeguards for
                            sensitive<br />
                            information.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Vulnerability Management:</p>
                            <p class=" para-content">Examination of vulnerability management processes, including regular<br />
                            scans and prompt addressing of identified vulnerabilities.</p>
                        </div>
                        </div>
                        <div class="footer">
                        <a href="http://www.techtweekinfotech.com" target="_blank" class="">www.techtweekinfotech.com</a>
                        <p class="">Email:contact@techtweekinfotech.com</p>
                        <p class="">Connect:+1 917-5085334</p>
                        <p class="">Corporate Office:30 N Gould St Ste r, Sheridan, WY 82801, United States</p>
                        <p class="">Development Centre:4th Floor, Mohali Tower, F 539, Phase 8B, Industrial Area, Sector 74, Sahibzada
                            Ajit <br /> Singh Nagar, Punjab-India 160055</p>
                        </div>
                    </div>
                    <div class="pdf-container">
                        <div class="pdf-main">
                        <div class="">
                            <p class="head-content">Incident Response and Recovery:</p>
                            <p class="para-content">Assessment of incident response and recovery procedures, ensuring a robust plan for
                            detecting and responding to security incidents.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Physical Security:</p>
                            <p class=" para-content">Evaluation of physical security controls to protect servers, data centres, and critical
                            IT
                            infrastructure (Hosted on WHM Provided by HostGator).</p>
                        </div>
                        <div class="">
                            <p class="head-content">Asset Management:</p>
                            <p class=" para-content">Verification of an effective system for managing IT assets, including hardware,
                            software,
                            and data.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Change Management:</p>
                            <p class="para-content ">Review of change management processes to ensure secure documentation, testing, and
                            implementation of system changes.</p>
                        </div>
                        <div class="">
                            <p class="head-content">IT Governance:</p>
                            <p class=" para-content">Evaluation of the overall IT governance framework, including decision-making
                            processes, risk management, and compliance monitoring.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Third-Party Assessments:</p>
                            <p class="para-content">Assessment of the security measures of third-party vendors and service providers.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Employee Training and Awareness:</p>
                            <p class=" para-content">Review of employee training programs on IT security and awareness of security policies.
                            </p>
                        </div>
                        <div class="">
                            <p class="head-content">Audit Trail and Logging:</p>
                            <p class=" para-content">Assessment of the effectiveness of audit trails and logging mechanisms.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Audit Findings:</p>
                            <p class="para-content ">Following a meticulous examination, we are pleased to report that the IT Systems Audit
                            found CWJ HEALTH SOLUTIONS 's IT systems to be accurate, secure, and compliant with
                            industry standards and regulatory requirements.</p>
                        </div>
                        </div>
                        <div class="footer">
                        <a href="http://www.techtweekinfotech.com" target="_blank" class="">www.techtweekinfotech.com</a>
                        <p class="">Email:contact@techtweekinfotech.com</p>
                        <p class="">Connect:+1 917-5085334</p>
                        <p class="">Corporate Office:30 N Gould St Ste r, Sheridan, WY 82801, United States</p>
                        <p class="">Development Centre:4th Floor, Mohali Tower, F 539, Phase 8B, Industrial Area, Sector 74, Sahibzada
                            Ajit <br /> Singh Nagar, Punjab-India 160055</p>
                        </div>
                    </div>
                    <div class="pdf-container">
                        <div class="pdf-main">
                        <div class="">
                            <p class="head-content">Certification:</p>
                            <p class="para-content">Based on the audit results, ${data.companyName} is hereby certified for maintaining
                            accurate and secure IT systems. This certification is valid until ${data.expiredOn}, at which
                            point a re-evaluation may be necessary.</p>
                        </div>
                        <div class="">
                            <p class="head-content">Conclusion:</p>
                            <p class=" para-content">We commend ${data.companyName} for their commitment to maintaining a robust
                            IT infrastructure. The successful completion of this audit is a testament to the
                            organization's dedication to information security and best practices.</p>
                        </div>
                        <div class="">
                            <p class=" para-content">Should you have any questions or require further clarification, please do not hesitate
                            to
                            contact us.</p>
                        </div>
                        <div class="Last-content">
                            <div class="Conclusion-cont">
                            <div class="">
                                <p class=" para-content ">Sincerely,</p>
                            </div>
                            <div class="">
                                <p class=" para-content ">${data.issuedBy}</p>
                            </div>
                            <div class="">
                                <p class=" para-content conclusion-para">Certified Information Security Auditor (ISACA)</p>
                            </div>
                            <div class="">
                                <p class=" para-content conclusion-para">Certificate Number: ${data.certicateNumber}</p>
                            </div>
                    
                            <div class="">
                                <p class=" para-content conclusion-para">Date of Certification: ${data.issuedOn}</p>
                            </div>
                            <div class="">
                                <p class=" para-content conclusion-para">Expiry of Certificate: ${data.expiredOn}</p>
                            </div>
                            <div class="">
                                <p class=" para-content conclusion-para">Verify Certificate at<a
                                    href="https://www.credly.com/badges/d6324c24-4537-421b-a0c1-b34a430c1c50">
                                    https://www.credly.com/badges/d6324c24-4537-421b-a0c1-b34a430c1c50</a> </p>
                            </div>
                            </div>
                            <div class="">
                            <p class='Approved'>APPROVED</p>
                            <div class='Approved-cont'>
                                <div class='Approved-text'>
                                <p>${data.issuedBy?.split(' ')[0]?.toUpperCase()} <br /> ${data.issuedBy?.split(' ')[1]?.toUpperCase()}</p>
                                </div>
                                <div class='Approved-content'>
                                <p>Digitally signed</p>
                                <p>by ${data.issuedBy?.toUpperCase()}</p>
                                <p>Date:</p>
                                <p>${data.issuedOn}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="footer" style="padding-bottom: 20px">
                            <a href="http://www.techtweekinfotech.com" target="_blank" class="">www.techtweekinfotech.com</a>
                            <p class="">Email:contact@techtweekinfotech.com</p>
                            <p class="">Connect:+1 917-5085334</p>
                            <p class="">Corporate Office:30 N Gould St Ste r, Sheridan, WY 82801, United States</p>
                            <p class="">Development Centre:4th Floor, Mohali Tower, F 539, Phase 8B, Industrial Area, Sector 74, Sahibzada
                            Ajit <br /> Singh Nagar, Punjab-India 160055</p>
                        </div>
                        </div>
                        </div>
                    </body>
                </html>
            `;
            orientation_val = 'portrait';
        }
        else {
           
            
          const certType = data.certificateType?.toUpperCase();

            let logo = '';

            if (certType?.includes('HIPAA')) {
                logo = '/assets/hipaa.webp';
            } else if (certType?.includes('SOC')) {
                logo = '/assets/SOC.png';
            }

            const showCertLogo = logo
                ? `
                    <div class="right-sign">
                        <img src="${logo}" alt="${certType} Logo" class="certi-iogo">
                    </div>
                `
                : '';

            content =
                ` <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <title>Document</title>
                        <style>
                        body {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                
                        .pdf-wrapper {
                            margin: auto;
                            text-align: center;
                            width: 297mm;
                            height: 210mm;
                            max-height: 210mm;
                        }
                
                        .pdf-image {
                            height: 100%;
                            width: 100%;
                            background-size: contain;
                            background-position: center;
                            background-repeat: no-repeat;
                            position: absolute;
                            top: 0;
                            z-index: 20
                        }
                
                        .pdf-main {
                            position: absolute;
                            top: 9.5%;
                            width: 100%;
                        }
                
                        .pdf-header h2 {
                            margin: 0;
                            padding: 0;
                        }
                
                        .pdf-header span {
                            font-size: 13px;
                            margin: 0 0 3px;
                            padding: 0;
                            letter-spacing: 1px;
                        }
                        .pdf-header .iso-text {
                            font-size: 12px;
                            margin: 0;
                            padding: 0;
                            letter-spacing: 1px;
                            line-height: 1.6;
                        }
                
                        .pdf-content-upper .pdf-title {
                            font-size: 56px;
                            margin: 0;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            display: block;
                            line-height: .8;
                        }
                        .pdf-title-bottom{
                            font-size: 22px;
                            text-transform: uppercase;
                            letter-spacing: 1.6px;
                            margin-top: 15px;
                            line-height: 1.8;
                        }
                        .text-primary{
                            color: #ff772b !important;
                        }
                        .pdf-content-upper .pdf-cert {
                            margin: 10px 0 0;
                            font-size: 27px;
                            font-weight: bold;
                            line-height: .8;
                        }
                
                        .pdf-content-upper h2 {
                            font-size: 22px;
                            line-height: .8;
                            margin-top: 30px;
                            margin-bottom: 0;
                            letter-spacing: 3.3px;
                            text-transform: uppercase;
                            display: block;
                        }
                
                        .pdf-content-upper h3 {
                            
                        }
                        .company-name{
                            font-size: 38px;
                            text-transform: uppercase;
                            letter-spacing: 1.6px;
                            margin-top: 4px;
                            line-height: 1.8;
                        }
                        .pdf-content-upper p {
                            font-family: "Roboto", sans-serif !important;
                            font-weight: 400 !important;
                            margin-top: 4px;
                            margin-bottom: 8px;
                            font-size: 18px;
                        }
                
                        .pdf-content-left {
                            float: left;
                            text-align: center;
                            max-width: 46%;
                            padding-left: 80px;
                        }
                
                        .pdf-content-left h1 {
                            font-size: 18px;
                            font-style: italic;
                            border: 1px solid #416a1c;
                            padding: 4px;
                            padding-bottom: 18px;
                            width: fit-content;
                            text-align: center;
                            margin: auto;
                            border-radius: 8px;
                            color: #416a1c;
                            background-color: #dde9d6;
                        }
                
                        .pdf-content-left .pdf-signed {
                            font-size: 14px;
                            margin: 6px;
                        }
                
                        .pdf-content-left .pdf-content-left-main {
                            display: flex;
                            align-items: center;
                            padding-left: 40px;
                        }
                
                        .pdf-content-left .pdf-content-left-main .pdf-content-left-side {
                            font-weight: 700;
                        }
                
                        .pdf-content-left .pdf-content-left-main .pdf-content-right-side {
                            font-size: 12px;
                            margin: 0;
                        }
                
                        .pdf-content-left .pdf-content-left-main .pdf-content-right-side p {
                            margin: 4px;
                        }
                
                        .pdf-content-left .pdf-content-left-down .main {
                            font-size: 16px;
                            font-weight: 700;
                            width: 100%;
                            padding-left: 30px;
                        }
                
                        .pdf-content-left .pdf-content-left-down .main-certi {
                            font-size: 12px;
                            font-weight: 700;
                            margin: 3px;
                            padding-left: 30px;
                            width: 100%;
                            color: #d8ae3a
                        }
                
                        .pdf-content-left .pdf-content-left-down .verify {
                            font-weight: 700;
                            font-size: 10px;
                            margin: 0;
                            padding-left: 50px;
                            text-align: center;
                        }
                
                        .pdf-content-left .pdf-content-left-down .link {
                            font-size: 10px;
                            margin: 0;
                            padding-left: 40px;
                            text-align: center;
                            width: 100%;
                            display: inline-block;
                        }
                
                        .pdf-content-left .pdf-content-left-down .main-certi.no {
                            padding-left: 40px;
                            text-align: left;
                            font-size: 14px;
                        }
                
                        .pdf-footer {
                            float: right;
                            position: absolute;
                            z-index: 1;
                            right: 17%;
                            bottom: 20%;
                            text-align: left;
                        }
                
                        .pdf-footer div {
                            font-size: 10px;
                            font-family: sans-serif;
                            margin: 2px;
                        }
                
                        .pdf-footer .pdf-footer-company {
                            font-weight: 600;
                            font-size: 12px;
                        }
                        .fw-normal{
                            font-weight: normal !important;
                        }
                        .d-block{
                            display: block !important;
                        }
                        .m-0{
                            margin: 0 !important;
                        }
                        @font-face {
                            font-family: 'Red Hat Display';
                            src: url('/assets/fonts/RedHatDisplay-Regular.ttf') format('truetype');
                            font-weight: 400;
                            font-style: normal;
                            font-display: swap;
                        }
                        @font-face {
                            font-family: 'Red Hat Display';
                            src: url('/assets/fonts/RedHatDisplay-Bold.ttf') format('truetype');
                            font-weight: 700;
                            font-style: normal;
                            font-display: swap;
                        }
                        @font-face {
                            font-family: 'Red Hat Display';
                            src: url('/assets/fonts/RedHatDisplay-Light.ttf') format('truetype');
                            font-weight: 300;
                            font-style: normal;
                            font-display: swap;
                        }
                        @font-face {
                            font-family: 'Vollkorn Regular';
                            src: url('/assets/fonts/Vollkorn-Regular.ttf') format('truetype');
                            font-weight: 400;
                            font-style: normal;
                            font-display: swap;
                        }
                        @font-face {
                            font-family: "Roboto";
                            src: url('/assets/fonts/Roboto-Regular.ttf') format('truetype');
                            font-weight: 400;
                            font-style: normal;
                            font-display: swap;
                        }
                        .font-roboto{
                            font-family: "Roboto", sans-serif !important;
                            font-weight: 400 !important;
                        }
                        .font-vollkorn{
                            font-family: "Vollkorn Regular", serif !important;
                            font-weight: 400 !important;
                        }
                        .font-light{
                            font-family: "Red Hat Display", sans-serif !important;
                            font-weight: 300 !important;
                        }
                        .font-regular{
                            font-family: "Red Hat Display", sans-serif !important;
                            font-weight: 400 !important;
                        }
                        .font-bold{
                            font-family: "Red Hat Display", sans-serif !important;
                            font-weight: 700 !important;
                        }
                        .pdf-bg {
                          position: absolute;
                          inset: 0;
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                          z-index: 0;
                        }
                        .approved-img{
                            width: 100px;
                            margin: 0 auto !important;
                            display: block !important;
                            padding-top: 13px;
                        }
                        .certi-iogo{
                            width: 100px;
                            margin: 0 !important;
                        }
                        .sign-and-logo{
                            display: flex;
                            gap: 40px;
                            justify-content: center;
                            align-items: center;
                            margin-top: 25px;
                        }
                        .signedby{
                            font-size: 27px;
                            position: relative;
                            width: fit-content;
                            margin: 0 auto;
                            text-align: center;
                        }
                        .signedby:after{
                            content: '';
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            right: 0;
                            margin: auto;
                            display:block;
                            width: 98%;
                            height: 2px;
                            background: #000;
                        }
                        .sign-bottom{
                            margin-top: 8px;
                            font-size: 14px;
                        }
                        .certi-name{
                            margin-top: 8px;
                            font-size: 14px;
                        }
                        .bottom-content{                           
                            text-align: left;
                            padding-left: 20px;
                            padding-top: 35px;
                        }
                        .bottom-content p{
                            font-size: 11px;
                            font-family: "Roboto", sans-serif !important;
                            font-weight: 400 !important;
                        }
                        .bottom-content span{
                            font-family: "Roboto", sans-serif !important;
                            font-weight: bold !important;
                        }
                    </style>
                    </head>
            <body>
                <div class="pdf-wrapper">
                    <img src="/assets/certificate-bg-2.jpg" class="pdf-bg" />
                    <div class="pdf-image">
                        <div class="pdf-main">
                            <div class="pdf-header">
                                <span class="d-block font-bold">A subsidiary of Techtweek Infotech</span>
                                <span class="d-block font-regular m-0 iso-text">An iso 27001:2022 Certified Company</span>
                            </div>
                            <div class="pdf-content-upper">
                                <div class="pdf-title font-bold">Certificate</div>
                                <div class="pdf-title-bottom font-light">of Compliance</div>
                                <h1 class="pdf-cert font-bold text-primary">${data.certificateType.toUpperCase()}</h1>
                                <h2 class="font-regular">Pentagon Infosec validated that</h2>
                                <h3 class="font-vollkorn company-name">${data.companyName}</h3>
                                <p>has been validated</p>
                                <p class="pdf-cert-date">${data.certificateType} as of ${data.issuedOn} &nbsp; | &nbsp; Certificate No: ${data.certicateNumber}</p>
                                <p>Valid Till: ${data.expiredOn}</p>
                                <img src="/assets/approved.png" alt="" class="approved-img">
                            </div> 
                            <div class="sign-and-logo">
                                <div class="left-sign">
                                    <div>
                                        <p class="signedby font-bold">${data.issuedBy.toUpperCase()}</p>
                                        <p class="sign-bottom font-bold">Signed By</p>
                                    </div>
                                    <div>
                                        <p class="certi-name font-bold">Certified Information System Auditor(ISACA)</p>
                                        <p class="certi-number font-bold">ISACA ID: <span class="font-regular">1893396</span></p>
                                    </div>
                                </div>
                               ${showCertLogo}
                            </div>
                            <div class="bottom-content">
                                <p><span>Pentagon Infosec: (United States)</span> 30 N Gould St Ste r, Sheridan, WY 82801.</p>
                                <p><span>(Australia)</span> 128/93 Regent St, Kogarah NSW 2217 &nbsp; | &nbsp; <a href="http://www.pentagoninfosec.com/" target="_blank">www.pentagoninfosec.com</a></p>
                                <p><span>Verify Auditor Certificate on:</span> <a href="https://www.isaca.org/credentialing/verify-a-certification" target="_blank">https://www.isaca.org/credentialing/verify-a-certification</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>

            </html>
        `;
            orientation_val = 'landscape';
        }

        const options = {
            filename: data.certicateNumber,

            image: { type: 'png', quality: 1 },
            html2canvas: { scale: 2, backgroundColor: null, useCORS: true, foreignObjectRendering: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: orientation_val, compress: false, precision: 16 },
            pagebreak: { mode: ['avoid-all'] }
        };
        html2pdf().from(content).set(options).save();
        // html2pdf()
        //     .from(content)
        //     .set(options)
        //     .outputPdf('blob')
        //     .then((blob) => {
        //         const url = URL.createObjectURL(blob);
        //         window.open(url, '_blank');
        //     });
    };

    // const show = () => {
    //     showLoading(true);
    //     setTimeout(() => {
    //         showLoading(false);
    //     }, 3000);
    // };

    return (
        <>
            <h2 className='text-3xl font-medium pb-8'>Issued Certificates</h2>
            {/* <button onClick={show}>Show Loading</button> */}
            {/* <GlobalLoading /> */}
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Company Name</StyledTableCell>
                            <StyledTableCell align='center'>Expire On</StyledTableCell>
                            <StyledTableCell align='center'>Type of Certificate</StyledTableCell>
                            <StyledTableCell align='center'>Issued On</StyledTableCell>
                            <StyledTableCell align='right'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length > 0 ? rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.companyName}
                                </StyledTableCell>
                                <StyledTableCell align='center'>{row.expiredOn}</StyledTableCell>
                                <StyledTableCell align='center'>{row.certificateType}</StyledTableCell>
                                <StyledTableCell align='center'>{row.issuedOn}</StyledTableCell>
                                <StyledTableCell align='right' className='cursor-pointer' onClick={() => generatePDF(row)}><DownloadForOfflineIcon className='color-light-orange'></DownloadForOfflineIcon></StyledTableCell>
                            </StyledTableRow>
                        )) : <div className='text-2xl mb-7 mt-5 color-navy font-medium text-center'>
                            No certificates found.
                        </div>}
                    </TableBody>

                </Table>
                {
                    issuedTotalCount > rowsPerPage ?
                        <div className='flex justify-end w-full'>
                            <TablePagination
                                component="div"
                                count={issuedTotalCount}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div> : null
                }

            </TableContainer>
        </>
    );
}

export default IssuedCertificates;