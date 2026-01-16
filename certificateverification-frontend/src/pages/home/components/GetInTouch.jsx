import React from 'react'

const GetInTouch = () => {
    return (
        <>
            <div className='pb-6'>
                <div className='text-center pb-6'>
                    <h2 className='color-navy font-bold text-3xl'>
                        GET IN TOUCH
                    </h2>
                </div>
                <div className='container mx-auto  max-w-6xl ' id="get_in_touch">
                    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid lg:grid-cols-3  xl:grid-cols-3'>
                        {/* Location */}
                        <div className='flex items-center flex-col gap-4 p-5 w-96 lg:w-80 xl:w-96'>
                            <div className='items-center rounded-full flex justify-center p-8 bg-grey w-28 sm:w-24	xl:w-28'>
                                <img src='/assets/location.png' />
                            </div>
                            <p className='font-bold text-2xl color-navy sm:text-xl xl:text-2xl'>ADDRESS</p>
                            <p className='text-center font-normal sm:text-sm sm:w-1/2 xl:w-full '> 30 N Gould St Ste r, Sheridan, WY 82801, United States</p>
                        </div>

                        {/* Contact */}
                        <div className='flex items-center flex-col gap-4 p-5 w-96 lg:w-80 xl:w-96'>
                            <div className='items-center rounded-full flex justify-center p-8 bg-grey w-28	sm:w-24 xl:w-28'>
                                <img src='/assets/phone.png' />
                            </div>
                            <p className='font-bold text-2xl color-navy sm:text-xl xl:text-2xl'>PHONE</p>
                            <p className='text-center font-normal sm:text-sm'>+1 917-5085334</p>
                        </div>

                        {/* Email */}
                        <div className='flex items-center flex-col gap-4 p-5 w-96 lg:w-80 xl:w-96'>
                            <div className='items-center rounded-full flex justify-center p-8 bg-grey w-28 sm:w-24 xl:w-28	'>
                                <img src='/assets/email.png' />
                            </div>
                            <p className='font-bold text-2xl color-navy sm:text-xl xl:text-2xl'>EMAIL</p>
                            <p className='text-center font-normal sm:text-sm'>info@pentagoninfosec.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetInTouch