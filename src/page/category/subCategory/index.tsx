import Paper from '@mui/material/Paper';
import React, { useCallback, useEffect, useState, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usecategoryStyles from '../Category';
import Loader from '../../../components/loader/Loader';
import { useQuiz } from '../../../context/quizContext';

const HomeCard = lazy(() => import('../../../components/card/homecard'));
const Footer = lazy(() => import('../../../components/footer/Footer'));
const Header = lazy(() => import('../../../components/header/Header'));
interface cardvalue {
    id: number;
    name: string;
    totalPrice: string;
    entryFee: string;
    image: string;
    live: number;
}

const SubCategory = () => {
    const [cardList, setCardList] = useState<cardvalue[] | null>(null)
    const classes: any = usecategoryStyles();
    const nevigate = useNavigate();
    const categorydata = useParams();
    const { quizList, quizLoading, quizFetching, quizFetch } = useQuiz();

    useEffect(() => {
        if (Object.keys(quizList).length === 0) {
            quizFetch();
        }
    }, [])

    useEffect(() => {
        if (Object.keys(quizList).length !== 0) {
            let finddata = quizList.response.filter((data: cardvalue) => { return data.name === categorydata.id && data.live !== 0 })
            setCardList(finddata)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizList])

    const CardView = useCallback(() => {
        const handleclick = (data: number) => {
            nevigate(`/show/${data}`)
        }

        return (<>
            {cardList?.map((data) => {
                return <HomeCard data={data} handleclick={handleclick} />
            })}
        </>)

    }, [cardList, nevigate])
    return (
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    {quizLoading || quizFetching || Object.keys(quizList).length === 0 ? <Loader /> : CardView()}
                </div>
                <Footer />
            </Paper>
    )
}

export default SubCategory