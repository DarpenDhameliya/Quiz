// import { Route, Routes } from 'react-router-dom';
// import Home from '../page/home';
// import Category from '../page/category';
// import Login from '../auth/login/index';
// import SignUp from '../auth/signup/index';
// import Joinexame from '../page/joinexamepage';
// import Profile from '../page/profile';
// import QuizJoin from '../page/QuizJoin/QuizJoin';
// import SubCategory from '../page/category/subCategory';
// import ResultIndex from '../page/result';

// const WebRouter = () => {
//     return (
//         <Routes>
//             <Route index element={<SignUp />} />
//             <Route path='login' element={<Login />} />
//             <Route path='home' element={<Home />} />
//             <Route path='show/:id' element={<Joinexame />} />
//             <Route path='category' element={<Category />} />
//             <Route path='category/:id' element={<SubCategory />} />
//             <Route path='profile' element={<Profile />} />
//             <Route path='play/:id' element={<QuizJoin />} />
//             <Route path='result' element={<ResultIndex />} />
//         </Routes>
//     )
// }

// export default WebRouter

import { Route, Routes } from 'react-router-dom';
import Home from '../page/home';
import Category from '../page/category';
import Login from '../auth/login/index';
import SignUp from '../auth/signup/index';
import Joinexame from '../page/joinexamepage';
import Profile from '../page/profile';
import QuizJoin from '../page/QuizJoin/QuizJoin';
import SubCategory from '../page/category/subCategory';
import ResultIndex from '../page/result';
import AdLogin from '../auth/login/AdLogin';

const WebRouter = () => {
  return (
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
  );
};

export default WebRouter;