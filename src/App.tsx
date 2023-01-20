import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/bootstrap.min.css';
// import Sidebar from './components/Sidebar';
import Admin from './components/Admin';
import Signin from './components/Signin';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import User from './components/User';
import AuthRoute from './components/AuthRoute';
// import Userlist from './components/Userlist';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes> 
    <Route path="/" element={<Home/>}/>
    <Route path="signin" element={<Signin/>}/>
    <Route path="signup" element={<SignUp/>}/> 
    <Route path="/home" element={<Home/>}/> 
    {/* <Route path="/userlist" element={<Userlist/>}/>  */}

    <Route path="/admin" element={<AuthRoute allowedRole='1'><Admin /></AuthRoute>} /> 
    
    <Route path="/user" element={<AuthRoute children={<User/>} allowedRole='0'/>} /> 
    

 
    </Routes>
    <Footer/>
    </BrowserRouter>
    <ToastContainer limit={1}/>
    </>
  );
}

export default App;
