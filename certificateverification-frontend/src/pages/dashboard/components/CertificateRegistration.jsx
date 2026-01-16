import React from 'react'
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { CommonContext } from '../../../utils/context/CommonContext';
// import { DevTool } from '@hookform/devtools';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DashboardContext } from '../context/DashboardContext';

const CertificateRegistration = () => {

    const { file, handleFileChange, handleDatePickerChange, handleExpiryDateChange, onSubmit, imagePreview, isResettingForm } = React.useContext(DashboardContext);

    const { certificateTypes, serviceTypes } = React.useContext(CommonContext);
    const form = useForm({});
    const { register, control, handleSubmit, formState: { errors }, reset } = form;

    React.useEffect(
        () => {
            if (serviceTypes.length <= 0) {
                certificateTypes()
            }
        }, []
    )
    React.useEffect(
        () => {
            if (isResettingForm) {
                reset();
            }
        }, [isResettingForm]
    )
    const renderFilePreview = () => {
        if (!file) return null;

        const { type, name } = file;

        if (type.startsWith('image/')) {
            return <img src={imagePreview} alt="File Preview" style={{ maxWidth: '300px', maxHeight: "300px" }} />;
        } else if (type === 'application/pdf') {
            return <iframe src={imagePreview} title={name} style={{ maxWidth: '300px', maxHeight: "300px" }} />;
        } else {
            // For other file types, you can display an icon or simply show file metadata
            return (
                <div>
                    {/* <p>File type: {type}</p> */}
                    <p>{name}</p>
                </div>
            );
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <Stack spacing={2}>
                    <h2 className='text-3xl font-medium pb-4'>Create Certificate </h2>

                    {/* Name Section */}
                    <div>
                        <p className='text-sm pb-2  '>Company Name</p>
                        <FormControl className='w-full'>
                            <TextField {...register("companyName")} fullWidth size="small" placeholder="Company Name" />
                        </FormControl>
                    </div>

                    <div className='border py-0.5 px-3 bg-orange rounded color-white font-medium'>
                        Certificate and Company Details
                    </div>

                    {/* Certificate Name and Certificate Number */}
                    <div className=' gap-4'>
                        <div>
                            <p className='text-sm pb-2  '>Certificate Name</p>
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
                                        disableClearable
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
                                        renderInput={(params) => <TextField placeholder="Certificate Name" size="small" fullWidth {...params} />}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Issue Date and Expiry Date */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="date-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <p className='text-sm pb-2 '>Issue Date</p>
                                    <DatePicker onChange={handleDatePickerChange}
                                        renderInput={(params) => <TextField {...params} />} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className="date-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <p className='text-sm pb-2 '>Expiry Date</p>
                                    <DatePicker onChange={handleExpiryDateChange}
                                        renderInput={(params) => <TextField {...params} />} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <p className='text-sm  pb-2'>Additional Notes</p>
                        <FormControl className='w-full'>
                            <TextField
                                {...register("notes")}
                                size="small"
                                fullWidth
                                multiline
                                placeholder="Additional Notes..."
                                rows={4}
                            />
                        </FormControl>
                    </div>

                    <div className='border py-0.5 px-3 bg-orange rounded color-white font-medium'>
                        Verification and Issuer
                    </div>

                    {/* Upload Evidences */}
                    <div>
                        <p className='text-sm  pb-2'>Upload Evidences</p>
                        <div className='border-dashed border-2 border-orange-300 p-24 flex justify-center'>
                            <Button
                                // className='bg-dark-orange'
                                component="label"
                                role={undefined}
                                // variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon className='color-light-orange' />}
                            >
                                {
                                    !imagePreview && !file && <span className='color-light-orange font-bold text-xs block'>{file ? file.name : ' Browse files to upload'}</span>
                                }
                                {
                                    imagePreview && file && renderFilePreview()

                                }

                                <input
                                    className='hidden'
                                    {...register('evidence')}
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </div>
                    </div>

                    {/* Issue By and Association */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p className='text-sm pb-2'>Issued By</p>
                            <Controller
                                name='issueBy'
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        size='small'
                                        fullWidth
                                        disableClearable
                                        options={options}
                                        value={field.value || ''}
                                        getOptionLabel={(option) => {
                                            return option
                                        }}
                                        onChange={(event, newValue) =>
                                            field.onChange(newValue)
                                        }

                                        renderInput={(params) => <TextField placeholder="Issued By" {...params} />}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <p className='text-sm pb-2'>Association</p>
                            <FormControl className='w-full'>
                                <TextField
                                    disabled
                                    {...register("association")}
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    defaultValue="Pentagon"
                                    fullWidth size="small" placeholder="Association" />
                            </FormControl>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className='w-full float-right'>
                        <button type="submit" className='rounded float-right px-4 py-1.5 bg-dark-orange w-fit color-white font-medium uppercase'>Create
                        </button>
                    </div>
                </Stack>
            </form >
            {/* <DevTool control={control} /> */}
        </>
    )
}

const options = ['Sahil Dubey', 'Vinay Sachdeva'];

export default CertificateRegistration