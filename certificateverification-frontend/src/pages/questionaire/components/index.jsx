import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import { CommonContext } from '../../../utils/context/CommonContext';
import { useForm, Controller } from 'react-hook-form';
import { QuestionaireContext } from '../context/QuestionaireContext';
import { DevTool } from '@hookform/devtools';

const Questionaire = () => {
    const { serviceTypes, certificateTypes } = React.useContext(CommonContext);
    const form = useForm({});
    const { register, control, handleSubmit, setValue, formState: { errors }, reset } = form
    const { certificateQuery } = React.useContext(QuestionaireContext)

    React.useEffect(
        () => {
            if (serviceTypes.length <= 0) {
                certificateTypes()
            }
        }, []
    )

    return (
        <>
            <div className='p-5'>
                <Paper elevation={3}>
                    <div className='divide-y-2 p-2.5'>
                        <div>
                            <Box className='w-full'>
                                <Link to='https://www.pentagoninfosec.com/'>
                                    <img className='h-24' src='/assets/pentagon-logo.png' />
                                </Link>
                            </Box>
                        </div>
                        <div className='px-12 py-12'>
                            <form onSubmit={handleSubmit(certificateQuery)} noValidate autoComplete="off">
                                <Stack spacing={2}>

                                    {/* Name Section */}
                                    <div>
                                        <p className='text-sm color-navy pb-2'>Name</p>
                                        <FormControl className='w-full'>
                                            <TextField {...register("name")} fullWidth size="small" placeholder="Name" />
                                        </FormControl>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <p className='text-sm color-navy pb-2'>Email</p>
                                        <FormControl className='w-full'>
                                            <TextField  {...register("email")} fullWidth size="small" placeholder="Email" />
                                        </FormControl>
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <p className='text-sm color-navy pb-2'>Phone Number</p>
                                        <FormControl className='w-full'>
                                            <TextField  {...register("contactNumber")} fullWidth size="small" placeholder="Phone Number" />
                                        </FormControl>
                                    </div>

                                    {/* Service */}
                                    <div>
                                        <p className='text-sm color-navy pb-2'>Service Required</p>
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

                                    {/* Submit button */}
                                    <div className='w-full float-right'>
                                        <button type="submit" className=' rounded float-right px-4 py-1.5 bg-dark-orange w-fit color-white font-medium'>Send Query
                                        </button>
                                    </div>
                                </Stack>
                            </form>
                        </div>
                    </div>
                </Paper>
            </div>
            {/* <DevTool control={control} /> */}
        </>
    )
}

export default Questionaire