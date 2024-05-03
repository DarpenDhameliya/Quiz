import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../../asset/logo/googlelogo.png';
import WorkSpace from '../../components/container';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import firebase from '../../firebase';
import useStyles from '../AuthStyle';
import { postOtpLogin } from '../../api';

declare global {
  interface Window {
    recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
    confirmationResult?: firebase.auth.ConfirmationResult;
  }
}

const OtpLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSensuccess, setOtpSensuccess] = useState(false)
  const [getotp, setGetotp] = useState('')
  const [numberVerify, setNumberVerify] = useState(false)
  const [waitMessage, setWaitMessage] = useState(false)
  const [user, setUser] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const classes: any = useStyles();
  const nevigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 10) {
      setNumberVerify(true)
    } else {
      setNumberVerify(false)
    }
    setMobileNumber(e.target.value)
  };
  const handleotpchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 6) {
      setNumberVerify(true)
    } else {
      setNumberVerify(false)
    }
    setGetotp(e.target.value)
  };

  useEffect(() => {
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse.access_token),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios.get(
        'http://localhost:8000/api/user/google_registration',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': user
          }
        }
      ).then((response: any) => {
        console.log('response.data', response.data);
        localStorage.setItem('email', response.data.response.email)
        localStorage.setItem('name', response.data.response.name)
        localStorage.setItem('token', response.data.response.token)
        nevigate('/home')
        setUser('')
      }).catch((error: any) => {
        console.error('Error fetching data: ', error);
      })
    }
  }, [user]);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log("Recaptcha verified");
        return true
      },
      defaultCountry: "IN"
    });
  };

  const onSignInSubmit = () => {
    if (mobileNumber && mobileNumber.length === 10) {
      setWaitMessage(true)
      setNumberVerify(false)
      configureCaptcha();
      const phoneNumber: string = "+91" + mobileNumber;
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        console.log("Recaptcha verifier is not initialized.");
        return;
      }

      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setWaitMessage(false)
          setOtpSensuccess(true)
          console.log("OTP has been sent");
        }).catch((error: any) => {
          console.log(error.message)
          setWaitMessage(false)
          enqueueSnackbar(
            error.message,
            { variant: 'error' },
          );
        });
    }
  };

  const onSubmitOTP = () => {
    if (getotp && getotp.length === 6) {
      if (!window.confirmationResult) {
        return
      }
      setNumberVerify(false)
      window.confirmationResult.confirm(getotp).then(async (result) => {
        setOtpSensuccess(false)
        const otpLogin = await postOtpLogin(mobileNumber)
        if (otpLogin.data.status === 'ok') {
          setMobileNumber('')
          localStorage.setItem('token', otpLogin.data.response.token)
          nevigate('/home')
        } else {
          enqueueSnackbar(
            otpLogin.data.error,
            { variant: 'error' },
          );
        }
      }).catch((error) => {
        if (error.code === 'auth/invalid-verification-code') {
          enqueueSnackbar(
            'invalid verification code !',
            { variant: 'error' },
          );
        } else {
          enqueueSnackbar(
            'Something Went Wrong !',
            { variant: 'error' },
          );
        }
      });
    }
  }

  return (
    <WorkSpace>
      <Paper className={classes.setProductpape} elevation={5}>
        <Header />
        <div className={classes.loginscroll} >
          <Typography variant="h5" className={classes.signupheading} gutterBottom>
            Join for Quize
          </Typography>
          <div className='flex flex-column'>
            <div id="sign-in-button" />
            <TextField id="outlined-basic" size="small" type="text" className={`mt-10 `} onChange={handleChange} placeholder="Enter Phone Number" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />
            {otpSensuccess && <TextField id="outlined-basic" size="small" type="text" onChange={handleotpchange} className='mt-10' placeholder="Enter Number" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' } }} />}
            {otpSensuccess ?
              <button className={`${classes.joinexambtn} fs-15 ${!numberVerify && 'disablebtn'}`} onClick={() => onSubmitOTP()}>Submit</button>
              :
              <button className={`${classes.joinexambtn} fs-15 ${!numberVerify && 'disablebtn'}`} onClick={() => onSignInSubmit()}>Get Otp</button>
            }
            {waitMessage && <Typography className='flex justify-center mt-10' style={{ color: 'var(--text-color)' }}> Wait for otp ...</Typography>}

            <div className='flex justify-center '>
              <button className={`${classes.profilejoinbtn} fs-15 flex align-center`} onClick={() => login()}>
                <img src={google} alt='google logo' style={{ width: "30px", paddingRight: "10px" }} />
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </Paper>
    </WorkSpace>
  );
};

export default OtpLogin;


