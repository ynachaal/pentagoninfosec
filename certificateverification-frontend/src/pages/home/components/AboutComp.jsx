import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const AboutComp = () => {
    return (
        <div className='text-center pb-16'>
            <div className='container mx-auto px-16'>
                <div className='flex  sm:grid-cols-1 md:grid   lg:grid-cols-2 xl:grid-cols-3   sm:mt-20 sm:ml-10 sm:mb-2 md:ml-32 lg:mt-16  lg:ml-12 xl:ml-1 xl:gap-24  '>
                    {/* Card-1 */}
                    <Card style={{ animation: 'slideFromLeft 1s ease' }} className='w-full sm:w-1/3 sm:border sm:mb-4 xl:border-none' variant="none" sx={{ minWidth: 375 }}>
                        <CardContent>
                            <div className='flex flex-col items-center'>
                                <img className='text-center sm:w-20 xl:w-94' width="94" src='/assets/img1.png' alt="image1" />
                                <div className='text-2xl mb-7 mt-5 color-navy font-medium sm:text-xl xl:text-2xl'>
                                    Why Choose Us?
                                </div>
                                <div className=''>
                                    Pentagon Infosec provides you with all in one solution to reduce security risk, protect your data and fight cybercrime by being one of the finest Digital security services providers. Our security services are the most reliable, effective and measurable IT Risk assessment services. Our team of security experts, ethical hackers and researchers had a major role to play for building the trust of people with Pentagon solutions with their outstanding ability to protect the business from cyber attacks.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* card-2 */}
                    <Card style={{ animation: 'slideFromRight 1s ease' }} className='w-full sm:w-1/3 sm:border sm:mb-4 xl:border-none' variant="none" sx={{ minWidth: 375 }}>
                        <CardContent>
                            <div className='flex flex-col items-center'>
                                <img width="94" src='/assets/img2.png' alt="image2" className='sm:w-20 xl:w-94' />
                                <div className='text-2xl color-navy mb-7 mt-5 font-medium sm:text-xl xl:text-2xl'>
                                    Services We Offer
                                </div>
                                <div className=''>
                                    Pentagon Infosec is a top-notch cybersecurity services provider which provides complete cybersecurity solutions to protect your business from cyber threats. We protect your business from malicious attacks and data breaches, including PCI DSS, HIPAA compliance, AICPA SOC Audits, VAPT and ISO certification. We offer solutions for data security, risk assessment, penetration testing and vulnerability scanning, malware detection and response, identity and access management, and much more.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Card-3 */}
                    <Card style={{ animation: 'slideFromBottom 1s ease' }} className='w-full sm:w-1/3 sm:border xl:border-none lg:ml-52 xl:ml-0' variant="none" sx={{ minWidth: 375 }}>
                        <CardContent>
                            <div className='flex flex-col items-center'>
                                <img width="94" src='/assets/img3.png' alt="image3" className='sm:w-20 xl:w-94' />
                                <div className='text-2xl mb-7 mt-5 font-medium color-navy sm:text-xl xl:text-2xl'>
                                    What We Actually Do
                                </div>
                                <div className=''>
                                    At Pentagon Infosec, we provide organizations of all sizes with the highest quality of cybersecurity services to protect their data and networks as a leading cybersecurity service provider. We provide tailored solutions to meet the specific needs of our clients, while also offering a full suite of industry-leading services to ensure the utmost protection of your business. Pentagon Infosec protects your data with world-class cybersecurity services.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AboutComp;
