/* eslint-disable no-unused-vars */
import React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { HomeContext } from '../context/HomeContext';
// const Input = React.forwardRef(function CustomInput(props, ref) {
//     return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
// });

const VerifyComp = () => {
    const form = useForm({});
    const { register, handleSubmit } = form
    const { certificateByNumber } = React.useContext(HomeContext);
    const onSubmit = (data) => {
        certificateByNumber(data);
    }

    return (
        <>
            <div className='w-full pb-16' id="verify">
                <div className='container mx-auto'>
                    <div className='grid grid-cols-2 md:px-4 '>
                        <img className='w-70' src='/assets/verifyimg.webp' />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='pb-4'>
                                <h2 className='color-navy font-bold text-3xl'>
                                    VERIFY CERTIFICATE
                                </h2>
                                <Stack spacing={2}>
                                    <div>
                                        <p className='pt-6'>Certificate Number</p>
                                        <TextField {...register("certificateNumber")} fullWidth size="small" placeholder="Certificate Number" />
                                    </div>
                                    {/* <div>
                                        <p>Issue Date</p>
                                        <TextField fullWidth size="small" placeholder="Issue Date" />
                                    </div> */}
                                </Stack>
                            </div>
                            <Button type="submit" className='px-4 py-1.5 bg-green color-white !capitalize'>Verify
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyComp;
