import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postAddWebDetail, postEditWebDetail } from '../../../api';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useWebDetail } from '../../../context/settingContext';
import Loader from '../../../components/loader/Loader';

const Setting = () => {
    const [image, setImage] = useState<File | null>(null)
    const [webName, setWebName] = useState('')
    const [quizTime, setQuizTime] = useState('')
    const [lifelineCoin, setLifelineCoin] = useState('')
    const [encodeUrl, setEncodeUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const [updateData, setUpdateData] = useState(false)
    const [updateId, setUpdateId] = useState('')
    const { webDetailList, webDetailLoading, webDetailFetching, webDetailFetch } = useWebDetail();

    const classes = useQuizStyles()
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(webDetailList).length === 0) {
            webDetailFetch();
        }
    }, [])

    useEffect(() => {
        if (Object.keys(webDetailList).length > 0) {
            setUpdateData(true)
            setUpdateId(webDetailList.response[0].id)
            setWebName(webDetailList.response[0].websitename)
            setQuizTime(webDetailList.response[0].examtime)
            setLifelineCoin(webDetailList.response[0].adscoin)
            setEncodeUrl(webDetailList.response[0].image)
            setImage(webDetailList.response[0].image)
        }

    }, [webDetailList])

    const senddata = async () => {

        if (!webName || !quizTime || !lifelineCoin || !image) {
            setError('All Field Requied')
            setTimeout(() => setError(''), 2000);
        } else {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('websitename', webName);
            formData.append('image', image);
            formData.append('examtime', quizTime);
            formData.append('adscoin', lifelineCoin);
            let response;
            if (updateData) {
                response = await postEditWebDetail(updateId, formData);
            } else {
                response = await postAddWebDetail(formData);
            }
            if (response.data.status === 'ok') {
                setWebName('')
                setImage(null)
                setQuizTime('')
                setLifelineCoin('')
                enqueueSnackbar(
                    response.data.response,
                    { variant: 'success' },
                )
                webDetailFetch();
            } else {
                enqueueSnackbar(
                    response.data.error,
                    { variant: 'error' },
                )

                if (response.status === 401) {
                    navigate('/login')
                }
            }
            setIsLoading(false)
        }
    }

    const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const extension = file.name.split('.').pop()?.toLowerCase();
            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                setImage(file);
                const displayImg = URL.createObjectURL(file);
                setEncodeUrl(displayImg);
            } else {
                enqueueSnackbar(
                    'Please select a JPEG, JPG, PNG file.',
                    { variant: 'error', autoHideDuration: 3000 },
                );
            }
        }
    }

    if (webDetailFetching || webDetailLoading) {
        return <Loader />
    }

    return (
        <>
            <Container
                component="main"
                maxWidth="xl"
                className={classes.setcontainer}
            >
                <div className={classes.setpageheading}>
                    <Typography variant="h5" gutterBottom className={classes.setheading_h4}>
                        Setting
                    </Typography>
                </div>

                <Paper className={classes.setProductpaper} elevation={5}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6} md={9} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} >
                                    <TextField required type='file' size="small" variant="outlined" fullWidth onChange={handleImageChnage} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField required type='text' label={`Website Name`} size="small" variant="outlined" className={`m-0 w-full`} value={webName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebName(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField type='text' required size="small" label={`Quiz Time`} variant="outlined" className={`m-0 w-full`} value={quizTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizTime(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField required type='text' label={`Ads Coin`} size="small" variant="outlined" className={`m-0 w-full`} value={lifelineCoin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLifelineCoin(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            {encodeUrl && <img src={encodeUrl} alt='logo' className='max-h-52' />}
                        </Grid>
                    </Grid>
                    {error && <span className='color-warning mt-3'>{error}</span>}
                    <div className='flex justify-end mt-3'>
                        <Button variant="contained" size="medium" sx={{ bgcolor: '#6c757d ' }} className={`m-0 ${classes.setsendbtninside} ${isLoading && "btn-disable"}`} onClick={senddata}>
                            Save
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default Setting