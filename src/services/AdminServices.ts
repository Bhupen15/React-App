import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface User {
  sno: number | null,
  fname: string | null,
  lname: string | null,
  email: string | null,
  mobile: string | null,
  role: number | null
}

const getAlluser = async () => {

  return axios.get<User[]>("http://localhost/bhupendra/ApiController");

}


export const userDelete = (sno: string) => {


  if (window.confirm('Do you really want to Delete')) {
    return axios.get<boolean>(`http://localhost/bhupendra/ApiController/delete/${sno}`);
  }
  toast.error('Deletion cancelled');
  return;
}

export { getAlluser };