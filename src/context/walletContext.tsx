/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUserWallet } from '../api/index';
import { useNavigate } from 'react-router-dom';

type WallerContextType = {
    walletList: any;
    walletLoading: boolean;
    walletFetching: boolean;
    walletFetch: () => void;
    walleterror?: any;
};

// Create a context with initial default values
export const WalletContext = createContext<WallerContextType>({
    walletList: {},
    walleterror: {},
    walletLoading: false,
    walletFetching: false,
    walletFetch: () => { },
});

// Create a provider for the context
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [walletList, setWalletList] = useState({})
    const nevigate = useNavigate();
    const { data: wallet, isLoading: walletLoading, isFetching: walletFetching, refetch: walletFetch, error: walleterror } = useQuery(
        'get-user-balance',
        async () => await getUserWallet(),
        { enabled: false }
    );

    useEffect
        (() => {
            if (wallet) {
                setWalletList(wallet)
                if(wallet.status === 401){
                    nevigate('/login')
                }
            }
        }, [wallet])

    return (
        <WalletContext.Provider value={{ walletList, walletLoading, walletFetching, walletFetch, walleterror }}>
            {children}
        </WalletContext.Provider>
    );
};
export const useWallet = () => {
    const walletContext = useContext(WalletContext) as WallerContextType;
    if (!walletContext) throw new Error('Error in AppProvider');
    return walletContext;
};
