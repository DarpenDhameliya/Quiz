// import { Route, Routes } from 'react-router-dom';
// import Home from '../page/home';
// import Category from '../page/category';
// import Login from '../auth/login/index';
// import SignUp from '../page/View1';
// import Joinexame from '../page/joinexamepage';
// import Profile from '../page/profile';
// import QuizJoin from '../page/QuizJoin/QuizJoin';
// import SubCategory from '../page/category/subCategory';
// import ResultIndex from '../page/result';

// const AdminRouter = () => {
//     return (
//         <Routes>
//             <Route index element={<SignUp />} />
//         </Routes>
//     )
// }

// export default AdminRouter
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../admin/component/header/Drawer';
import Category from '../admin/page/category/Category';
import Quiz from '../admin/page/Quiz/Quiz';

const AdminRouter = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path='/category' element={<Category />} />
                <Route path='/quiz' element={<Quiz />} />
            </Routes>
        </>
    );
};

export default AdminRouter;