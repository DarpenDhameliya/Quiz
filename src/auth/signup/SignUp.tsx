import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import ad from "../asset/logo/add.jpg";
import { useNavigate } from "react-router-dom";
import useStyles from "../AuthStyle";
import { FaBitcoin } from "react-icons/fa";
import { useQuiz } from "../../context/quizContext";
import { getQuestionList } from "../../api";
import { useSnackbar } from "notistack";
import bg from "../asset/images/parallax-section-bg.png";
import { url } from "inspector";

interface Question {
  id: string;
  question: string;
  answer: string[];
  correct: string;
  coins: string;
  quiz: object;
}

const Signup: React.FC = () => {
  const [questinsList, setQuestinsList] = useState<Question | null>(null);
  const [questinsListsave, setQuestinsListsave] = useState<Question[]>([]);
  const [correctAns, setCorrectAns] = useState<number | null | undefined>(null);
  const [wrongans, setWrongans] = useState<number | null>(null);
  const [AppliedAns, setAppliedAns] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const nevigate = useNavigate();
  const { quizList, quizLoading, quizFetching, quizFetch, quizerror } =
    useQuiz();

  useEffect(() => {
    if (Object.keys(quizList).length === 0) {
      quizFetch();
    }
  }, []);

  useEffect(() => {
    const getSignupQustion = async () => {
      if (Object.keys(quizList).length !== 0) {
        const signupQuiz = quizList.response.find(
          (data: any) => data.title === "signup"
        );
        if (signupQuiz) {
          const response = await getQuestionList(signupQuiz.id);
          if (response.data.status === "ok") {
            setQuestinsListsave(response.data.response);
            const randomIndex = Math.floor(
              Math.random() * response.data.response.length
            );
            setQuestinsList(response.data.response[randomIndex]);
          } else {
            enqueueSnackbar(response.data.error, {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
        }
      }
    };
    getSignupQustion();
  }, [quizList]);

  const getAnsuser = (ans: string, index: number) => {
    if (ans === questinsList?.correct) {
      setCorrectAns(index);
      setWinAmount((amount) => amount + 75);
    } else {
      const correctAnsIndex: number | undefined | null =
        questinsList?.answer.findIndex(
          (answer) => answer === questinsList?.correct
        );
      setCorrectAns(correctAnsIndex);
      setWrongans(index);
      setWinAmount((amount) => amount - 30);
    }
    setTimeout(() => {
      setWrongans(null);
      setCorrectAns(null);
      const randomIndex = Math.floor(Math.random() * questinsListsave.length);
      let applians = AppliedAns + 1;
      setAppliedAns(AppliedAns + 1);
      if (applians >= 1) {
        setQuestinsList(questinsListsave[randomIndex]);
      }
    }, 1000);
  };

  useEffect(() => {
    if (AppliedAns + 1 === 2) {
      sessionStorage.setItem("coin", winAmount.toString());
      setTimeout(() => {
        nevigate("/result");
      }, 500);
    }
  }, [winAmount]);

  const QuestionView = useCallback(() => {
    if (questinsList !== null) {
      return (
        <>
          <Typography
            variant="h5"
            gutterBottom
            className={` ${classes.question}`}
          >
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
                } ${
                  wrongans !== null && wrongans === index && classes.wronganscss
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

  return (
    <>
      <Paper className={classes.quizPaper} elevation={5}>
        <div className="loginscrollSignup02">
          <div
            className="d-flex justify-center adsContent"
            //   style={{ height: "280px" }}
          ></div>
          <Typography
            variant="h5"
            className={` fs-12 d-flex flex-column text-center ${classes.signupheadingview1}`}
            style={{ marginTop: "15px" }}
            gutterBottom
          >
            <span className="fs-15">Let's begin!</span>
            <span
              className="flex justify-center"
              style={{ color: "#d3b2fb8f" }}
            >
              Answer few questions and win{" "}
              <FaBitcoin className={classes.coinsicon} /> 100 free!
            </span>
          </Typography>

          <Typography
            variant="h5"
            sx={{ fontWeight: 500 }}
            className={`fw-600  ${classes.signupseconfhead}`}
            gutterBottom
          >
            Question {AppliedAns + 1}/2
          </Typography>
          {QuestionView()}
          <ul className={` ${classes.view3joinexamterms}`}>
            <span className="d-flex justify-center handlespan">
              Play Quiz and Win Coins!
            </span>
            <li className={classes.view3li}>
              Play Quizzes in 25+ categories like GK, Sports, Bollywood,
              Business, Cricket & more!
            </li>
            <li className={classes.view3li}>
              Compete with lakhs of other players!
            </li>
            <li className={classes.view3li}>Win coins for every game</li>
            <li className={classes.view3li}>
              Trusted by millions of other quiz enthusiasts like YOU!.
            </li>
          </ul>
          <div className={` ${classes.funFacts}`}>
            <h5 className="d-flex justify-center handlespan">Fun Facts</h5>
            The insurance industry is one of the largest industries in the
            United States, with over $1.5 trillion in annual premiums.The word
            "insurance" comes from the French word "assurer", which means "to
            make sure". The first insurance company in the United States was
            founded in Charleston, South Carolina, in 1735.The insurance
            industry employs over 2 million people in the United States. The
            average American household spends about $1,500 per year on insurance
            premiums. The most expensive type of insurance in the United States
            is long-term care insurance, which can cost upwards of $5,000 per
            month.
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Signup;
