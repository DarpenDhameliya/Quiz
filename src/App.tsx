import React, { Suspense, lazy } from 'react';
import './App.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './context/categoryContext';
import { QuizProvider } from './context/quizContext';
import { WalletProvider } from './context/walletContext';

const Router = lazy(() => import('./router'));
const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Suspense fallback={null}>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <QuizProvider>
                <WalletProvider>
                  <Router />
                </WalletProvider>
              </QuizProvider>
            </AppProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </Suspense>
    </>
  );
}

export default App;
