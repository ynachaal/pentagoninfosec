import React from 'react'
import { Link } from 'react-router-dom';
import { Toolbar, Box } from "@mui/material";
import { UseAuthModal } from '../../authentication/context/AuthContext';
import IconButton from '@mui/material/IconButton';
import { CommonContext } from '../../../utils/context/CommonContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UserAuthService from '../../../common/UserAuthService';
import AdminAuthService from '../../../common/AdminAuthService';

const HeaderComp = () => {
    const { openAuthModal } = UseAuthModal();
    const { token, clearLocalStorage } = React.useContext(CommonContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    // scroll
    const handleClick = () => {
        const section = document.getElementById('verify');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // open menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isAuthenticated = UserAuthService.isAuthenticated();
    const isAdminAuthenticated = AdminAuthService.isAuthenticated();

    return (
        <>
            {/* <Box className='pl-1 md:px-0 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl'> */}
            <Toolbar className="px-10 fixed flex gap-28  justify-between items-center w-full h-14 bg-transparent">
                <Box className='w-full'>
                    <Link to='/'>
                        <img className='h-24' src='/assets/pentagon-logo.png' />
                    </Link>
                </Box>

                <div className='w-full '>
                    {token ?
                        <div className='float-right self-center color-white'>
                            <IconButton
                                onClick={handleMenu}
                                size="small"
                                sx={{ paddingTop: 0.2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 36, height: 36, backgroundColor: '#FB6D48' }}>S</Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {
                                    isAuthenticated && <MenuItem
                                        component={Link}
                                        to={isAuthenticated && isAdminAuthenticated ? "/dashboard/generate-certificate" : "/dashboard/account-settings"}
                                    >
                                        <SpaceDashboardIcon className='mr-4' /> Dashboard
                                    </MenuItem>
                                }

                                <MenuItem onClick={handleClose}>
                                    <LockOpenIcon className='mr-4' /> SignIn in GRC
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <HowToRegIcon className='mr-4' /> SignUp in GRC
                                </MenuItem>
                                <MenuItem onClick={() => { handleClose(); clearLocalStorage() }}>
                                    <Logout className='mr-4' /> Logout
                                </MenuItem>
                            </Menu>
                        </div> :
                        <button onClick={openAuthModal} className='px-4 py-1.5 bg-green float-right color-white'>Sign in
                        </button>
                    }
                    <button onClick={handleClick} className='px-4 py-1.5 !mr-2 bg-green float-right color-white'>Verify
                    </button>
                </div>
            </Toolbar>
        </>
    )
}

export default HeaderComp