/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCategoryList } from '../api/index';

type AppContextType = {
    categoryList: any;
    categoryLoading: boolean;
    categoryFetching: boolean;
    categoryFetch: () => void;
    categoryerror?: any;
};

// Create a context with initial default values
export const AppContext = createContext<AppContextType>({
    categoryList: {},
    categoryerror: {},
    categoryLoading: false,
    categoryFetching: false,
    categoryFetch: () => { },
});

// Create a provider for the context
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [categoryList, setCategoryList] = useState({})

    const { data: category, isLoading: categoryLoading, isFetching: categoryFetching, refetch: categoryFetch, error: categoryerror } = useQuery(
        'get-category-list',
        async () => await getCategoryList(),
        { enabled: false }
    );

    useEffect
        (() => {
            if (category) {
                setCategoryList(category.data)
            }
        }, [category])

    return (
        <AppContext.Provider value={{ categoryList, categoryLoading, categoryFetching, categoryFetch, categoryerror }}>
            {children}
        </AppContext.Provider>
    );
};
export const useApp = () => {
    const categoryContext = useContext(AppContext) as AppContextType;
    if (!categoryContext) throw new Error('Error in AppProvider');
    return categoryContext;
};
