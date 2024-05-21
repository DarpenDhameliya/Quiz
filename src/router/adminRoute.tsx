import { Route, Routes } from 'react-router-dom';
import Sidebar from '../admin/component/header/Drawer';
import Category from '../admin/page/category/Category';
import Quiz from '../admin/page/Quiz/Quiz';
import Question from '../admin/page/Question/Question';
import Setting from '../admin/page/setting/Setting';

const AdminRouter = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path='/category' element={<Category />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/question' element={<Question />} />

                {/* <Route path='/question/:id' element={<UpdateQuestion />} />
                <Route path='/question/add' element={<AddQuestion />} /> */}
                <Route path='/setting' element={<Setting />} />
            </Routes>
        </>
    );
};

export default AdminRouter;