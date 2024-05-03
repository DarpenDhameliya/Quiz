import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { Question } from './type';

interface questionProps {
    questinsList: Question;
    correctAns: number | null | undefined;
    wrongans: number | null;
    getAnswer: (ans: string, index: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({

    question: {
        color: '#f0f8ff8f',
        fontSize: "16px !important",
        marginBottom: "20px !important",
        fontFamily: 'Poppins, sans-serif !important',
    },
    opetionBox: {
        gap: '0.75rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
        minWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
        },
    },
    opetions: {
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid var(--text-color)',
        fontSize: "16px",
        color: 'var(--text-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: "46px"
    },
    correctanscss: {
        backgroundColor: 'var(--success-color)',
        borderColor: 'var(--success-color)'
    },
    wronganscss: {
        backgroundColor: 'var(--danger-color)',
        borderColor: 'var(--danger-color)'
    },
}));
const QuestionViewComponent: React.FC<questionProps> = ({ correctAns, wrongans, questinsList, getAnswer }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h5" gutterBottom className={classes.question}>
                {questinsList?.question}
            </Typography>
            <div className={classes.opetionBox}>
                {questinsList?.answer.map((option, index: number) => (
                    <div
                        key={index}
                        className={`${classes.opetions} ${correctAns !== null && correctAns === index && classes.correctanscss}
                                 ${wrongans !== null && wrongans === index && classes.wronganscss
                            }`}
                        onClick={() => getAnswer(option, index)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </>
    )
}

export default QuestionViewComponent
