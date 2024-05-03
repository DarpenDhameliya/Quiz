import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import ad from '../../asset/logo/add.jpg'
import { useNavigate } from 'react-router-dom';
import useStyles from '../AuthStyle';
import { FaBitcoin } from 'react-icons/fa';
import QuestionViewComponent from '../../components/question';
import { Question } from '../../components/type';

const SignUp: React.FC = () => {
    const [questinsList, setQuestinsList] = useState<Question | null>(null);
    const [questinsListsave, setQuestinsListsave] = useState<Question[]>([]);
    const [correctAns, setCorrectAns] = useState<number | null | undefined>(null)
    const [wrongans, setWrongans] = useState<number | null>(null)
    const [AppliedAns, setAppliedAns] = useState(0)
    const [winAmount, setWinAmount] = useState(0);
    const classes = useStyles();
    const nevigate = useNavigate();

    useEffect(() => {
        let data: Question[] = [
            { "_id": "62bd892d30a2d97df66ce5d1", "question": "Name the national fruit of India?", "answer": ["Mango", "Banana", "Litchi", "Apple"], "correct": "Mango", "coins": "50" },
            { "_id": "62bd865f30a2d97df66ce5ce", "question": "Which country won the Cricket World Cup the most?", "answer": ["India", "Australia", "England", "Pakistan"], "correct": "Australia", "coins": "50" },
            { "_id": "62bd8e9530a2d97df66ce5d9", "question": "The National Game of India is?", "answer": ["Cricket", "Hockey", "Chess", "Tennis"], "correct": "Hockey", "coins": "50" },
            { "_id": "62bd897530a2d97df66ce5d2", "question": "Which among the following is the biggest animal in the world?", "answer": ["Shark", "Elephant", "Blue Whale", "Camel"], "correct": "Blue Whale", "coins": "50" },
        ]
        setQuestinsListsave(data)
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuestinsList(data[randomIndex])
    }, [])

    const getAnsuser = (ans: string, index: number) => {
        if (ans === questinsList?.correct) {
            setCorrectAns(index)
            setWinAmount((amount) => amount + 50)
        } else {
            const correctAnsIndex: number | undefined | null = questinsList?.answer.findIndex(
                (answer) => answer === questinsList?.correct
            );
            setCorrectAns(correctAnsIndex)
            setWrongans(index)
            setWinAmount((amount) => amount - 25)
        }
        setTimeout(() => {
            setWrongans(null)
            setCorrectAns(null)
            const randomIndex = Math.floor(Math.random() * questinsListsave.length);
            let applians = AppliedAns + 1
            setAppliedAns(AppliedAns + 1)
            if (applians >= 1) {
                setQuestinsList(questinsListsave[randomIndex])
            }
        }, 500);
    }

    useEffect(() => {
        if (AppliedAns + 1 === 2) {
            sessionStorage.setItem('coin', winAmount.toString());
            setTimeout(() => {
                nevigate('/result')
            }, 500);
        }
    }, [winAmount])

    const QuestionView = useCallback(() => {
        if (questinsList !== null) {
            return <QuestionViewComponent correctAns={correctAns} wrongans={wrongans} questinsList={questinsList} getAnswer={getAnsuser} />
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questinsList, correctAns, wrongans])

    return (
        <>
            <Paper className={classes.setProductpape} elevation={5}>
                <div className={classes.loginscrollSignup}>
                    <div className='flex justify-center ads-box' style={{ height: "280px" }}>
                        <img src={ad} alt='ad' className='w-full' style={{ maxHeight: '320px', borderRadius: "15px" }} />
                    </div>
                    <Typography variant="h5" className={` fs-12 flex flex-column text-center ${classes.signupheadingview1}`} style={{ marginTop: "15px" }} gutterBottom>
                        <span className='fs-15 ff-Roman'>
                            Let's begin!
                        </span>
                        <span style={{ color: '#d3b2fb8f' }}>Answer few questions and win  <FaBitcoin className={classes.coinsicon} /> 150 free!</span>
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 500 }} className={`font-semibold  ${classes.signupseconfhead}`} gutterBottom >
                        Question  1/2
                    </Typography>
                    {QuestionView()}
                    <ul className={`ff-Roman ${classes.view3joinexamterms}`} >
                        <span className='flex justify-center mb-2 font-medium' style={{ fontSize: "17px", color: "var(--text-color)", }}>Play Quiz and Win Coins!</span>
                        <li className={classes.view3li}>Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket & more!</li>
                        <li className={classes.view3li}>Compete with lakhs of other players!</li>
                        <li className={classes.view3li}>Win coins for every game</li>
                        <li className={classes.view3li}>Trusted by millions of other quiz enthusiasts like YOU!.</li>
                    </ul>
                </div>
            </Paper>
        </>
    )
}

export default SignUp
