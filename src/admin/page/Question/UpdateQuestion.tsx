import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getQuestion, postEditQuestion } from '../../../api';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useQuiz } from '../../../context/quizContext';
import Loader from '../../../components/loader/Loader';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';

const UpdateQuestion = () => {
    const [quiz_id, setQuiz_id] = useState('')
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', '', '', '']);
    const [correct, setCorrect] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const { quizList, quizFetch } = useQuiz();
    const classes = useQuizStyles()
    const { enqueueSnackbar } = useSnackbar();

    let idparam = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
    }, [])

    const { data: questionData, isLoading: questionLoading, isFetching: questionFetching, } = useQuery(
        ['get-quiz-list', idparam.id],
        async () => await getQuestion(idparam.id),
        {
            enabled: !!idparam.id,
            staleTime: Infinity // for stop rerender at teb change
        }
    );

    useEffect(() => {
        if (questionData && questionData.data.response) {
            setQuestion(questionData.data.response[0].question)
            setOptions(JSON.parse(questionData.data.response[0].answer))
            setCorrect(questionData.data.response[0].correct)
            setQuiz_id(questionData.data.response[0].quiz_id)

        } else {
            if (questionData) {
                enqueueSnackbar(
                    questionData.data.error,
                    { variant: 'error', autoHideDuration: 2000 },
                );
                if (questionData.status === 401) {
                    navigate('/login')
                }
            }
        }
    }, [questionData])

    const senddata = async () => {
        const isEmptyOptions = options.some(option => option === '')
        if (!question || !correct || !quiz_id || isEmptyOptions) {
            setError('All Field Requied')
            setTimeout(() => setError(''), 2000);
        } else {
            setIsLoading(true)
            const data = {
                question,
                answer: options,
                correct,
                quizId: quiz_id,
            };
            const response = await postEditQuestion(idparam.id, data);
            if (response.data.status === 'ok') {
                setQuestion('')
                setOptions(['', '', '', ''])
                setCorrect('')
                setQuiz_id('')
                enqueueSnackbar(
                    response.data.response,
                    { variant: 'success' },
                )
                setTimeout(() => {
                    navigate('/admin/question')
                }, 500);
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

    const handleOptionChange = (index: number, value: any) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    if (questionLoading || questionFetching) {
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
                        Edit Question
                    </Typography>
                </div>

                <Paper className={classes.setProductpaper} elevation={5}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField type='text' required id="category_id" size="small" label={`Question`} variant="outlined" className={`m-0 w-full`} value={question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)} />
                        </Grid>
                        {[0, 1, 2, 3].map((index) => (
                            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                                <TextField
                                    required
                                    type='text'
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    label={`Option ${index + 1}`}
                                    value={options[index]}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                            <TextField required type='text' id="category_id" label={`correct ans`} size="small" variant="outlined" className={`m-0 w-full`} placeholder="correct " value={correct} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorrect(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>

                            <FormControl size="small" required className='w-full'>
                                <InputLabel id="demo-multiple-name-label">Quiz</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={quiz_id}
                                    onChange={(e: SelectChangeEvent) => setQuiz_id(e.target.value)}
                                    input={<OutlinedInput label="Quiz" />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <span className={classes.selectplaceholder}>select quiz *</span>;
                                        }
                                        const selectedCategory = quizList.response.find((c: any) => c.id === selected);
                                        return selectedCategory.title;
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Placeholder</em>
                                    </MenuItem>
                                    {Object.keys(quizList).length !== 0 && quizList.response.map((e: any) => {
                                        return (
                                            <MenuItem key={e.id} value={e.id}>
                                                {e.title}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {error && <span className='color-warning mt-3'>{error}</span>}
                    <div className='flex justify-end mt-3'>
                        <Button variant="contained" size="medium" sx={{ bgcolor: '#6c757d ' }} className={`m-0 ${classes.setsendbtninside} ${isLoading && "btn-disable"}`} onClick={senddata}>
                            Update
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default UpdateQuestion