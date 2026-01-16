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

const ExpiryCertificates = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { getExpiringCertificates, expiredCertificates, expiredTotalCount } = React.useContext(DashboardContext);

    React.useEffect(
        () => {
            getExpiringCertificates();
        }, []
    )

    const renderTableData = () => {
        rows = []
        expiredCertificates.forEach(cert => {
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
        getExpiringCertificates(pagination);
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
        getExpiringCertificates(pagination);
        renderTableData();
    };

    renderTableData();

    const generatePDF = (data) => {
        let content = '';
        const isISOType = data.certificateType.includes('ISO') || data.certificateType.includes('iso');
        if (isISOType) {
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
                                <p>${data.issuedBy.split(' ')[0].toUpperCase()} <br /> ${data.issuedBy.split(' ')[1].toUpperCase()}</p>
                                </div>
                                <div class='Approved-content'>
                                <p>Digitally signed</p>
                                <p>by ${data.issuedBy.toUpperCase()}</p>
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
        }
        else {
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
                    height: 140vh;
                    width: 750px;
                    position: relative;
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
                    top: 10%;
                    width: 100%;
                }
        
                .pdf-header h2 {
                    margin: 0;
                    padding: 0;
                    margin-bottom: -4px;
                }
        
                .pdf-header span {
                    font-size: 10px;
                    margin: 0;
                    padding: 0;
                    font-weight: 800;
                }
        
                .pdf-content-upper .pdf-title {
                    font-size: 24px;
                    margin-top: 20px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0;
                    word-spacing: 0;
                }
        
                .pdf-content-upper .pdf-cert {
                    margin: auto;
                    max-width: 65%;
                    margin-top: 5px;
                    color: #d8ae3a;
                }
        
                .pdf-content-upper h2 {
                    margin: 8px;
                }
        
                .pdf-content-upper h3 {
                    margin: auto;
                    max-width: 65%;
                    font-size: 22px;
                    margin-top: 16px;
                }
        
                .pdf-content-upper p {
                    margin: auto;
                    max-width: 70%;
                    margin-top: 8px;
                    text-align: center;
                }
        
                .pdf-content-upper h4 {
                    margin: 8px;
                    font-size: 17px;
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
            </style>
            </head>
                <body>
                    <div class="pdf-wrapper">
                        <div class="pdf-image">
                        <img src="/assets/certificate-background.png" alt="PDF image">
                            <div class="pdf-main">
                                <div class="pdf-header">
                                    <h2>Pentagon Infosec</h2>
                                    <span>A subsidiary of Techtweek Infotech</span>
                                </div>
                                <div class="pdf-content-upper">
                                    <div class="pdf-title">Certificate of Compliance</div>
                                    <h1 class="pdf-cert">${data.certificateType.toUpperCase()}</h1>
                                    <h2>Pentagon Infosec validated that</h2>
                                    <h3>${data.companyName}</h3>
                                    <p>has been validated</p>
                                    <p class="pdf-cert-date">${data.certificateType} as of ${data.issuedOn}</p>
                                    <h4>Certificate Number:- ${data.certicateNumber}</h4>
                                    <h4>Valid Till:-${data.expiredOn}</h4>
                                </div>
                                <div class="pdf-content-left">
                                    <h1>APPROVED</h1>
                                    <p class="pdf-signed">Signed By:</p>
                                    <div class="pdf-content-left-main">
                                        <div class="pdf-content-left-side">
                                            <p>${data.issuedBy.split(' ')[0]?.toUpperCase()}<br/> ${data.issuedBy.split(' ')[1]?.toUpperCase()}</p>
                                        </div>
                                        <div class="pdf-content-right-side">
                                            <p>Digitally signed</p>
                                            <p> &nbsp;&nbsp;&nbsp;&nbsp;by ${data.issuedBy.toUpperCase()}</p>
                                            <p>Date:${data.issuedOn}</p>
                                        </div>
                                    </div>
                                    <div class="pdf-content-left-down">
                                        <p class="main">Mr. ${data.issuedBy.toUpperCase()}</p>
                                        <p class="main-certi first-p">CERTIFIED INFORMATION SYSTEM</p>
                                        <P class="main-certi">AUDITOR(ISACA)</P>
                                        <p class="main-certi">ISACA ID:1893396</p>
                                        <p class="main-certi no">Certification No.: ${data.certicateNumber}</p>
                                        <p class="verify">verify Auditor Certificate on:</p>
                                        <a class="link"
                                            href="https://www.isaca.org/credentialing/verify-a-certification">https://www.isaca.org/credentialing/verify-a-certification</a>
                                    </div>
                                </div>
                                <div class="pdf-footer">
                                    <div class="pdf-footer-company">Pentagon Infosec</div>
                                    <div>INDIA</div>
                                    <div>
                                        F177, Kailash Tower Industrial Area, <br>
                                        Phase 8B SAS Nagar, Mohali(PB), 16005
                                    </div>
                                    <div>AUSTRALIA</div>
                                    <div>
                                        128/29, RegentSt, Kogarah NSW 2217
                                    </div>
                                    <div class="pdf-content-right-link">
                                        <a href="https://www.pentagoninfosec.com/">www.pentagoninfosec.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
`;
        }
        const options = {
            filename: data.certicateNumber,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' },
        };
        html2pdf().from(content).set(options).save();
    };

    return (
        <>
            <h2 className='text-3xl font-medium pb-8'>Certificate Expiry Status</h2>
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
                                <StyledTableCell align='right' className='cursor-pointer' title={'Download ' + row.certificateType} onClick={() => generatePDF(row)}><DownloadForOfflineIcon className='color-light-orange' ></DownloadForOfflineIcon></StyledTableCell>
                            </StyledTableRow>
                        )) : <div className='text-2xl mb-7 mt-5 color-navy font-medium text-center'>
                            No certificates found.
                        </div>}
                    </TableBody>

                </Table>
                {
                    expiredTotalCount > rowsPerPage ? <div className='flex justify-end w-full'>
                        <TablePagination
                            component="div"
                            count={expiredTotalCount}
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

export default ExpiryCertificates;