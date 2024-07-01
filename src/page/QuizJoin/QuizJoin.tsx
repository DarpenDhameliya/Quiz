import React, { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import WorkSpace from "../../components/container";
import adsImg from "../../asset/logo/add.jpg";
import { getQuestionList, postUpdateUserWallet } from "../../api";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import usecategoryStyles from "../category/Category";
import { useWallet } from "../../context/walletContext";
import { useSnackbar } from "notistack";
import { MdSyncLock } from "react-icons/md";
import { ReactComponent as Timer } from "../../asset/images/abc.svg";
import { ReactComponent as Audience } from "../../asset/images/abcd.svg";
import { useWebDetail } from "../../context/settingContext";

interface Question {
  _id: string;
  question: string;
  answer: string[];
  correct: string;
  coins: string;
  quiz: object;
  chooseanswer?: string;
  audience?: string[];
}

const QuizJoin: React.FC = () => {
  const [questinsList, setQuestinsList] = useState<Question | null>(null);
  const [questinsListsave, setQuestinsListsave] = useState<Question[]>([]);
  const [correctAns, setCorrectAns] = useState<number | null | undefined>(null);
  const [wrongans, setWrongans] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [AppliedAns, setAppliedAns] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [loseAmount, setLoseAmount] = useState(0);
  const classes = usecategoryStyles();
  const examename = useParams();
  const nevigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openLifeline, setOpenLifeline] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [lifeLineOpetion, setlifeLineOpetion] = useState({
    fiftyFifty: true,
    audience: true,
    switch: true,
    timefreez: true,
  });
  const [timerPaused, setTimerPaused] = useState(false);
  const [quizTimer, setQuizTimer] = useState("");
  const { walletFetch } = useWallet();
  const { webDetailList } = useWebDetail();

  useEffect(() => {
    if (
      Object.keys(webDetailList).length > 0 &&
      webDetailList.response.length > 0
    ) {
      // if (Object.keys(webDetailList).length > 0) {
      setQuizTimer(webDetailList.response[0].examtime);
    } else {
      setQuizTimer("120");
    }
  }, [webDetailList]);

  const {
    data: questionList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["get-question-list"],
    async () => await getQuestionList(examename.id),
    {
      staleTime: Infinity,
    }
  );

  const userfind = localStorage.getItem("token");
  useEffect(() => {
    if (examename) {
      if (userfind) {
        refetch();
      } else {
        const sessiondata = sessionStorage.getItem("quiz");
        const parseData = sessiondata && JSON.parse(sessiondata);
        if (parseData) {
          const compareParseData = parseData.find(
            (id: string) => id === examename.id
          );
          if (compareParseData) {
            nevigate("/home");
          } else {
            refetch();
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examename]);

  const getAnsuser = (ans: string, index: number) => {
    if (progress < 99) {
      setTimerPaused(false);
      if (ans === questinsList?.correct) {
        setCorrectAns(index);
        setWinAmount((amount) => amount + 75);
        setTotalScore((amount) => amount + 75);
      } else {
        const correctAnsIndex: number | undefined | null =
          questinsList?.answer.findIndex(
            (answer) => answer === questinsList?.correct
          );
        setCorrectAns(correctAnsIndex);
        setWrongans(index);
        setLoseAmount((amount) => amount - 30);
        setTotalScore((amount) => amount - 30);
      }
      setTimeout(() => {
        setWrongans(null);
        setCorrectAns(null);
        let applians = AppliedAns + 1;
        setAppliedAns(applians);
        if (applians <= 15) {
          setQuestinsList(questinsListsave[applians]);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (questionList) {
      const alternateArray = [...questionList.data.response].sort(
        () => Math.random() - 0.5
      );
      setQuestinsListsave(alternateArray);
      setQuestinsList(alternateArray[0]);
    }
  }, [questionList]);

  const QuestionView = useCallback(() => {
    if (questinsList !== null && progress < 99) {
      return (
        <>
          <Typography variant="h5" gutterBottom className={classes.question}>
            {questinsList?.question}
          </Typography>
          <div className={classes.opetionBox}>
            {questinsList?.answer.map((option, index) => (
              <div
                key={index}
                className={`${classes.opetions} ${
                  correctAns !== null &&
                  correctAns === index &&
                  classes.correctanscss
                }
                                 ${
                                   wrongans !== null &&
                                   wrongans === index &&
                                   classes.wronganscss
                                 } ${
                  correctAns !== null &&
                  wrongans !== null &&
                  correctAns !== index &&
                  wrongans !== index &&
                  "setopacitystyle"
                }`}
                onClick={() => getAnsuser(option, index)}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questinsList, correctAns, wrongans]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!timerPaused && progress < 100) {
        if (quizTimer) {
          setProgress((prev) => prev + 100 / parseInt(quizTimer));
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [progress, timerPaused, quizTimer]);

  useEffect(() => {
    const getCoine = async () => {
      if (progress === 100 || progress >= 100 || AppliedAns + 1 === 16) {
        let coin = 0;
        if (winAmount / 50 >= 2 && winAmount / 50 <= 5) {
          coin = 500;
        } else if (winAmount / 50 >= 6 && winAmount / 50 <= 9) {
          coin = 2500;
        } else if (winAmount / 50 >= 10 && winAmount / 50 <= 14) {
          coin = 6000;
        } else {
          coin = 10000;
        }

        let totalScore = winAmount + loseAmount;
        const sessionData = {
          win: winAmount,
          lose: loseAmount,
          total: totalScore,
        };
        sessionStorage.setItem("quizsdata", JSON.stringify(sessionData));

        if (!userfind) {
          if (sessionStorage.getItem("coin") === null) {
            sessionStorage.setItem("coin", coin.toString());
          } else {
            let userWallet = sessionStorage.getItem("coin");
            if (userWallet) {
              sessionStorage.setItem(
                "coin",
                (parseInt(userWallet) + coin).toString()
              );
            }
          }

          if (sessionStorage.getItem("quiz") === null) {
            let quizeArray = [];
            quizeArray.push(examename.id);
            sessionStorage.setItem("quiz", JSON.stringify(quizeArray));
          } else {
            let quizeoldArray = sessionStorage.getItem("quiz");
            if (quizeoldArray) {
              let quizeArray = JSON.parse(quizeoldArray);
              quizeArray.push(examename.id);
              sessionStorage.setItem("quiz", JSON.stringify(quizeArray));
            }
          }
        }
        sessionStorage.setItem("date", new Date().getDate().toString());
        if (userfind) {
          const walletupdate = await postUpdateUserWallet(coin, "add");
          if (walletupdate.data.status === "ok") {
            walletFetch();
          } else {
            enqueueSnackbar(walletupdate.data.error, { variant: "error" });
          }
        }
        nevigate("/result");
      }
    };

    getCoine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winAmount, loseAmount, progress, AppliedAns]);

  const getColor = (progress: number) => {
    if (progress >= 80) {
      return "var(--danger-color)";
    } else {
      return "var(--success-color)";
    }
  };

  const handleOpenLifeline = () => {
    setOpenLifeline(!openLifeline);
  };

  const callFifty = () => {
    const correctAnswerIndex = questinsList?.answer.indexOf(
      questinsList?.correct
    );

    let modifiedOptions: any = [];
    if (questinsList) {
      const filterAnotherOpetion = questinsList?.answer.filter(
        (data: any, index) => index !== correctAnswerIndex
      );
      let filterOpetionId = Math.floor(
        Math.random() * filterAnotherOpetion.length
      );
      const secondOpetion = questinsList?.answer.indexOf(
        filterAnotherOpetion[filterOpetionId]
      );
      for (let i = 0; i < questinsList?.answer.length; i++) {
        if (i === correctAnswerIndex || i === secondOpetion) {
          modifiedOptions.push(questinsList?.answer[i]);
        } else {
          modifiedOptions.push("");
        }
      }

      setlifeLineOpetion((prevState) => ({
        ...prevState,
        fiftyFifty: false,
      }));
      // set new array in answer
      if (Object.keys(questinsList).length > 0) {
        setQuestinsList((prevState: Question | null) => ({
          ...(prevState as Question),
          answer: modifiedOptions,
        }));
      }
    }
  };

  const callAudience = () => {
    const correctAnswerIndex = questinsList?.answer.indexOf(
      questinsList?.correct
    );
    const higherValue = Math.floor(Math.random() * (100 - 40 + 1)) + 40;

    let number = 100 - higherValue;
    const length = 4;
    const result = Array(length).fill(0);

    // Distribute the number randomly among the elements
    for (let i = 0; i < length - 1; i++) {
      const randomValue = Math.floor(Math.random() * number);
      result[i] = randomValue;
      number -= randomValue;
    }

    result[length - 1] = number;

    // Assign a higher value to the specified index
    if (correctAnswerIndex) {
      result[correctAnswerIndex] += higherValue;
    }
    setQuestinsList((prevState: Question | null) => ({
      ...(prevState as Question),
      audience: result,
    }));
    setlifeLineOpetion((prevState) => ({
      ...prevState,
      audience: false,
    }));
  };

  const callTimefreez = () => {
    setTimerPaused(true); // Toggle the timerPaused state
    setlifeLineOpetion((prevState) => ({
      ...prevState,
      timefreez: false,
    }));
  };

  const callSwitch = () => {
    setQuestinsList(questinsListsave[15]);
    setlifeLineOpetion((prevState) => ({
      ...prevState,
      switch: false,
    }));
  };

  return (
    <Paper className={classes.quizPaper} elevation={5}>
      <Header />

      <div className={classes.middleportion}>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                backgroundColor: "var(--whitebg-color)",
                height: "3px",
                borderRadius: "10px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(progress), // Set color for the progress bar
                },
              }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Typography
              variant="body2"
              align="right"
              className={classes.remaintime}
            >
              {`Time Remaining: ${Math.max(
                0,
                Math.floor(
                  parseInt(quizTimer) - (progress / 100) * parseInt(quizTimer)
                )
              )} seconds`}
            </Typography>
            <Typography
              variant="h5"
              className={classes.signupseconfhead}
              gutterBottom
            >
              Question {AppliedAns + 1} / 15
            </Typography>
            {QuestionView()}
            <span
              className="flex justify-center mt-3"
              style={{ color: "var(--whitebglight-color)" }}
            >
              Your Score :{" "}
              <span className="ml-2" style={{ color: "var(--text-color)" }}>
                {totalScore}
              </span>
            </span>
            <div
              className="d-flex justify-center adsContent"
              style={{ marginTop: 20, marginBottom: "50px" }}
            ></div>
          </>
        )}
      </div>
      <div className={`bottom-fixed-div ${openLifeline ? "visible" : ""}`}>
        <div className="flex justify-center w-full h-[40px] ">
          <div
            onClick={handleOpenLifeline}
            className="lifelinebtn l-0 relative border-border border-[1px] rounded-full  px-3 py-2 flex gap-2 justify-center items-center absolute top-0 bg-bg_nav text-sm cursor-pointer transition-all duration-500 min-w-[30%]"
          >
            <span> Tap to use Lifelines </span>
          </div>
        </div>
        <div
          className="flex mt-4 text-[12px] items-start justify-evenly transition-all duration-1000 h-[0] overflow-hidden"
          style={{ height: "auto" }}
        >
          <div
            className={`w-full  flex flex-col absolute items-center justify-evenly text-base bg-bg_nav ${
              questinsList?.audience ? "" : "hidden"
            }`}
          >
            <div className="flex w-[50%] justify-evenly">
              <div className="flex flex-col justify-center items-center gap-1 text-slate-300	">
                A -{" "}
                {questinsList &&
                  questinsList.audience &&
                  questinsList.audience[0]}{" "}
                %
              </div>
              <div className="flex flex-col justify-center items-center gap-1 text-slate-300	">
                B -{" "}
                {questinsList &&
                  questinsList.audience &&
                  questinsList.audience[1]}{" "}
                %
              </div>
            </div>
            <div className="flex w-[50%] justify-evenly">
              <div className="flex flex-col justify-center items-center gap-1 text-slate-300">
                C -{" "}
                {questinsList &&
                  questinsList.audience &&
                  questinsList.audience[2]}{" "}
                %
              </div>
              <div className="flex flex-col justify-center items-center gap-1 text-slate-300">
                D -{" "}
                {questinsList &&
                  questinsList.audience &&
                  questinsList.audience[3]}{" "}
                %
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 justify-center items-center cursor-pointer ${
              questinsList?.audience ? "hidden" : ""
            } ${lifeLineOpetion.fiftyFifty === false && "greyscal"}`}
            onClick={callFifty}
          >
            <div
              className={`h-[60px] w-[60px] border-[1px]  rounded-full flex justify-center items-center border-color `}
              style={{ color: "#7c9fec" }}
            >
              50:50
            </div>
            <div style={{ color: "white" }}>50:50</div>
          </div>
          <div
            className={`flex flex-col gap-1 justify-center items-center cursor-pointer  ${
              questinsList?.audience ? "hidden" : ""
            } ${lifeLineOpetion.audience === false && "greyscal"}`}
            onClick={callAudience}
          >
            <div
              className="h-[60px] w-[60px] border-[1px]  rounded-full flex justify-center items-center "
              style={{ borderColor: "white" }}
            >
              <Audience />
            </div>
            <div style={{ color: "white" }}>Audience poll</div>
          </div>
          <div
            className={`flex flex-col gap-1 justify-center items-center cursor-pointer  ${
              questinsList?.audience ? "hidden" : ""
            } ${lifeLineOpetion.timefreez === false && "greyscal"}`}
            onClick={callTimefreez}
          >
            <div
              className="h-[60px] w-[60px] border-[1px]  rounded-full flex justify-center items-center "
              style={{ borderColor: "white" }}
            >
              <Timer />
            </div>
            <div style={{ color: "white" }}>Freeze Timer</div>
          </div>
          <div
            className={`flex flex-col gap-1 justify-center items-center cursor-pointer  ${
              questinsList?.audience ? "hidden" : ""
            } ${lifeLineOpetion.switch === false && "greyscal"}`}
            onClick={callSwitch}
          >
            <div
              className="h-[60px] w-[60px] border-[1px]  rounded-full flex justify-center items-center "
              style={{ borderColor: "white" }}
            >
              <MdSyncLock style={{ color: "#7c9fec", fontSize: "27px" }} />
            </div>
            <div style={{ color: "white" }}>Flip Question</div>
          </div>
        </div>
      </div>
      <Footer />
    </Paper>
  );
};

export default QuizJoin;
