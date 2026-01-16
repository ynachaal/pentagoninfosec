import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { GlobalLoading } from 'react-global-loading';

const Console = () => {
    return (
        <>
            <GlobalLoading />
            <div className='shadow'>
                <div className='container mx-auto'>
                    <Link to='https://www.pentagoninfosec.com/'>
                        <img className='h-20' src='/assets/pentagon-logo.png' />
                    </Link>
                </div>
            </div>
            <div className='container mx-auto pb-10'>
                <div className='grid grid-cols-[20%,79%] divide-x'>
                    <div className='px-8 pt-14'>
                        <Sidebar />
                    </div>
                    <div className='px-4 py-14 '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Console;