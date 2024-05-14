import Paper from '@mui/material/Paper';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeCard from '../../../components/card/homecard';
import WorkSpace from '../../../components/container';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import usecategoryStyles from '../Category';
import Loader from '../../../components/loader/Loader';
import { useQuiz } from '../../../context/quizContext';
import { cardvalue } from '../../../components/type';


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
            {/* {cardList?.map((data:cardvalue) => { */}
            {cardList?.map((data: any) => {
                return <HomeCard data={data} handleclick={handleclick} />
            })}
        </>)

    }, [cardList, nevigate])

    return (
        <WorkSpace>
            <Paper className={classes.setProductpape} elevation={5}>
                <Header />
                <div className={classes.loginscroll}>
                    {quizLoading || quizFetching || Object.keys(quizList).length === 0 ? <Loader /> : CardView()}
                </div>
                <Footer />
            </Paper>
        </WorkSpace>
    )
}

export default SubCategory