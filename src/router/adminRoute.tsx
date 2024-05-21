import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const Sidebar = lazy(() => import('../admin/component/header/Drawer'));
const Category = lazy(() => import('../admin/page/category/Category'));
const Quiz = lazy(() => import('../admin/page/Quiz/Quiz'));
const Question = lazy(() => import('../admin/page/Question/Question'));
const UpdateQuestion = lazy(() => import('../admin/page/Question/UpdateQuestion'));
const AddQuestion = lazy(() => import('../admin/page/Question/AddQuestion'));
const Setting = lazy(() => import('../admin/page/setting/Setting'));

const AdminRouter = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path='/category' element={<Category />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/question' element={<Question />} />
                <Route path='/question/:id' element={<UpdateQuestion />} />
                <Route path='/question/add' element={<AddQuestion />} />
                <Route path='/setting' element={<Setting />} />
            </Routes>
        </>
    );
};

export default AdminRouter;