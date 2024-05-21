
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import WorkSpace from '../components/container';
const WebRouter = lazy(() => import('./webRoute'));
const AdminRouter = lazy(() => import('./adminRoute'));

const Routs = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/admin/*" element={<AdminRouter />} />
                {/* <WorkSpace> */}
                    <Route path="/*" element={<WebRouter />} />
                {/* </WorkSpace> */}
            </Routes>
        </Suspense>
    )
}

export default Routs