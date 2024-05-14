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
import { postAdLogin } from '../../api';

interface ErrorState {
    password?: string;
    conPassword?: string;
    email?: string;
}

const AdLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupShow, setSignupShow] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState({} as ErrorState)

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
        if (
            !password ||
            !email ||
            !emailVerify) {
            setError((prevError) => ({
                ...prevError,
                password: !password ? "Required" : "",
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
            const responce = await postAdLogin(data)
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
                nevigate('/admin/quiz')
            } else {
                enqueueSnackbar(
                    responce.data.error,
                    { variant: 'error' },
                )
            }
        }
    }

    return (
        <WorkSpace>
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    <Typography variant="h5" className={classes.signupheading} gutterBottom>
                        Join for Quize
                    </Typography>
                    <div className='flex flex-column'>
                        <div id="sign-in-button" />
                        <TextField id="outlined-basic" size="small" type="email" className={`mt-10`} onChange={(e) => setEmail(e.target.value)} placeholder="Email" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />
                        {error.email && <span style={{ color: 'var(--danger-color)' }}>{error.email}</span>}
                        <TextField id="outlined-basic" size="small" type="password" onChange={(e) => setPassword(e.target.value)} className='mt-10' placeholder="Password" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />
                        {error.password && <span style={{ color: 'var(--danger-color)' }}>{error.password}</span>}
                        {signupShow ?
                            <button className={`${classes.joinexambtn} fs-15`} onClick={() => login()}>Sign Up</button>
                            :
                            <button className={`${classes.joinexambtn} fs-15`} onClick={() => login()}>Login</button>
                        }

                        <div className='flex justify-end d-none'>
                            {signupShow ?
                                <button className={`${classes.signupinq} flex align-center`} onClick={() => SigninCall()}>
                                    Sign In
                                </button>
                                :
                                <button className={`${classes.signupinq} d-none align-center`} onClick={() => SignupCall()}>
                                    don't have account? Sign Up
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </Paper>
        </WorkSpace>
    );
};

export default AdLogin;


