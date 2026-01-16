exports.generateCertificateNumber = (startingNumber, length = 6) => {
  //   // const alphabetCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const numericCharset = '0123456789';
  //   let otp = 'PI' + certicateName;
  //   // Generate 7 random alphabets
  //   // for (let i = 0; i < charLength; i++) {
  //   //   const randomIndex = Math.floor(Math.random() * alphabetCharset.length);
  //   //   otp += alphabetCharset[randomIndex];
  //   // }

  //   // Generate 7 random numbers
  //   otp += '-'
  //   for (let i = 0; i < numLength; i++) {
  //     const randomIndex = Math.floor(Math.random() * numericCharset.length);
  //     otp += numericCharset[randomIndex];
  //   }
  // return otp;
  return String(startingNumber).padStart(length, '0');
}