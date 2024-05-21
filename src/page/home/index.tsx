import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import HomeCard from '../../components/card/homecard'
import WorkSpace from '../../components/container'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import ads from '../../asset/logo/add.jpg'
import useHomeStyles from './HomeStyle'
import Loader from '../../components/loader/Loader'
import { useQuiz } from '../../context/quizContext'
import { useApp } from '../../context/categoryContext'
import { getQuestions } from '../../api'

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

 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!quizLoading && !quizFetching) {
            const userData = localStorage.getItem('token')
            if (!userData) {
                localStorage.setItem('type', 'guest')
            } else {
                localStorage.setItem('type', 'user')
            }
        }
    }, [quizLoading, quizFetching])


    const handleclick = useCallback((name: number) => {
        nevigate(`/show/${name}`)
    }, [nevigate])

    const CardView = useCallback(() => {
        const callfun = async () => {
            const response = await getQuestions('1')
            console.log(response)
        }
        setTimeout(() => {

            callfun()
        }, 3000);
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
                {quizList && quizList.response.map((data: any) => {
                    return <Grid item xs={12} sm={12} md={12} key={data.id}>
                        <HomeCard data={data} handleclick={handleclick} />
                    </Grid>
                })}
            </>)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizList])

    const selectedCategory = useCallback((data: any) => {
        nevigate(`/category/${data.name}`)
    }, [nevigate])

    return (
        <>
            <WorkSpace>
                <Paper className={classes.setProductpape} elevation={5}>
                    <Header />
                    <div className={classes.loginscroll}>
                        <div className='flex justify-center ads-box' style={{ marginBottom: 20 }}>
                            <img src={ads} alt='ad' style={{
                                width: '480px',
                                maxHeight: '320px'
                            }} />
                        </div>
                        {(quizLoading || quizFetching || categoryLoading || categoryFetching || Object.keys(categoryList).length === 0 || Object.keys(quizList).length === 0) ?
                            <Loader />
                            :
                            <Slider {...settings} className="custom-slider" >
                                {categoryList && categoryList.response.map((data: category) => {
                                    return <div key={data.id} className={classes.sliderdiv} onClick={() => selectedCategory(data)}>
                                        <h4 className={classes.slidertext} >{data.name}</h4>
                                    </div>
                                })}
                            </Slider>
                        }
                        {!categoryFetching && !quizFetching && <div className={classes.sliderBorder} />}
                        <Grid container spacing={2} >
                            {(!quizLoading && !quizFetching && !categoryLoading && !categoryFetching && Object.keys(categoryList).length !== 0 && Object.keys(quizList).length !== 0) &&
                                CardView()
                            }
                        </Grid>
                    </div>
                    <Footer />
                </Paper>
            </WorkSpace>
        </>
    )
}

export default Home