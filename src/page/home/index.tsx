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
// import { getCategory, getCategoryList, getQuestion, getQuestionList, getQuiz, getQuizList, postAddCategory, postAddQuestion, postAddQuiz, postDeleteCategory, postDeleteQuestion, postDeleteQuiz, postEditCategory, postEditQuestion, postEditQuiz } from '../../api'
import Loader from '../../components/loader/Loader'
import { useQuiz } from '../../context/quizContext'
import { useApp } from '../../context/categoryContext'
import { cardvalue } from '../../components/type'
interface category {
    id: number;
    name: string;
}



const Home = () => {
    // const [image, setImage] = useState(null);
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
        const playedQuizid = sessionStorage.getItem('quiz')
        if (playedQuizid && !userfind) {
            const parsePlayQuizid = JSON.parse(playedQuizid);

            const playQuiz = quizList && quizList.response.filter((data: any) => !parsePlayQuizid.includes(String(data.id)));
            
            return playQuiz.map((data: cardvalue) => {
                return <Grid item xs={12} sm={12} md={12} key={data.id}>
                    <HomeCard data={data} handleclick={handleclick} />
                </Grid>
            })
        } else {
            return (<>
                {quizList && quizList.response.map((data: cardvalue) => {
                    return <Grid item xs={12} sm={12} md={12} key={data.id}>
                        <HomeCard data={data} handleclick={handleclick} />
                    </Grid>
                })}
            </>)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizList])

    // const handleImageChange = (event: any) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         setImage(file)
    //     }
    // };

    // for category tesing
    // useEffect(() => {
    //     const callApi = async () => {
    //         if (image) {
    //             // add logic
    //             // const formData = new FormData();
    //             // formData.append('name', 'English-Grammar');
    //             // formData.append('image', image);
    //             // const response = await postAddCategory(formData);
    //             // if(response.data.status === 'ok'){
    //             //     setImage(null)
    //             // }

    //             //specific id record Logic
    //             // const response = await getCategory('13');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // edit logic
    //             // const formData = new FormData();
    //             // // formData.append('name', 'Business');
    //             // formData.append('image', image);
    //             // const response = await postEditCategory('13',formData);
    //             // if(response.data.status === 'ok'){
    //             //     setImage(null)
    //             // }

    //             //delete Logic
    //             // const response = await postDeleteCategory('9');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }
    //         }
    //     }
    //     if (image) {
    //         callApi();
    //     }
    // }, [image])

    // for quiz tesing
    // useEffect(() => {
    //     const callApi = async () => {
    //         if (image) {

    //             //list fetch
    //             // const response = await getQuizList();
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // add logic
    //             // const data = {
    //             //     title: 'English-Grammar',
    //             //     totalPrice: '1500',
    //             //     entryFee: '100',
    //             //     category_id: '18',
    //             //     live: true,
    //             // }
    //             // const response = await postAddQuiz(data);
    //             // if (response && response.data.status === 'ok') {
    //             //     setImage(null)
    //             // } else {
    //             //     console.log(response.data.error)
    //             // }

    //             // specific id record Logic
    //             // const response = await getQuiz('2');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // edit logic
    //             // const data = {
    //             //     title: 'Maths',
    //             //     totalPrice: '1000',
    //             //     entryFee: '200',
    //             //     live: true,
    //             // }

    //             // const response = await postEditQuiz('1', data);
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             //delete Logic
    //             // const response = await postDeleteQuiz('1');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }
    //         }
    //     }
    //     if (image) {
    //         callApi();
    //     }
    // }, [image])

    // for question
    // useEffect(() => {
    //     const callApi = async () => {
    //         if (image) {

    //             //list fetch
    //             // const response = await getQuestionList();
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // add logic
    //             // const data = {
    //             //     "question": "Where was Elizabeth born?",
    //             //     "answer": ["England", "Poland", "Italy", "Ireland"],
    //             //     "correct": "Ireland",
    //             //     "quizId": '9',
    //             //     "coins": "100"
    //             // };
    //             // const response = await postAddQuestion(data);
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // specific id record Logic
    //             // const response = await getQuestion('1');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             // edit logic
    //             // const data = {
    //             //     "question": "Who was the first Indian woman in space?",
    //             //     "answer": ["Sunita Williams", "P.T Usha", "Kalpana Chawla", "None"],
    //             //     "correct": "Kalpana Chawla",
    //             //     "quizId": '3',
    //             //     "coins": "150"
    //             // };

    //             // const response = await postEditQuestion('2', data);
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }

    //             //delete Logic
    //             // const response = await postDeleteQuestion('1');
    //             // if (response.data.status === 'ok') {
    //             //     setImage(null)
    //             // }
    //         }
    //     }
    //     if (image) {
    //         callApi();
    //     }
    // }, [image])

    const selectedCategory = useCallback((data: any) => {
        nevigate(`/category/${data.name}`)
    }, [nevigate])

    return (
        <>
            <WorkSpace>
                <Paper className={classes.setProductpape} elevation={5}>
                    <Header />
                    {/* <TextField
                        type="file"
                        onChange={handleImageChange}
                        variant="outlined"
                        inputProps={{
                            accept: 'image/*',
                        }}
                    /> */}
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