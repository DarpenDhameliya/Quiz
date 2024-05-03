import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { getCategoryList, postAddCategory, postAddQuiz, postDeleteCategory, postDeleteQuiz, postEditCategory, postEditQuiz } from '../../../api';
import { useApp } from '../../../context/categoryContext';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useSnackbar } from 'notistack';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useQuiz } from '../../../context/quizContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const Quiz = () => {
    const [name, setName] = useState('')

    const [totalPrice, setTotalPrice] = useState('')
    const [entryFee, setEntryFee] = useState('')
    const [live, setLive] = useState(false)
    const [category_id, setCategory_id] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [encodeUrl, setEncodeUrl] = useState('')
    const [updateId, setUpdateId] = useState('')
    const classes = useQuizStyles()
    const { categoryList, categoryFetch, categoryLoading, categoryFetching } = useApp();
    const { quizList, quizLoading, quizFetching, quizFetch, quizerror } = useQuiz();

    const [error, setError] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (Object.keys(categoryList).length === 0) {
            categoryFetch();
        }
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
    }, [])

    const handlesenddata = async () => {
        const data = {
            title: name,
            totalPrice,
            entryFee,
            category_id,
            live,
        }
        if (updateId) {
            if (!name || !totalPrice || !entryFee || !category_id) {
                setError('Fill All Field')
                setTimeout(() => {
                    setError('')
                }, 2000);
            } else {
                const response = await postEditQuiz(updateId, data);
                if (response?.data.status === 'ok') {
                    setTotalPrice('')
                    setEntryFee('')
                    setName('')
                    setCategory_id('')
                    setLive(false)
                    setUpdateId('')
                    enqueueSnackbar(
                        'Update Successfully',
                        { variant: 'success', autoHideDuration: 2000 },
                    );
                    quizFetch();
                } else {
                    console.log(response, '-0=-0=0=-0=0')
                    enqueueSnackbar(
                        response?.data.error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
                }
            }
        } else {
            if (!name || !totalPrice || !entryFee || !category_id) {
                setError('Fill All Field')
                setTimeout(() => {
                    setError('')
                }, 2000);
            } else {

                const response = await postAddQuiz(data);
                if (response?.data.status === 'ok') {
                    setTotalPrice('')
                    setEntryFee('')
                    setName('')
                    setCategory_id('')
                    setLive(false)
                    enqueueSnackbar(
                        'Add Successfully',
                        { variant: 'success', autoHideDuration: 2000 },
                    );
                    quizFetch();
                } else {
                    enqueueSnackbar(
                        response?.data.error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
                }
            }
        }
    }

    const handleEdit = (data: any) => {
        setUpdateId(data.id)
        setTotalPrice(data.totalPrice)
        setEntryFee(data.entryFee)
        setName(data.name)
        setCategory_id(data.category_id)
        setLive(data.live)
    }

    const handleClearData = () => {
        setTotalPrice('')
        setEntryFee('')
        setName('')
        setCategory_id('')
        setLive(false)
        setUpdateId('')
    }

    const handleDelect = async (id: number) => {
        const response = await postDeleteQuiz(id);
        if (response?.data.status === 'ok') {
            enqueueSnackbar(
                'Delete Successfully',
                { variant: 'success', autoHideDuration: 2000 },
            );
            quizFetch();
        } else {
            enqueueSnackbar(
                response?.data.error,
                { variant: 'error', autoHideDuration: 2000 },
            );
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
                        Quiz
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper className={classes.setProductpaper} elevation={5}>
                            <TextField type='text' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="Name *" InputLabelProps={{ shrink: false }} value={name} onChange={(e: any) => setName(e.target.value)} />
                            <TextField type='text' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="prize *" InputLabelProps={{ shrink: false }} value={totalPrice} onChange={(e: any) => setTotalPrice(e.target.value)} />
                            <TextField required type='text' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="fee * " InputLabelProps={{ shrink: false }} value={entryFee} onChange={(e: any) => setEntryFee(e.target.value)} />
                            <FormControl size="small" required>
                                <Select
                                    displayEmpty
                                    value={category_id}
                                    onChange={(e: SelectChangeEvent) => setCategory_id(e.target.value)}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <span className={classes.selectplaceholder}>select quiz *</span>;
                                        }
                                        const selectedCategory = categoryList.response.find((c: any) => c.id === selected);
                                        return selectedCategory.name;
                                    }}
                                    className={classes.settextfield}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Placeholder</em>
                                    </MenuItem>
                                    {Object.keys(categoryList).length !== 0 && categoryList.response.map((e: any) => {
                                        return (
                                            <MenuItem key={e.id} value={e.id}>
                                                {e.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControlLabel style={{ width: 'fit-content' }} control={<Checkbox checked={live} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLive(e.target.checked)} />} label="Live" />

                            {error && <span>{error}</span>}
                            {encodeUrl && <img src={encodeUrl} alt='logo' style={{ maxWidth: '340px', maxHeight: "300px" }} />}
                            <div className={classes.setsendbutton}>
                                {updateId ?
                                    <>
                                        <Button variant="contained" size="medium" className={classes.calclebtn} onClick={handleClearData}>
                                            cancle
                                        </Button>
                                        <Button variant="contained" size="medium" className={`ml-5 ${classes.setsendbtninside}`} onClick={handlesenddata}>
                                            Update
                                        </Button>
                                    </>
                                    :
                                    <Button variant="contained" size="medium" className={classes.setsendbtninside} onClick={handlesenddata}>
                                        Add
                                    </Button>
                                }

                            </div>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Paper className={classes.setProductpaper} elevation={5}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableth}>
                                                No.
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                Name
                                            </TableCell>
                                            {/* <TableCell align="center" className={classes.tableth}>
                                                category
                                            </TableCell> */}
                                            <TableCell align="center" className={classes.tableth}>
                                                total price
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                fee
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                live
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(!quizLoading && !quizFetching && Object.keys(quizList).length > 0 && Object.keys(categoryList).length > 0) && quizList.response.map((e: any, index: number) => {
                                            return (
                                                <StyledTableRow>
                                                    <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletd} align="center">
                                                        {e.name}
                                                    </StyledTableCell>
                                                    {/* <StyledTableCell className={classes.tabletd} align="center">
                                                        {categoryList.response.map((data:any) => {
                                                            if(data.id === e.category_id){
                                                                return data.name
                                                        }})}
                                                    </StyledTableCell> */}
                                                    <StyledTableCell className={classes.tabletd} align="center">
                                                        {e.totalPrice}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletd} align="center">
                                                        {e.entryFee}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletd} align="center">
                                                        {e.live}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletdicon} align="center" >
                                                        <div className='flex justify-center'>
                                                            <div>
                                                                <Tooltip title="Edit">
                                                                    <FaEdit className={classes.seteditincon} onClick={() => handleEdit(e)} />
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip title="Remove">
                                                                    <FaTrashAlt className={classes.setdeleteincon} onClick={() => handleDelect(e.id)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Quiz