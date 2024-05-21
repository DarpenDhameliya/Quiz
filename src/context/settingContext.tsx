/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCategoryList, getWebDetail } from '../api/index';
import { useNavigate } from 'react-router-dom';

type WebContextType = {
    webDetailList: any;
    webDetailLoading: boolean;
    webDetailFetching: boolean;
    webDetailFetch: () => void;
    webDetailerror?: any;
};

// Create a context with initial default values
export const webDetailContext = createContext<WebContextType>({
    webDetailList: {},
    webDetailerror: {},
    webDetailFetching: false,
    webDetailLoading: false,
    webDetailFetch: () => {},
});

export const SettingProvider = ({ children }: { children: React.ReactNode }) => {
    const [webDetailList, setWebDetailList] = useState({})
    const nevigate = useNavigate();
    const { data: webDetail, isLoading: webDetailLoading, isFetching: webDetailFetching, refetch: webDetailFetch, error: webDetailerror } = useQuery(
        'get-web-list',
        async () => await getWebDetail(),
        { enabled: false }
    );

    useEffect
        (() => {
            if (webDetail) {
                setWebDetailList(webDetail.data)
                if (webDetail.status === 401) {
                    nevigate('/login')
                }
            }
        }, [webDetail])

    return (
        <webDetailContext.Provider value={{ webDetailList, webDetailLoading, webDetailFetching, webDetailFetch, webDetailerror }}>
            {children}
        </webDetailContext.Provider>
    );
};
export const useWebDetail = () => {
    const categoryContext = useContext(webDetailContext) as WebContextType;
    if (!categoryContext) throw new Error('Error in AppProvider');
    return categoryContext;
};
