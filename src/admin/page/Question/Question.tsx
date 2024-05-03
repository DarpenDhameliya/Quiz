import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from '../category/QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { getCategoryList, postAddCategory, postAddQuestionexcel, postDeleteCategory, postEditCategory } from '../../../api';
import { useQuery } from 'react-query';
import { useApp } from '../../../context/categoryContext';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useSnackbar } from 'notistack';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

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

const Question = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [encodeUrl, setEncodeUrl] = useState('')
    const [updateId, setUpdateId] = useState('')
    const classes = useQuizStyles()
    const { categoryList, categoryFetch, categoryLoading, categoryFetching } = useApp();
    const [error, setError] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        categoryFetch();
    }, [])

    const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)
        if(file){
            setImage(file)
        }
    }

    const handlesenddata = async () => {

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        const response = await postAddQuestionexcel(formData);

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
                        Category
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Paper className={classes.setProductpaper} elevation={5}>
                            <div className='flex'>

                                <TextField type='file' id="category_id" size="small" variant="outlined" className={`m-0 w-full`} placeholder="image * " InputLabelProps={{ shrink: false }} onChange={handleImageChnage} />
                                {error && <span>{error}</span>}
                                <div className={`ml-5`}>

                                    <Button variant="contained" size="medium" className={`m-0 ${classes.setsendbtninside}`} onClick={handlesenddata}>
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Paper>

                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.setProductpaper} elevation={5}>
                            {/* <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableth}>
                                                No.
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                Name
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                image
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableth}>
                                                action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(!categoryLoading && !categoryFetching && Object.keys(categoryList).length > 0) && categoryList.response.map((e: any, index: number) => {
                                            return (
                                                <StyledTableRow>
                                                    <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletd} align="center">
                                                        {e.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell className={classes.tabletd} style={{ display: "flex", justifyContent: 'center' }}>
                                                        <img src={e.image} alt='logo' style={{ width: '100px', maxHeight: "100px" }} />
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
                            </TableContainer> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Question