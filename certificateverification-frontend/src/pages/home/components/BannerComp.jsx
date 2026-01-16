import React from 'react'
import { Typography, Box, Button } from '@mui/material'

const BannerComp = () => {
    const handleClick = () => {
        const section = document.getElementById('get_in_touch');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <Box className='hero-section flex items-center md:text-center lg:text-start '>
                <Box className='px-10'>
                    <h2 className='text-3xl color-white font-bold pb-2'>Empowering Your</h2>
                    <span className='text-7xl font-bold color-white'>Compliance Journey
                    </span>
                    <Box className='w-full pt-4'>
                        <button className='px-8 py-3 bg-yellow  color-purple font-bold' onClick={handleClick}>Request a Demo
                        </button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BannerComp