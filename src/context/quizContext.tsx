/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getQuizList } from '../api/index';

type quizContextType = {
    quizList: any;
    quizLoading: boolean;
    quizFetching: boolean;
    quizFetch: () => void;
    quizerror?: any;
};

// Create a context with initial default values
export const AppContext = createContext<quizContextType>({
    quizList: {},
    quizerror: {},
    quizLoading: false,
    quizFetching: false,
    quizFetch: () => { },
});

// Create a provider for the context
export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
    const [quizList, setQuizList] = useState({})

    const { data: quiz, isLoading: quizLoading, isFetching: quizFetching, refetch: quizFetch, error: quizerror } = useQuery(
        'get-quiz-list',
        async () => await getQuizList(),
        { enabled: false }
    );
    useEffect
        (() => {
            if (quiz) {
                setQuizList(quiz.data)
            }
        }, [quiz])

    return (
        <AppContext.Provider value={{ quizList, quizLoading, quizFetching, quizFetch, quizerror }}>
            {children}
        </AppContext.Provider>
    );
};
export const useQuiz = () => {
    const quizContext = useContext(AppContext) as quizContextType;
    if (!quizContext) throw new Error('Error in AppProvider');
    return quizContext;
};
