import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from './QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { postAddCategory, postDeleteCategory, postEditCategory } from '../../../api';
import { useApp } from '../../../context/categoryContext';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useSnackbar } from 'notistack';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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

const Category = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [encodeUrl, setEncodeUrl] = useState('')
    const [updateId, setUpdateId] = useState('')
    const classes = useQuizStyles()
    const { categoryList, categoryFetch, categoryLoading, categoryFetching } = useApp();
    const [error, setError] = useState('')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        categoryFetch();
    }, [])

    const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const extension = file.name.split('.').pop()?.toLowerCase(); // Get the file extension
            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                setImage(file);
                const displayImg = URL.createObjectURL(file);
                setEncodeUrl(displayImg);
            } else {
                enqueueSnackbar(
                    'Please select a JPEG, JPG, PNG file.',
                    { variant: 'error', autoHideDuration: 3000 },
                );
            }
        }
    }

    const handlesenddata = async () => {
        if (updateId) {
            if (!name) {
                setError('Name Required')
                setTimeout(() => {
                    setError('')
                }, 2000);
            } else {
                const formData = new FormData();
                formData.append('name', name);
                if (image) {
                    formData.append('image', image);
                }
                const response = await postEditCategory(updateId, formData);
                if (response?.data.status === 'ok') {
                    setImage(null)
                    setEncodeUrl('')
                    setName('')
                    setUpdateId('')
                    enqueueSnackbar(
                        'Update Successfully',
                        { variant: 'success', autoHideDuration: 2000 },
                    );
                    categoryFetch();
                } else {
                    enqueueSnackbar(
                        response?.data.error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
                    if (response.status === 401) {
                        navigate('/login')
                    }
                }
            }
        } else {
            if (!name || !image) {
                setError('Fill All Field')
                setTimeout(() => {
                    setError('')
                }, 2000);
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('image', image);
                const response = await postAddCategory(formData);
                if (response?.data.status === 'ok') {
                    setImage(null)
                    setEncodeUrl('')
                    setName('')
                    enqueueSnackbar(
                        'Add Successfully',
                        { variant: 'success', autoHideDuration: 2000 },
                    );
                    categoryFetch();
                } else {
                    enqueueSnackbar(
                        response?.data.error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
                    if (response?.status === 401) {
                        navigate('/login')
                    }

                }
            }
        }
    }

    const handleEdit = (data: any) => {
        setUpdateId(data.id)
        setName(data.name)
        setEncodeUrl(data.image)
    }

    const handleClearData = () => {
        setUpdateId('')
        setName('')
        setImage(null)
        setEncodeUrl('')
    }

    const handleDelect = async (id: number) => {
        const response = await postDeleteCategory(id);
        if (response?.data.status === 'ok') {
            enqueueSnackbar(
                'Delete Successfully',
                { variant: 'success', autoHideDuration: 2000 },
            );
            categoryFetch();
        } else {
            enqueueSnackbar(
                response?.data.error,
                { variant: 'error', autoHideDuration: 2000 },
            );
            if (response.status === 401) {
                navigate('/login')
            }
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
                        Category
                    </Typography>
                   
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper className={classes.setProductpaper} elevation={5}>
                            <TextField type='text' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="Category Name *" InputLabelProps={{ shrink: false }} value={name} onChange={(e: any) => setName(e.target.value)} />
                            <TextField type='file' id="category_id" size="small" variant="outlined" className={classes.settextfield} placeholder="image * " InputLabelProps={{ shrink: false }} onChange={handleImageChnage} />
                            {error && <span>{error}</span>}
                            {encodeUrl && <img src={encodeUrl} alt='logo' style={{ maxWidth: '340px', maxHeight: "300px" }} />}
                            <div className={classes.setsendbutton}>
                                {updateId ?
                                    <>
                                        <Button variant="contained" size="medium" className={classes.calclebtn} onClick={handleClearData}>
                                            cancle
                                        </Button>
                                        <Button variant="contained" sx={{ bgcolor: '#6c757d ' }} size="medium" className={`ml-5 ${classes.setsendbtninside}`} onClick={handlesenddata}>
                                            Update
                                        </Button>
                                    </>
                                    :
                                    <Button variant="contained" size="medium" sx={{ bgcolor: '#6c757d ' }} className={classes.setsendbtninside} onClick={handlesenddata}>
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
                                                                    {/* <i
                                                                        className="fa fa-pencil"
                                                                        aria-hidden="true"
                                                                        // className={classes.seteditincon}
                                                                        // onClick={() => handleedit(e)}
                                                                    /> */}
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip title="Remove">
                                                                    <FaTrashAlt className={classes.setdeleteincon} onClick={() => handleDelect(e.id)} />
                                                                    {/* <i
                                                                        className="fa fa-trash"
                                                                        aria-hidden="true"
                                                                        //  className={classes.setdeleteincon}
                                                                        // onClick={() => handledelete(e._id)}
                                                                    /> */}
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

export default Category