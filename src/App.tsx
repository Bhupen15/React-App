import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/bootstrap.min.css';
import Admin from './components/Admin';
import Signin from './components/Signin';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import {User} from './components/User';
import AuthRoute from './components/AuthRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Apply } from './components/Apply';

function App() {
  return (
    <>
    {/* Routes */}
    <BrowserRouter>
    <Header/>
    <Routes> 
    <Route path="/" element={<Home/>}/>
    <Route path="signin" element={<Signin/>}/>
    <Route path="signup" element={<SignUp/>}/> 
    <Route path="/home" element={<Home/>}/> 
    <Route path="/apply" element={<Apply/>}/> 

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
