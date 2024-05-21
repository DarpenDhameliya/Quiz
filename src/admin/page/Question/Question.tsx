import React, { useCallback, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { getFilteredQuestionList, getQuizDetailsForQuestion, postDeleteQuestion } from '../../../api';
import { useQuery } from 'react-query';
import TableCell from "@mui/material/TableCell";
import { useSnackbar } from 'notistack';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useQuiz } from '../../../context/quizContext';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import Button from '@mui/material/Button';

const Question = () => {
    const [collapsId, setCollapsId] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [question, setQuestion] = useState([])
    const [collapsData, setCollapsData] = useState<any>({})
    const [searchByQuizId, setSearchByQuizId] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [perPage, setPerPage] = useState(0)
    const [open, setOpen] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const { quizList, quizFetch } = useQuiz();
    const classes = useQuizStyles()
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
    }, [])

    const { data: QuizData, refetch: questionFetch } = useQuery(
        ['get-FilteredQuestion-list', page, search, searchByQuizId],
        async () => await getFilteredQuestionList(search, searchByQuizId, page),
        {
            staleTime: Infinity,
        }
    );

    useEffect(() => {
        if (QuizData && QuizData.data.response) {
            setQuestion(QuizData.data.response.data)
            setTotalPages(QuizData.data.response.totalPage);
            setPerPage(QuizData.data.response.perPage)
        } else {
            if (QuizData) {
                enqueueSnackbar(
                    QuizData.data.error,
                    { variant: 'error', autoHideDuration: 2000 },
                );
                if (QuizData.status === 401) {
                    navigate('/login')
                }
            }
        }
    }, [QuizData])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const findQuizName = useCallback((quizId: any) => {
        const quiz = quizList?.response.find((data: any) => data.id === quizId);
        return quiz ? quiz.title : "";
    }, [quizList]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleCollapseOpen = (id: string, index: any) => {
        setCollapsId(id);
        setOpen(open === index ? null : index);
    };

    useEffect(() => {
        if (typeof open === 'number') {
            const getCollapsData = async () => {
                setIsLoading(true)
                try {
                    const response = await getQuizDetailsForQuestion(collapsId);
                    if (response.data.status === 'ok') {
                        setCollapsData(response.data.response);
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                        enqueueSnackbar(
                            response.data.error,
                            { variant: 'error', autoHideDuration: 2000 },
                        );
                    }
                } catch (error: any) {
                    setIsLoading(false)
                    enqueueSnackbar(
                        error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
                }
            }
            getCollapsData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const editQuestion = useCallback((id: number) => {
        navigate(`/admin/question/${id}`)
    }, [])

    const removeQuestion = async (id: number) => {
        setIsLoading(true)
        const response = await postDeleteQuestion(id)
        if (response.data.status === 'ok') {
            setIsLoading(false)
            questionFetch();
        } else {
            setIsLoading(false)
            enqueueSnackbar(
                response.data.error,
                { variant: 'error', autoHideDuration: 2000 },
            );
        }
    }

    const navigateNewQuestion = () => {
        navigate('/admin/question/add')
    }
    return (
        <>
            <Container
                component="main"
                maxWidth="xl"
                className={classes.setcontainer}
            >
                <div className={`py-2 ${classes.setpageheading}`}>
                    <Typography variant="h5" gutterBottom className={classes.setheading_h4}>
                        Question
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#6c757d ' }} size="medium" className={`m-0  ${classes.setsendbtninside}`} onClick={navigateNewQuestion}>
                        Add
                    </Button>
                </div>
                <Paper className={classes.setProductpaper} elevation={5}>
                    {/* {questionLoading || questionFetching || question.length === 0 || quizFetching ?
                                <Loader />
                                : <> */}
                    <div className='flex'>
                        <TextField type='text' size="small" variant="outlined" className={`m-0 w-full`} placeholder="Search ..." InputLabelProps={{ shrink: false }} onChange={handleSearch} />
                        <div className='flex items-center' style={{ minWidth: '150px' }}>
                            <Checkbox color="default" checked={searchByQuizId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchByQuizId(e.target.checked)} />
                            <span className='text-sm'>Search by Quiz</span>
                        </div>
                    </div>

                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className={classes.tableth}>
                                        No.
                                    </TableCell>
                                    <TableCell align="center" className={`min-w-72 ${classes.tableth}`}>
                                        Question
                                    </TableCell>
                                    <TableCell align="center" className={classes.tableth}>
                                        Correct
                                    </TableCell>
                                    <TableCell align="center" className={classes.tableth}>
                                        Quiz
                                    </TableCell>
                                    <TableCell align="center" className={classes.tableth}>
                                        action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {question.length > 0 && question.map((e: any, index: number) => {
                                    return (<>
                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={index % 2 === 0 ? 'bg-zinc-100' : ''}>
                                            <TableCell align="center" component="th" scope="row" className={classes.tabletd}>
                                                {(page - 1) * perPage + (index + 1)}
                                            </TableCell>
                                            <TableCell className={classes.tabletd} align="left">
                                                {e.question}
                                            </TableCell>
                                            <TableCell className={classes.tabletd} align="center">
                                                {e.correct}
                                            </TableCell>
                                            <TableCell className={classes.tabletd} align="center">
                                                {findQuizName(e.quiz_id)}
                                            </TableCell>
                                            <TableCell className={classes.tabletdicon} align="center" >
                                                <div className='flex justify-center items-center'>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleCollapseOpen(e.quiz_id, index)}
                                                    >
                                                        {open === index ? <BsChevronUp /> : <BsChevronDown />}
                                                    </IconButton>
                                                    <Tooltip title="Edit">
                                                        <FaEdit className={classes.seteditincon} onClick={() => editQuestion(e.id)} />
                                                    </Tooltip>
                                                    <Tooltip title="Remove">
                                                        <FaTrashAlt className={classes.setdeleteincon} onClick={() => removeQuestion(e.id)} />
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{
                                                paddingBottom: 0,
                                                paddingTop: 0
                                            }} colSpan={6}>
                                                <Collapse in={open === index} timeout="auto" unmountOnExit>
                                                    {isLoading ?
                                                        <Loader />
                                                        : <Box className={classes.collapsBox}>
                                                            <Typography variant="h6" className='ff-poppins mb-0'
                                                                gutterBottom component="div">
                                                                Quiz Detail
                                                            </Typography>
                                                            <Table size="small"
                                                                aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="center" className={classes.tableth}>
                                                                            Opetions
                                                                        </TableCell>
                                                                        <TableCell align="center" className={classes.tableth}>
                                                                            price
                                                                        </TableCell>
                                                                        <TableCell align="center" className={classes.tableth}>
                                                                            fee
                                                                        </TableCell>
                                                                        <TableCell align="center" className={classes.tableth}>
                                                                            category
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow >
                                                                        <TableCell className={classes.tabletd} component="th" align="center" scope="row">
                                                                            {e.answer}
                                                                        </TableCell>
                                                                        <TableCell className={classes.tabletd} align="center">
                                                                            {Object.keys(collapsData).length > 0 && collapsData[0].totalPrice}
                                                                        </TableCell>
                                                                        <TableCell className={classes.tabletd} align="center">
                                                                            {Object.keys(collapsData).length > 0 && collapsData[0].entryFee}
                                                                        </TableCell>
                                                                        <TableCell className={classes.tabletd} align="center">
                                                                            {Object.keys(collapsData).length > 0 && collapsData[0].category_name}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Box>}
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination page={page} count={totalPages} onChange={handleChange} shape="rounded" size="small" className='mt-2 d-flex justify-end' />
                    {/* </>/ */}
                    {/* } */}
                </Paper>
            </Container>
        </>
    )
}

export default Question