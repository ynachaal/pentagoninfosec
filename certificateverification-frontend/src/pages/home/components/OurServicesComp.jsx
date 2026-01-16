import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const OurServicesComp = () => {
    React.useEffect(() => {
        const section = document.getElementById('servicesSection');

        if (section) {
            section.style.transition = 'transform 1s ease';
            section.style.transform = 'translateX(0)';
            section.style.opacity = '1';
        }
    }, []);
    return (
        <>
            <div id="servicesSection" style={{ transform: 'translateX(-100%)', opacity: 0 }}>
                <div className='color-navy text-center font-bold text-3xl pb-6'>
                    OUR SERVICES
                </div>

                {/* Service Cards */}
                <div className='text-center pb-16 px-12'>
                    <div className='overflow-x-auto flex flex-nowrap justify-center items-center gap-6'>

                        {/* Card-1 */}
                        <Card className='w-80 h-auto flex-shrink-0' variant="outlined" >
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img className='text-center' width="96" src='/assets/ourServiceImg.png' />
                                    <div className='text-2xl mb-7 mt-5 color-navy font-bold'>
                                        VAPT
                                    </div>
                                    <div>
                                        This provides the security team with a detailed analysis of the areas that need to be properly secured or patched. VAPT can be done manually as well as automatically.
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire' >Questionnaire</Button>
                            </CardActions>
                        </Card>

                        {/* card-2 */}
                        <Card className='w-80 h-auto' variant="outlined">
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img className='text-center' width="90" src='/assets/ourServiceImg2.png' />
                                    <div className='text-2xl mb-7 mt-5 color-navy font-bold'>
                                        SSAE 18
                                    </div>
                                    <div>
                                        The SSAE stands for Statement on Standards for Attestation Engagements. SSAE 18 regulates how organizations report on their compliance control measures
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire' >Questionnaire</Button>                            </CardActions>
                        </Card>

                        {/* Card-3 */}
                        <Card className='w-80 h-auto' variant="outlined" >
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img width="180" src='/assets/Hippaimg.png' />
                                    <div className='text-2xl mb-7 mt-5 font-bold color-navy'>
                                        HIPAA
                                    </div>
                                    <div>
                                        Data security is becoming an increasingly important concern for healthcare organizations. For more than 15 years, HIPAA has been regulating the privacy and security
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire' >Questionnaire</Button>                            </CardActions>
                        </Card>

                        {/* Card-4 */}
                        <Card className='w-80 h-auto' variant="outlined" >
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img width="160" src='/assets/pciimg.png' />
                                    <div className='text-2xl mb-7 mt-5 font-bold color-navy'>
                                        PCI-DSS
                                    </div>
                                    <div>
                                        Managed by the Payment Card Industry Security Standards Council(PCI SSC), this compliance program aims to protect credit and bank card transactions in the fight.
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire' >Questionnaire</Button>                            </CardActions>
                        </Card>

                        {/* Card-5 */}
                        <Card className='w-80 h-auto' variant="outlined" >
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img width="90" src='/assets/gdprimg.png' />
                                    <div className='text-2xl mb-7 mt-5 font-bold color-navy'>
                                        GDPR
                                    </div>
                                    <div>
                                        This compliance policy states that the businesses should protect the personal details and privacy of the important details that are protected under this compliance are web data.
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire' >Questionnaire</Button>                            </CardActions>
                        </Card>

                        {/* card-6 */}
                        <Card className='w-80 h-auto' variant="outlined" >
                            <CardContent>
                                <div className='flex flex-col items-center'>
                                    <img width="140" src='/assets/isoimg.png' />
                                    <div className='text-2xl mb-7 mt-5 font-bold color-navy'>
                                        ISO COMPLIANCE
                                    </div>
                                    <div>
                                        ISO 27001:2022 is the international standard outlining how to manage information security to protect an organizations information assets.
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions className='flex items-center justify-center'>
                                <Button sx={{}} className='!px-10 !py-2 color-white !capitalize bg-navy-blue shadow' component={Link} to='/questionaire'>Questionnaire</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurServicesComp