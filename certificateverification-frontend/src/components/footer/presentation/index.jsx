import React from 'react';
import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";
import Divider from '@mui/material/Divider';
// import { ThemeProvider } from '@mui/material/styles';
// import TypoTheme from '../../../TypoTheme';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const FooterComp = () => {
    return (
        <>
            <Box className=' bottom-0 w-full bg-[#000] color-white '>
                <Box className="container mx-auto">
                    <Box className='text-center py-8'>
                        <p>Made with 🧡 in India © Copyright 2023 techtweek.com Privacy Policy | Terms & Condition</p>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FooterComp