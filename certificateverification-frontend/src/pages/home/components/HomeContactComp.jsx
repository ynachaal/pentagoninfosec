import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { CommonContext } from '../../../utils/context/CommonContext';
import { useForm, Controller } from 'react-hook-form';
import { HomeContext } from '../context/HomeContext';
import { DevTool } from '@hookform/devtools';

const HomeContactComp = () => {

    const { certificateTypes, serviceTypes } = React.useContext(CommonContext);
    const { contactUs } = React.useContext(HomeContext)

    const form = useForm({});
    const { register, control, handleSubmit, setValue, formState: { errors }, reset } = form

    React.useEffect(
        () => {
            certificateTypes()
        }, []
    )

    const onSubmit = (data) => {
        const newData = { ...data, certificateType: data.certificateType.nameOfCertificate };
        contactUs(newData);
        reset();
    }
    return (
        <>
            <div className='w-full pb-16'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-2 sm:grid-cols-1 md:px-4  lg:grid-cols-2 lg:gap-5 '>
                        <img className='sm:w-5/12 sm:pb-5 lg:w-10/12  lg:mt-5 xl:mt-0' src='/assets/contactFormImg.jpeg'/>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
                            <Stack spacing={3}>

                                {/* Name Section */}
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm color-navy'>First Name</p>
                                        <FormControl className='w-full'>
                                            <TextField
                                                {...register("firstName")} fullWidth
                                                size="small" placeholder="First Name" />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <p className='text-sm color-navy'>Last Name</p>
                                        <FormControl className='w-full'>
                                            <TextField
                                                {...register("lastName")}
                                                fullWidth
                                                size="small" placeholder="Last Name" />
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Email, Phone Number */}
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm color-navy'>Email</p>
                                        <FormControl className='w-full'>
                                            <TextField fullWidth
                                                {...register("email")} size="small" placeholder="Email" />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <p className='text-sm color-navy'>Phone Number</p>
                                        <FormControl className='w-full'>
                                            <TextField fullWidth
                                                {...register("contactNumber")} size="small" placeholder="Contact Number" />
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Serive Required */}
                                <div>
                                    <p className='text-sm color-navy '>Service Required</p>
                                    <Controller
                                        name='certificateType'
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Please input Company Name",
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                fullWidth
                                                disablePortal
                                                id="combo-box-demo"
                                                options={serviceTypes}
                                                getOptionLabel={(option) => {
                                                    return option.nameOfCertificate || ''
                                                }}
                                                onChange={(event, newValue) => field.onChange(newValue)}
                                                value={field.value || ''}
                                                renderInput={(params) => <TextField placeholder="Service Required" size="small" fullWidth {...params} />}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <p className='text-sm color-navy'>Message</p>
                                    <FormControl className='w-full'>
                                        <TextField
                                            {...register("message")}
                                            size="small"
                                            fullWidth
                                            multiline
                                            placeholder="Type your message here..."
                                            rows={4}
                                        />
                                    </FormControl>
                                </div>
                                <button type='submit' className='px-4 py-1.5 bg-green w-fit color-white'>Submit
                                </button>
                            </Stack>
                        </form>
                        {/* <DevTool control={control} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}


export default HomeContactComp