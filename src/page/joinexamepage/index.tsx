import { Box, Dialog, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';
import adsIcon from '../../asset/images/banner/add-icon.png';
import adsImg from "../../asset/logo/add.jpg";
import WorkSpace from '../../components/container';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import usecategoryStyles from '../category/Category';
import { getQuestionList, postUpdateUserWallet } from '../../api';
import { useSnackbar } from 'notistack';
import Loader from '../../components/loader/Loader';
import { useQuiz } from '../../context/quizContext';
import { useWallet } from '../../context/walletContext';
import { cardvalue } from '../../components/type';

// interface cardvalue {
//     id: number;
//     name: string;
//     totalPrice: string;
//     entryFee: number;
//     image: string;
// }

const Joinexame = () => {

    const [findCardValue, setFindCardValue] = useState<cardvalue | undefined>(undefined)
    const classes = usecategoryStyles();
    const nevigate = useNavigate();
    const examename = useParams()
    const { enqueueSnackbar } = useSnackbar();
    const { quizList, quizLoading, quizFetching, quizFetch } = useQuiz();
    const { walletList, walleterror, walletFetching, walletLoading, walletFetch } = useWallet();
    const [open, setOpen] = useState(false);
    const [openAds, setOpenAds] = useState(false);

    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (Object.keys(quizList).length !== 0) {
            console.log(quizList.response, examename.id)
            let findcardval: cardvalue | undefined = quizList.response.find((res: any) => res.id == examename.id)
            setFindCardValue(findcardval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizList])

    const handleOpenAds = () => {
        setOpen(false);
        setOpenAds(true);
    };

    const handleCloseAds = () => {
        setOpenAds(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlestartquize = async () => {
        // setOpen(true);
        const response = await getQuestionList(examename.id)
        if (response?.data.status === 'ok') {
            if (response.data.response.length > 0) {
                let dateCheck = sessionStorage.getItem('date')
                let coin = sessionStorage.getItem('coin')
                if (dateCheck) { // if date exist then enter 
                    if (new Date().getDate() === parseInt(dateCheck)) { // if localhost date is same as todays dame then enter the block and check for clicked quiz is given or not 
                        let quizData = sessionStorage.getItem('quiz')
                        console.log(quizData)
                        if (quizData) {
                            let QuizArray = JSON.parse(quizData).find((data: string) => data === examename.id)
                            if (QuizArray) {
                                enqueueSnackbar(
                                    'Cannot Play Same Quize Again',
                                    { variant: 'error', autoHideDuration: 2000 },
                                );
                            } else {
                                if (coin && findCardValue) {
                                    const userwallet = JSON.parse(coin)
                                    sessionStorage.setItem('coin', JSON.stringify(userwallet - findCardValue.entryFee));
                                }
                                nevigate(`/play/${examename.id}`)
                            }
                        } else {
                            nevigate(`/play/${examename.id}`)
                        }
                    } else {
                        sessionStorage.removeItem('quiz')
                        sessionStorage.removeItem('date')
                        if (coin && findCardValue) {
                            const userwallet = JSON.parse(coin)
                            sessionStorage.setItem('coin', JSON.stringify(userwallet - findCardValue.entryFee));
                        }
                        nevigate(`/play/${examename.id}`)
                    }
                } else { // if date is not found in localstorage then enter to this block
                    if (coin && findCardValue) {
                        const userwallet = JSON.parse(coin)
                        sessionStorage.setItem('coin', JSON.stringify(userwallet - findCardValue.entryFee));
                    }
                    nevigate(`/play/${examename.id}`)
                }
            } else {
                enqueueSnackbar(
                    'Question Not Found',
                    { variant: 'error', autoHideDuration: 2000 },
                );
            }
        }
    }
    const userData = localStorage.getItem('token')
    const moveloginpage = () => {
        nevigate(`/login`)
    }

    const handlestartquize_user = async () => {
        const response = await getQuestionList(examename.id)
        if (response?.data.status === 'ok') {
            if (response.data.response.length > 0) {

                if (findCardValue) {
                    const walletupdate = await postUpdateUserWallet(findCardValue.entryFee, 'remove')
                    if (walletupdate.data.status === 'ok') {
                        walletFetch();
                        nevigate(`/play/${examename.id}`)
                    } else {
                        enqueueSnackbar(
                            walletupdate.data.error,
                            { variant: 'error' },
                        )
                    }
                }
            } else {
                enqueueSnackbar(
                    'Question Not Found',
                    { variant: 'error', autoHideDuration: 2000 },
                );
            }
        }
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open} className={classes.dialog}>
                <Box className='closeIcon'><RxCross2 onClick={() => setOpen(false)} /></Box>
                <Box className='text-center'>
                    <img src={adsIcon} alt="ad" width='auto' />
                    <p>oops!</p>
                    <span>Not enough coins to play</span>
                    <button onClick={handleOpenAds}>Watch Ad</button>
                </Box>
            </Dialog>
            <Dialog onClose={handleCloseAds} open={openAds} className={classes.dialog}>
                <Box className='closeIcon'><RxCross2 onClick={() => setOpenAds(false)} /></Box>
                <div className="flex justify-center ads-box">
                    <img
                        src={adsImg}
                        alt="ad"
                        style={{
                            width: "100%",
                            maxHeight: "320px",
                        }}
                    />
                </div>
            </Dialog>
            <WorkSpace>
                <Paper className={classes.setProductpape} elevation={5}>
                    <Header />
                    <div className={classes.loginscroll}>
                        {quizLoading || quizFetching || Object.keys(quizList).length === 0 ?
                            <Loader />
                            :
                            <>
                                <div
                                    className="flex justify-center ads-box"
                                    style={{ marginBottom: 20 }}
                                >
                                    <img
                                        src={adsImg}
                                        alt="ad"
                                        style={{
                                            width: "100%",
                                            maxHeight: "320px",
                                        }}
                                    />
                                </div>

                                <div className={classes.joinexamtop}>
                                    <img src={findCardValue?.image} alt='logo' className={classes.setjoinexamimg} />
                                    <div className={classes.joinexamdetail}>
                                        <h6 className={classes.joinexamname}>{findCardValue?.name}</h6>
                                        <h4 className={classes.joinexamwin}>play & Win {findCardValue?.totalPrice}</h4>
                                    </div>
                                </div>
                                <div className={`flex ${classes.joinexammiddle}`}>
                                    {userData ?
                                        <button className={classes.joinexambtngest} onClick={handlestartquize_user} style={{ width: "200px" }}>Play</button>
                                        :
                                        <>
                                            <button className={classes.joinexambtn} onClick={moveloginpage}>Join with name</button>
                                            <span style={{ color: 'var(--text-color)' }}>OR</span>
                                            <button className={classes.joinexambtngest} onClick={handlestartquize}>Play As Guest</button>
                                        </>
                                    }
                                </div>
                            </>
                        }

                        <ul className={classes.joinexamterms} >
                            <li className={classes.joinexamtermslist}>You've got 90 - 150 seconds to answer all questions</li>
                            <li className={classes.joinexamtermslist}>Answer as many questions as you can</li>
                            <li className={classes.joinexamtermslist}>For Every Correct answer you will get +50 points and will loose -25 points on every Incorrect answer</li>
                            <li className={classes.joinexamtermslist}>You can take help by using the lifelines present in the contest.</li>
                            <li className={classes.joinexamtermslist}>Lifelines can be used for free or by using a given amount of coins for each lifeline.</li>
                        </ul>
                    </div>
                    <Footer />
                </Paper>
            </WorkSpace>
        </>
    )
}

export default Joinexame
