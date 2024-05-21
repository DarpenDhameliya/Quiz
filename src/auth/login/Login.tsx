/* eslint-disable no-mixed-operators */
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkSpace from '../../components/container';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import useStyles from '../AuthStyle';
import { postLogin } from '../../api';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

interface ErrorState {
    password?: string;
    conPassword?: string;
    email?: string;
}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [signupShow, setSignupShow] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState({} as ErrorState)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const classes: any = useStyles();
    const nevigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('token')
    }, [])

    const SignupCall = () => {
        setSignupShow(true)
    };

    const SigninCall = () => {
        setSignupShow(false)
    };

    const login = async () => {
        const emailVerify = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        const passwordVerify = password === conPassword
        if (
            !password ||
            !email ||
            !emailVerify ||
            signupShow && (!conPassword || !passwordVerify)
        ) {
            setError((prevError) => ({
                ...prevError,
                password: !password ? "Required" : "",
                conPassword: signupShow && !conPassword
                    ? "Required"
                    : !passwordVerify
                        ? "password & confirm password different"
                        : "",
                email: !email ? "Required"
                    : !emailVerify ? 'Add Correct email' : '',
            }));
            setTimeout(() => setError({}), 3000);
        } else {
            const data = {
                signup: signupShow,
                email,
                password,
            }
            const responce = await postLogin(data)
            if (responce.data.status === 'ok') {
                localStorage.setItem('email', responce.data.response.email)
                localStorage.setItem('token', responce.data.response.token)
                if (signupShow) {
                    enqueueSnackbar(
                        'User Create Successfully',
                        { variant: 'success' },
                    )
                } else {
                    enqueueSnackbar(
                        'Login Successfully',
                        { variant: 'success' },
                    )
                }
                nevigate('/home')
            } else {
                enqueueSnackbar(
                    responce.data.error,
                    { variant: 'error' },
                )
            }
        }
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const homeCall = () => {
        nevigate('/home')
    }

    return (
        <WorkSpace>
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    <Typography variant="h5" className={classes.signupheading} gutterBottom>
                        Join for Quize
                    </Typography>
                    <div className='d-flex flex-column'>
                        <div id="sign-in-button" />
                        <TextField id="outlined-basic" size="small" type="email" className={`mt-10`} onChange={(e) => setEmail(e.target.value)} placeholder="Email" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />
                        {error.email && <span style={{ color: 'var(--danger-color)' }}>{error.email}</span>}
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            className={classes.password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <FaEyeSlash style={{ color: 'var(--text-color)', fontSize: "18px" }} /> : <FaEye style={{ color: 'var(--text-color)', fontSize: "17px" }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {error.password && <span style={{ color: 'var(--danger-color)' }}>{error.password}</span>}
                        {signupShow && <TextField id="outlined-basic" size="small" type="password" onChange={(e) => setConPassword(e.target.value)} className='mt-10' placeholder="Confirm Password" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />}
                        {signupShow && error.conPassword && <span style={{ color: 'var(--danger-color)' }}>{error.conPassword}</span>}

                        {signupShow ?
                            <button className={`${classes.joinexambtn} fs-15`} onClick={() => login()}>Sign Up</button>
                            :
                            <button className={`${classes.joinexambtn} fs-15`} onClick={() => login()}>Login</button>
                        }

                        <div className='d-flex justify-end '>
                            {signupShow ?
                                <button className={`${classes.signupinq} d-flex align-center`} onClick={() => SigninCall()}>
                                    Sign In
                                </button>
                                :
                                <button className={`${classes.signupinq} d-flex align-center`} onClick={() => SignupCall()}>
                                    don't have account? Sign Up
                                </button>
                            }
                        </div>
                        <div className={`d-flex justify-center ${classes.resulthome}`}>
                            <button className={`${classes.homeBtn} fs-15`} onClick={homeCall}>
                                Home
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </Paper>
        </WorkSpace>
    );
};

export default Login;


