import React from 'react'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import UserAuthService from '../../../common/UserAuthService';
import AdminAuthService from '../../../common/AdminAuthService';

const Sidebar = () => {
    const isUserAuthenticated = UserAuthService.isAuthenticated();
    const isAdminAuthenticated = AdminAuthService.isAuthenticated();
    return (
        <>
            <ul className=' md:text-sm xl:text-lg'>
                <Stack spacing={2}>
                    {
                        (isUserAuthenticated && isAdminAuthenticated) &&
                        <>
                            <li>
                                <Link to="/dashboard/generate-certificate" className={location.pathname === '/dashboard/generate-certificate' && 'color-orange'}>Certificate Registration
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/expire-certificates" className={location.pathname === '/dashboard/expire-certificates' && 'color-orange'}>Expire Certificates</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/issue-certificates" className={location.pathname === '/dashboard/issue-certificates' && 'color-orange'}>Issued Certificates</Link>
                            </li>
                        </>
                    }
                    {
                        (isUserAuthenticated) &&
                        <>

                            <li>
                                <Link to="/dashboard/account-settings" className={location.pathname === '/dashboard/account-settings' && 'color-orange'}>Account Settings</Link>
                            </li>

                        </>
                    }

                </Stack>
            </ul>
        </>
    )
}

export default Sidebar