import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const WebRouter = lazy(() => import('./webRoute'));
const AdminRouter = lazy(() => import('./adminRoute'));
const Routs = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/*" element={<WebRouter />} />
            </Routes>
        </Suspense>
    )
}

export default Routs