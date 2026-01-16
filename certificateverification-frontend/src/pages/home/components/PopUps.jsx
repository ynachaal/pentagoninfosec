import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { HomeContext } from '../context/HomeContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const PopUps = () => {
    const { open, certificateDetails, handleClose, formatDate } = React.useContext(HomeContext);
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className='!font-black uppercase text-center'>
                    {certificateDetails ? "Certificate Details" : ''}
                </DialogTitle>
                {/* <CancelIcon className='absolute right-2 top-2 color-red grey cursor-pointer' onClick={handleClose} /> */}
                {certificateDetails ? <div className='px-4'>
                    <hr />
                </div> : ''}
                {

                    <DialogContent>
                        {
                            certificateDetails ?
                                <div>
                                    <div className='block pb-2'>
                                        <GppGoodIcon className='mr-2 color-navy' /> Certificate issues to: {certificateDetails.companyName}
                                    </div>
                                    <div className='block pb-2'>
                                        <CheckCircleIcon className='mr-2 color-navy' /> Valid till: &nbsp;
                                        {formatDate(certificateDetails?.validTill)}
                                    </div>

                                    <div className='block pb-2'>
                                        <ConfirmationNumberIcon className='mr-2 color-navy' />  Certificate No: {certificateDetails.certicateNumber}
                                    </div>

                                    <div className='block pb-2'>
                                        <CheckCircleIcon className='mr-2 color-navy' /> Certificate Issuer: Sahil Dubey
                                    </div>

                                    <div className='block pb-2'>
                                        <CheckCircleIcon className='mr-2 color-navy' />  Issuer Certificate No: <span className='text-xs'>(CIS)</span> 232322528
                                    </div>
                                    <div className='block pb-2'>
                                        <CheckCircleIcon className='mr-2 color-navy' /> ISACA ID: 1893396
                                    </div>
                                </div>
                                : <div>
                                    <div className='mx-20'>
                                        <div className='w-full flex justify-center'>
                                            <img className='w-24  ' src='/assets/error.png' />
                                        </div>
                                        <div className='text-center' >
                                            <h2 className='pt-6 font-medium text-3xl'>Oops!</h2>
                                            <p className='pt-1 pb-6 text-md'>Certificate number is invalid</p>
                                        </div>
                                    </div>
                                    <button onClick={handleClose} className='px-4 py-3 !mr-2 bg-green w-full color-white uppercase font-semibold rounded'>Try Again
                                    </button>
                                </div>
                        }
                    </DialogContent>
                }

            </Dialog>
        </>
    )
}

export default PopUps