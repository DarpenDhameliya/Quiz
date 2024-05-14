import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import WorkSpace from "../../components/container";
import adsImg from "../../asset/logo/add.jpg";
import resultImg from "../../asset/images/result.gif";
import useResultStyles from "./Result";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useWallet } from "../../context/walletContext";
import { getQuizAttempList } from "../../api";
import CryptoJS from "crypto-js";

const ResultIndex = () => {
  const [score, setScore] = useState(0);
  const classes: any = useResultStyles();
  const {
    walletList,
    walleterror,
    walletFetching,
    walletLoading,
    walletFetch,
  } = useWallet();
  const userFind = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

  const nevigate = useNavigate();

  //for decod at front side for question
  // useEffect(() => {
  //   const call = async () => {
  //     const listView = await getQuizAttempList();
  //     const encryptedMessage =
  //       "U2FsdGVkX1/M2QaRuG1z9OSEOWOlB1IXkxPpa6nRl6/Qd6FoJ0FzWIc6MK+HowKQdo4NQiFTykLxZdjXNlqaCA==";

  //       const key = "3213213213213321";
  //       const iv = CryptoJS.enc.Hex.parse("be410fea41df7162a679875ec131cf2c");
        
  //       try {
  //           var decrypted = CryptoJS.AES.decrypt(encryptedMessage, "3213213213213321", {
  //               iv: iv,
  //               mode: CryptoJS.mode.CBC,
  //               padding: CryptoJS.pad.Pkcs7,
  //             });
        
  //         // Try interpreting decrypted bytes using different encodings
  //         console.log("Decrypted (UTF-8): " + decrypted.toString(CryptoJS.enc.Utf8));
  //       } catch (error) {
  //         console.error("Decryption error:", error);
  //       }
  //   };
  //   call();
  // }, []);
  useEffect(() => {
    const data = sessionStorage.getItem("quizsdata");
    if (data) {
      const scoreData = JSON.parse(data);
      setScore(scoreData.total);
    }

    if (userFind && Object.keys(walletList).length === 0) {
      walletFetch();
    }
  }, []);

  const dashboard = useCallback(() => {
    sessionStorage.removeItem("quizsdata");
    nevigate("/home");
  }, [nevigate]);

  if (walleterror) {
    enqueueSnackbar(walleterror?.response.data.error, { variant: "error" });
  }

  return (
    <WorkSpace>
      <Paper className={classes.setProductpape} elevation={5}>
        <div className={classes.loginscroll}>
          <div className="flex justify-center ads-box mt-2">
            <img
              src={adsImg}
              alt="ad"
              className="w-full"
              style={{ maxHeight: "auto", borderRadius: "15px" }}
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
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div className={`flex ${classes.profilemiddle}`}>
                        <button className={`${classes.joinexambtn} fs-15`}>
                            <span className="mb-1">{score}</span>
                            <span className="mt-1">Your Score</span>
                        </button>
                        <button className={`${classes.joinexambtngest} fs-15`}>
                            {userFind ? (!walletFetching && !walletLoading && Object.keys(walletList).length !== 0) && <span className="mb-1">{walletList.data.response.balance}</span> : <span className="mb-5">{sessionStorage.getItem('coin')}</span>}
                            <span className="mt-1">Coin</span>
                        </button>
                    </div>
          <div className={`flex justify-center ${classes.resulthome}`}>
            <button
              className={`${classes.profilejoinbtn} fs-15`}
              onClick={dashboard}
            >
              Home
            </button>
          </div>
        </div>
      </Paper>
    </WorkSpace>
  );
};

export default ResultIndex;
