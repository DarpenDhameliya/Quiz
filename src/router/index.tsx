import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebRouter from './webRoute';
import AdminRouter from './adminRoute';

const Routs = () => {
    return (
            <Routes>
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/*" element={<WebRouter />} />
            </Routes>
    )
}

export default Routs