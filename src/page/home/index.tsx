import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ads from '../../asset/logo/add.jpg'
import useHomeStyles from './HomeStyle'
import Loader from '../../components/loader/Loader'
import { useQuiz } from '../../context/quizContext'
import { useApp } from '../../context/categoryContext'

const HomeCard = lazy(() => import('../../components/card/homecard'));
const Footer = lazy(() => import('../../components/footer/Footer'));
const Header = lazy(() => import('../../components/header/Header'));
interface category {
    id: number;
    name: string;
}

const Home = () => {
    const { categoryList, categoryFetch, categoryLoading, categoryFetching } = useApp();
    const { quizList, quizLoading, quizFetching, quizFetch } = useQuiz();
    const nevigate = useNavigate()
    const userfind = localStorage.getItem('token')

    const classes: any = useHomeStyles();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1400, // Adjust this breakpoint based on your requirements
                settings: {
                    slidesToShow: 2, // Show 3 slides on smaller screens
                    slidesToScroll: 1,
                    initialSlide: 0,
                    autoplay: true,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    arrows: true,
                    autoplay: false,
                },
            },
        ],
    };
    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
        if (Object.keys(categoryList).length === 0) {
            categoryFetch();
        }
    }, [])

    useEffect(() => {
        if (quizList && categoryList) {
            const userData = localStorage.getItem('token')
            if (!userData) {
                localStorage.setItem('type', 'guest')
            } else {
                localStorage.setItem('type', 'user')
            }
        }
    }, [quizList, categoryList])

    const handleclick = (name: number) => {
        nevigate(`/show/${name}`)
    }

    const CardView = useCallback(() => {
        const playedQuizid = sessionStorage.getItem('quiz')
        const playedDate = sessionStorage.getItem('date')
        if (playedQuizid && !userfind) {
            const parsePlayQuizid = JSON.parse(playedQuizid);
            const playQuiz = quizList && quizList.response.filter((data: any) => {
                if ((playedDate && parseInt(playedDate)) === new Date().getDate()) {
                    return data.live !== 0 && !parsePlayQuizid.includes(String(data.id));
                } else {
                    sessionStorage.removeItem('date')
                    sessionStorage.removeItem('quiz')
                    return data.live !== 0
                }
            });

            return playQuiz.map((data: any) => {
                return <Grid item xs={12} sm={12} md={12} key={data.id}>
                    <HomeCard data={data} handleclick={handleclick} />
                </Grid>
            })
        } else {
            return (<>
                {Object.keys(quizList).length > 0 && quizList.response.map((data: any) => {
                    return <Grid item xs={12} sm={12} md={12} key={data.id}>
                        <HomeCard data={data} handleclick={handleclick} />
                    </Grid>
                })}
            </>)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizList])

    const callfun = (data: any) => {
        nevigate(`/category/${data.name}`)
    }
    return (
        <>
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    <div className='d-flex justify-center ads-box' style={{ marginBottom: 20 }}>
                        <img src={ads} alt='ad' style={{
                            width: '480px',
                            maxHeight: '320px'
                        }} />
                    </div>
                    {(quizLoading || quizFetching || categoryLoading || categoryFetching || Object.keys(categoryList).length === 0 || Object.keys(quizList).length === 0) ?
                        <Loader />
                        :
                        <Slider {...settings} className="custom-slider" >
                            {Object.keys(categoryList).length > 0 && categoryList.response.map((data: category) => {
                                return <div key={data.id} className={classes.sliderdiv} onClick={() => callfun(data)}>
                                    <h4 className={classes.slidertext} >{data.name}</h4>
                                </div>
                            })}
                        </Slider>
                    }

                    <div className={classes.sliderBorder} />
                    <Grid container spacing={2}>
                        {(!quizLoading && !quizFetching && !categoryLoading && !categoryFetching && Object.keys(categoryList).length !== 0 || Object.keys(quizList).length !== 0) &&
                            CardView()
                        }
                    </Grid>
                </div>
                <Footer />
            </Paper>
        </>
    )
}

export default Home