/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/material";
import { AuthContext } from '../context/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const form = useForm({});
    const { AuthModalOpen, closeAuthModal, userSignIn, userSignUp } = React.useContext(AuthContext);
    const [isSignUp, setIsSignUp] = React.useState(false);
    const { register, control, handleSubmit, formState: { errors } } = form
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // onSubmit Data 
    const onSubmit = (data) => {
        if (isSignUp) {
            userSignUp(data);
        } else {
            userSignIn(data);
        }
    }

    return (
        <>
            <Dialog
                open={AuthModalOpen}
                TransitionComponent={Transition}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "470px",  // Set your width here
                        },
                    },
                }}
                keepMounted
            >
                <div className='pt-6 pb-2'>
                    <div className='text-center text-xl font-medium'>{isSignUp ? "SignUp" : "SignIn"}</div>
                </div>
                <CancelIcon className='absolute right-2 top-2 grey cursor-pointer' onClick={closeAuthModal} />
                <DialogContent>
                    {/* Form of Login page */}
                    <form className="pt-1" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            {/* Name Field */}
                            {isSignUp && (
                                <TextField
                                    fullWidth
                                    label="Name"
                                    color="secondary"
                                    variant="outlined"
                                    {...register("name")}
                                />
                            )}

                            {/* Email Field */}
                            <TextField
                                fullWidth
                                label="Email"
                                color="secondary"
                                variant="outlined"
                                {...register("email")}
                            />

                            {/* Password Field */}
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                color="secondary"
                                {...register("password")}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Login Button */}
                            <button
                                variant="contained"
                                type="submit"
                                onClick={closeAuthModal}
                                className='bg-navy-blue py-2 color-white'
                            >
                                <span className='font-medium'> {isSignUp ? "Register" : "Login"}</span>
                            </button>
                        </Stack>
                    </form>

                    {/* onCLick signup dialog will open */}
                    <Box className="text-center text-sm pt-6 pb-2">
                        <span className='color-navy cursor-pointer' onClick={() => {
                            setIsSignUp(!isSignUp);
                        }}> {isSignUp ? "Already have an account?" : "Looking to create an account?"} </span>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}