
import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import CommonContainer from '../../component/container/Container';
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import useQuizStyles from './QuizStyle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { getCategoryList, postAddCategory, postDeleteCategory, postEditCategory } from '../../../api';
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

const Category = () => {
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
        if (file) {
            setImage(file)
            const displayImg = URL.createObjectURL(file);
            setEncodeUrl(displayImg)
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
                    console.log(response, '-0=-0=0=-0=0')
                    enqueueSnackbar(
                        response?.data.error,
                        { variant: 'error', autoHideDuration: 2000 },
                    );
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
                    console.log(response?.data, '-0=-0=0=-0=0')
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
        }
    }



    return (
        <>
            <CommonContainer heading="Category">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper className={classes.setProductpaper} elevation={5}>
                            <TextField type='text' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="Category Name *" InputLabelProps={{ shrink: false }} value={name} onChange={(e: any) => setName(e.target.value)} />
                            <TextField type='file' id="outlined-basic" size="small" variant="outlined" className={classes.settextfield} placeholder="image * " InputLabelProps={{ shrink: false }} onChange={handleImageChnage} />
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
                            <Grid container spacing={2}>
                                {(!categoryLoading && !categoryFetching && Object.keys(categoryList).length > 0) && categoryList.response.map((e: any, index: number) => {
                                    return <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={e.id}
                                        className={classes.setonegried}
                                    >
                                        <Card
                                            style={{ position: "relative", width: "100%" }}
                                            className={classes.setcardeff}
                                        >
                                            <CardMedia
                                                component="img"
                                                className={classes.setImage}
                                                image={e.image}
                                                alt="Product Image"
                                            />
                                            <CardContent sx={{ padding: "5px 10px" }}>
                                                <div className={classes.setlistdiv}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                        className={classes.settypohead}
                                                    >
                                                        Category :
                                                        <span className={classes.settypo}>{e.name}</span>
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                            <Divider />
                                            <CardActions
                                                className={classes.setbtn}
                                                sx={{ justifyContent: "left" }}
                                            >
                                                <Grid className='flex w-full'>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            endIcon={<FaEdit className='fs-15' />}
                                                            className={classes.seteditbtn}
                                                            onClick={() => handleEdit(e)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Grid>
                                                    <Divider orientation="vertical" flexItem />

                                                    <Grid item xs={12}>
                                                        <Button
                                                            endIcon={<FaTrashAlt className='fs-15' />}
                                                            className={classes.setdelbtn}
                                                            onClick={() => handleDelect(e.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </CommonContainer>

            {/* <CommonContainer heading={'Payment Report'} > */}
            {/* </CommonContainer> */}
            {/* <BackdropComponent open={loder} /> */}
        </>
    )
}

export default Category