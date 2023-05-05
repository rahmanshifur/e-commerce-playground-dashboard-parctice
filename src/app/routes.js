
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardCard from '../components/dashboard-card';
import AboutPage from '../pages/about';
import CategoryAdd from "../pages/category/category-add";
// import CategoryList from "./pages/category/category-list"
import Account from '../components/account';
import Layout from '../components/layout';
import useAuth from '../hooks/useAuth';
import PageNotFound from '../pages/404';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';
import VerifyEmailPage from '../pages/auth/verify-email';
import ColorAdd from "../pages/color/color-add";
import ColorUpdate from '../pages/color/color-edit';
import ColorList from '../pages/color/color-list';
import SizeAdd from '../pages/size/size-add';
import SizeList from '../pages/size/size-list';
import SubcategoryAdd from '../pages/subcategories/subcategory-add';
import SubcategoryList from '../pages/subcategories/subcategory-list';
// import CategoryEdit from './pages/category/category-edit';






const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}
const PrivetRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardCard />} />
        <Route path="/about" element={<AboutPage />} />
        {<Route path="/category/add" element={<CategoryAdd />} />
        /* <Route path="/category/list" element={<CategoryList />} />
        <Route path="/category/edit/:id" element={<CategoryEdit />} /> */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/color/add" element={<ColorAdd />} />
        <Route path="/color/list" element={<ColorList />} />
        <Route path="/color/edit/:id" element={<ColorUpdate />} />
        <Route path="/subcategory/list" element={<SubcategoryList />} />
        <Route path="/subcategory/add" element={<SubcategoryAdd />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/size/add' element={<SizeAdd />} />
        <Route path='/size/list' element={<SizeList />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </Layout>
  )
}


function AppRoutes() {

  const { isAuth } = useAuth()


  return isAuth ? <PrivetRoute /> : <PublicRoute />
}

export default AppRoutes;
