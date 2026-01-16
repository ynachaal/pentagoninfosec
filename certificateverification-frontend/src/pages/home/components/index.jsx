/* eslint-disable no-unused-vars */
import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import BannerComp from './BannerComp'
import AboutComp from './AboutComp'
import OurServicesComp from './OurServicesComp'
import VerifyComp from './VerifyComp'
import GetInTouch from './GetInTouch'
import HomeContactComp from './HomeContactComp'
import Auth from '../../../components/authentication/presentation';
import PopUps from './PopUps'

const Home = () => {
    return (
        <>
            <Box>
                <BannerComp />
                <AboutComp />
                <OurServicesComp />
                <VerifyComp />
                <GetInTouch />
                <HomeContactComp />
            </Box>
            <PopUps />
            <Auth />
        </>
    )
}

export default Home