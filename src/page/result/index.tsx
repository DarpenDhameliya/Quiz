import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import adsImg from "../../asset/logo/add.jpg";
import resultImg from '../../asset/images/result.gif'
import useResultStyles from "./Result";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useWallet } from "../../context/walletContext";

const ResultIndex = () => {
    const [score, setScore] = useState(0)
    const classes: any = useResultStyles();
    const { walletList, walleterror, walletFetching, walletLoading, walletFetch } = useWallet();
    const userFind = localStorage.getItem('token')

    const { enqueueSnackbar } = useSnackbar();
    const nevigate = useNavigate();


    useEffect(() => {
        const data = sessionStorage.getItem('quizsdata')
        if (data) {
            const scoreData = JSON.parse(data)
            setScore(scoreData.total)
        }

        if (userFind && Object.keys(walletList).length === 0) {
            walletFetch();
        }
    }, [])

    const homeCall = () => {
        sessionStorage.removeItem('quizsdata')
        nevigate('/home')
    }

    if (walleterror) {
        enqueueSnackbar(
            walleterror?.response.data.error,
            { variant: 'error' },
        )
    }

    return (
        <Paper className={classes.setProductpape} elevation={5}>
            <div className={classes.loginscroll}>
                <div
                    className="d-flex justify-center ads-box"
                    style={{ marginTop: 10 }}
                >
                    <img
                        src={adsImg}
                        alt="ad"
                        style={{
                            width: "100%",
                            maxHeight: "auto",
                            borderRadius: "15px",
                        }}
                    />
                </div>
                <div className={`d-flex justify-center ${classes.resultheading}`}>
                    Well Played
                </div>
                <div className={classes.resultgif}>
                    <img
                        src={resultImg}
                        alt="ad"
                        style={{
                            width: "100%",
                            maxHeight: "200px",
                        }}
                    />
                </div>
                <div className={`d-flex ${classes.profilemiddle}`}>
                    <button className={`${classes.joinexambtn} fs-15`}>
                        <span className="mb-5">{score}</span>
                        <span className="mt-5">Your Score</span>
                    </button>
                    <button className={`${classes.joinexambtngest} fs-15`}>
                        {userFind ? (!walletFetching && !walletLoading && Object.keys(walletList).length !== 0) && <span className="mb-5">{walletList.data.response.balance}</span> : <span className="mb-5">{sessionStorage.getItem('coin')}</span>}
                        <span className="mt-5">Coin</span>
                    </button>
                </div>
                <div className={`d-flex justify-center ${classes.resulthome}`}>
                    <button className={`${classes.profilejoinbtn} fs-15`} onClick={homeCall}>
                        Home
                    </button>
                </div>


            </div>
        </Paper>
    );
};

export default ResultIndex;

