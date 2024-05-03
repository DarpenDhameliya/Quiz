import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import WorkSpace from "../../components/container";
import adsImg from "../../asset/logo/add.jpg";
import resultImg from '../../asset/images/result.gif'
import useResultStyles from "./Result";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useWallet } from "../../context/walletContext";
import Loader from "../../components/loader/Loader";

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

    const dashboard = useCallback(() => {
        sessionStorage.removeItem('quizsdata')
        nevigate('/home')
    },[nevigate])

    if (walleterror) {
        enqueueSnackbar(
            walleterror?.response.data.error,
            { variant: 'error' },
        )
    }

    return (
        <WorkSpace>
            <Paper className={classes.setProductpape} elevation={5}>
                <div className={classes.loginscroll}>
                    <div
                        className="flex justify-center ads-box mt-2"
                    >
                        <img
                            src={adsImg}
                            alt="ad"
                            className="w-full"
                            style={{maxHeight: "auto",borderRadius: "15px"}}
                        />
                    </div>
                    <div className={`flex justify-center ${classes.resultheading}`}>
                        Well Played
                    </div>
                    <div className={classes.resultgif}>
                        <img
                            src={resultImg}
                            alt="ad"
                            className="w-full"
                            style={{maxHeight: "200px"}}
                        />
                    </div>
                    <div className={`flex ${classes.profilemiddle}`}>
                        <button className={`${classes.joinexambtn} fs-15`}>
                            <span className="mb-1.5">{score}</span>
                            <span className="mt-1.5">Your Score</span>
                        </button>
                        <button className={`${classes.joinexambtngest} fs-15`}>
                            {userFind ? (!walletFetching && !walletLoading && Object.keys(walletList).length !== 0) && <span className="mb-1.5">{walletList.response.balance}</span> : <span className="mb-1.5">{sessionStorage.getItem('coin')}</span>}
                            <span className="mt-1.5">Coin</span>
                        </button>
                    </div>
                    <div className={`flex justify-center ${classes.resulthome}`}>
                        <button className={`${classes.profilejoinbtn} fs-15`} onClick={dashboard}>
                            Home
                        </button>
                    </div>
                </div>
            </Paper>
        </WorkSpace>
    );
};

export default ResultIndex;

