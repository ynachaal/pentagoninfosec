import React from 'react'
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { DashboardContext } from '../context/DashboardContext';

const accountSettings = () => {

    const { onSubmitAccountForm, userDetails, getAccountDetails, onSubmitSecurityForm } = React.useContext(DashboardContext);
    const [isLoading, setIsLoading] = React.useState(true);

    const form = useForm({});
    const { register, handleSubmit } = form;

    React.useEffect(
        () => {
            setIsLoading(true);
            const fetchData = async () => {
                try {
                    await getAccountDetails();
                    setIsLoading(false);
                } catch (error) {
                    // setError(error);
                    setIsLoading(false);
                }
            };
            fetchData();
        }, []
    )

    return (
        <>
            {
                !isLoading &&
                <form style={{ animation: 'slideFromLeft 500ms ease' }} onSubmit={handleSubmit(onSubmitAccountForm)} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <div className='border py-0.5 px-3 bg-orange rounded color-white font-medium'>
                            Personal details
                        </div>
                        {/* <h2 className='text-3xl font-medium pb-4'>Account Settings </h2> */}

                        {/* Name Section */}
                        <div>
                            <p className='text-sm pb-2  '>Your Full Name</p>
                            <FormControl className='w-full'>
                                <TextField {...register("fullName")} fullWidth size="small" defaultValue={userDetails?.name || ''} placeholder="Your Full Name" />
                            </FormControl>
                        </div>
                        <div>
                            <p className='text-sm pb-2  '>Your Email Address</p>
                            <FormControl className='w-full'>
                                <TextField {...register("email")} fullWidth size="small" defaultValue={userDetails?.email || ''} placeholder="Email Address" />
                            </FormControl>
                        </div>


                        {/* Certificate Name and Certificate Number */}
                        <div className='w-full float-right'>
                            <button type="submit" className='rounded float-right px-4 py-1.5 bg-dark-orange w-fit color-white font-medium uppercase'>Save
                            </button>
                        </div>
                    </Stack>
                </form >
            }
            <form style={{ animation: 'slideFromLeft 500ms ease' }} onSubmit={handleSubmit(onSubmitSecurityForm)} noValidate autoComplete="off">
                <Stack spacing={2}>
                    {/* Certificate Name and Certificate Number */}
                    <div className='border py-0.5 px-3 !mt-12 bg-orange rounded color-white font-medium'>
                        Security settings
                    </div>

                    <div>
                        <p className='text-sm pb-2'>Your Old Password</p>
                        <FormControl className='w-full'>
                            <TextField type='password' {...register("oldPassword")} fullWidth size="small" placeholder="Old Password" />
                        </FormControl>
                    </div>
                    <div>
                        <p className='text-sm pb-2'>New Password</p>
                        <FormControl className='w-full'>
                            <TextField type='password' {...register("newPassword")} fullWidth size="small" placeholder="New Password" />
                        </FormControl>
                    </div>
                    <div>
                        <p className='text-sm pb-2'>Confirm New Password</p>
                        <FormControl className='w-full'>
                            <TextField type='password' {...register("confirmNewPassword")} fullWidth size="small" placeholder="Confirm New Password" />
                        </FormControl>
                    </div>

                    <div className='w-full float-right'>
                        <button type="submit" className='rounded float-right px-4 py-1.5 bg-dark-orange w-fit color-white font-medium uppercase'>Update password
                        </button>
                    </div>
                </Stack>
            </form >

            {/* <DevTool control={control} /> */}
        </>
    )
}

export default accountSettings;