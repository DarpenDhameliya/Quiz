import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import usecategoryStyles from "../category/Category";
import { FcBusinessman } from "react-icons/fc";
import adsImg from "../../asset/logo/add.jpg";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/walletContext";

const Profile = () => {
    const classes: any = usecategoryStyles();
    const [quizPlayed, setQuizPlayed] = useState(0)
    const nevigate = useNavigate();
    const userfind = localStorage.getItem('token')
    const { walletList, walleterror, walletFetching, walletLoading, walletFetch } = useWallet();

    useEffect(() => {
        let sessionData = sessionStorage.getItem('quiz')
        if (sessionData) {
            let sessionParseData = JSON.parse(sessionData)
            setQuizPlayed(sessionParseData.length)
        }

    }, [])

    const callLoginCom = () => {
        nevigate('/login')
    }

    const logoutuser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('type')

        if (sessionStorage.getItem('coin')) {
            nevigate("/home")
        } else {
            nevigate("/")
        }
    }

    return (
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    {userfind ?
                        <div className={`d-flex ${classes.profilemiddle} flex-column`}>
                            <div>
                                <h3 className={`${classes.profileuser}  ${classes.proileFont}`}>User :
                                    <span style={{ marginLeft: "10px" }}>
                                        {localStorage.getItem('email')}
                                    </span>
                                </h3>
                            </div>
                            <div className={`${classes.usercoinbtn} `} >
                                Coins <span className="ml-5">{(!walletFetching && !walletLoading && Object.keys(walletList).length !== 0 && walletList.data.status === 'ok') && walletList.data.response.balance}</span>
                            </div>
                            <button className={`${classes.userlogout} fs-15`} onClick={logoutuser}>
                                Logout
                            </button>
                        </div>
                        :
                        <>
                            <div className={classes.profiletop}>
                                <FcBusinessman className={classes.profileimg} />
                                <div className={classes.profileusermain}>
                                    <h2 className={`${classes.profileuser}  ${classes.proileFont}`}>User : Guest
                                    </h2>
                                </div>
                            </div>
                            <div className={`d-flex ${classes.profilemiddle}`}>
                                <button className={`${classes.joinexambtn} fs-15`}>
                                    Coins <span className="ml-5">{sessionStorage.getItem('coin')}</span>
                                </button>
                                <button className={`${classes.joinexambtngest} fs-15`}>
                                    Quize Playd <span className="ml-5">{quizPlayed}</span>
                                </button>
                            </div>
                            <div className="d-flex justify-center">
                                <button className={`${classes.profilejoinbtn} fs-15`} onClick={callLoginCom}>
                                    Join Now
                                </button>
                            </div>
                        </>
                    }
                    <div
                        className="d-flex justify-center ads-box"
                        style={{ marginTop: 20 }}
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
                </div>
                <Footer />
            </Paper>
    );
};

export default Profile;
