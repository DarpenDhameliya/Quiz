import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import usecategoryStyles from './Category';
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import WorkSpace from '../../components/container';
import { useQuery } from 'react-query';
import { getCategoryList, getQuizList } from '../../api';
import { useSnackbar } from 'notistack';
import Loader from '../../components/loader/Loader';
import { useApp } from '../../context/categoryContext';
import { useQuiz } from '../../context/quizContext';
import { cardvalue } from '../../components/type'




const Category = () => {
  const [searchval, setSearchval] = useState('')
  const classes: any = usecategoryStyles();
  const nevigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { categoryList, categoryFetch, categoryLoading, categoryFetching } = useApp();
  const { quizList, quizLoading, quizFetching, quizFetch, quizerror } = useQuiz();

  useEffect(() => {
    if (Object.keys(quizList).length === 0) {
      quizFetch();
    }
    if (Object.keys(categoryList).length === 0) {
      categoryFetch();
    }
  }, [])

  const handleCategoryDetails = useCallback((data: string) => {
    if (quizList) {
      let filtercategory: cardvalue[] | undefined = quizList.response.filter((record: cardvalue) => record.category_id === parseInt(data))
      if (filtercategory && filtercategory.length > 0) {
        nevigate(`/category/${filtercategory[0].name}`)
      } else {
        enqueueSnackbar(
          'Quize Not Found',
          { variant: 'error', autoHideDuration: 2000 },
        );
      }
    }
  }, [quizList])

  const CardView = useCallback(() => {
    if (categoryList && categoryList.response.length > 0) {
      const filteredList = categoryList?.response.filter((record: any) =>
        record.name.toLocaleLowerCase().includes(searchval.toLocaleLowerCase())
      );

      return (<>
        {filteredList?.map((data: any) => {
          return <Grid item xs={12} sm={6} key={data.id}>
            <div className={classes.cardmaindiv} onClick={() => handleCategoryDetails(data.id)}>
              <div className='flex align-center'>
                <div className={classes.cardimgmain}>
                  <img src={data.image} alt='quize logo' className={classes.cardimage} />
                </div>
                <div className={classes.cardmiddle}>
                  <div className='flex justify-between flex-column align-end' >
                    <div className={classes.cardwintext}>
                      {data.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        })}
      </>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList, searchval, quizFetching])

  return (
    <WorkSpace>
      <Paper className={classes.setProductpape} elevation={5}>
        <Header />

        <div className={classes.loginscroll}>
          <TextField id="outlined-basic" size="small" type="text" value={searchval} onChange={(e) => setSearchval(e.target.value)} className='mt-10 w-full' placeholder="Enter Phone Number" variant="outlined" InputProps={{ sx: { borderRadius: 5, mt: 1, border: "1px solid var(--whitebglight-color)", color: 'var(--text-color)' }, startAdornment: (<InputAdornment style={{ color: "var(--whitebglight-color)" }} position="start"><BsSearch /></InputAdornment>) }} />
          <div className={classes.sliderBorder} />
          <Grid container spacing={2} >
            {(categoryLoading || categoryFetching || Object.keys(categoryList).length === 0 || Object.keys(quizList).length === 0) ?
              <Loader />
              :
              CardView()
            }

          </Grid>
        </div>
        <Footer />
      </Paper>
    </WorkSpace>
  )
}

export default Category