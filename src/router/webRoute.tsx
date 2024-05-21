import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const WorkSpace = lazy(() => import('../components/container'));
const SignUp = lazy(() => import('../auth/signup/index'));
const Login = lazy(() => import('../auth/login/index'));
const Home = lazy(() => import('../page/home'));
const Joinexame = lazy(() => import('../page/joinexamepage'));
const Category = lazy(() => import('../page/category'));
const SubCategory = lazy(() => import('../page/category/subCategory'));
const Profile = lazy(() => import('../page/profile'));
const QuizJoin = lazy(() => import('../page/QuizJoin/QuizJoin'));
const ResultIndex = lazy(() => import('../page/result'));
const AdLogin = lazy(() => import('../auth/login/AdLogin'));

const WebRouter = () => {
  return (
    <WorkSpace>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/show/:id' element={<Joinexame />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:id' element={<SubCategory />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/play/:id' element={<QuizJoin />} />
        <Route path='/result' element={<ResultIndex />} />
        <Route path='/ad-login' element={<AdLogin />} />
      </Routes>
    </WorkSpace>
  );
};

export default WebRouter;