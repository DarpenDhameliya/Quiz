import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postAddQuestion, postAddQuestionexcel } from '../../../api';
import { useSnackbar } from 'notistack';
import { useQuiz } from '../../../context/quizContext';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';

const AddQuestion = () => {
    const [quiz_id, setQuiz_id] = useState('')
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', '', '', '']);
    const [correct, setCorrect] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const [imgError, setImgError] = useState('')
    const { quizList, quizFetch } = useQuiz();
    const [image, setImage] = useState<File | null>(null)

    const classes = useQuizStyles()
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
    }, [])

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
            const response = await postAddQuestion(data);
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

    const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // setImage(file)
            if (file) {
                const extension = file.name.split('.').pop()?.toLowerCase(); // Get the file extension
                if (extension === 'csv' || extension === 'xlsx') {
                    setImage(file);
                } else {
                    enqueueSnackbar(
                        'Please select a CSV file.',
                        { variant: 'error', autoHideDuration: 3000 },
                    );
                }
            }
        }
    }

    const handlesenddata = async () => {
        if (!image) {
            setImgError('Required')
            setTimeout(() => setImgError(''), 2000);
        } else {
            setIsLoading(true)
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }
            const response = await postAddQuestionexcel(formData);
            if (response.data.status === 'ok') {
                navigate('/admin/question')
                setImage(null)
                setError('')
            } else {
                enqueueSnackbar(
                    response.data.error,
                    { variant: 'error', autoHideDuration: 2000 },
                );
            }
            setIsLoading(false)
        }
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
                        Add Question
                    </Typography>
                </div>

                <Grid item xs={12} >
                    <Paper className={classes.setProductpaper} elevation={5}>
                        <h4 className='mb-2'> Using CSV</h4>
                        <div className='flex'>
                            <TextField type='file' id="category_id" size="small" variant="outlined" className={`m-0 w-full`} placeholder="image * " InputLabelProps={{ shrink: false }} onChange={handleImageChnage} />
                            <div className={`ml-5`}>
                                <Button variant="contained" sx={{ bgcolor: '#6c757d ' }} size="medium" className={`m-0 ${isLoading && "btn-disable"} ${classes.setsendbtninside}`} onClick={handlesenddata}>
                                    Add
                                </Button>
                            </div>
                        </div>
                        {imgError && <span className='color-warning'>{imgError}</span>}
                    </Paper>
                </Grid>
                <Paper className={classes.setProductpaper} elevation={5}>
                    <h4 className='mb-2'> Manually Add</h4>

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
                            Add
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default AddQuestion


