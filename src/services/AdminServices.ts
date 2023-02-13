import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface User {
  sno: number | null,
  fname: string | null,
  lname: string | null,
  email: string | null,
  mobile: string | null,
  role: number | null
}


const getToken = () => {
  let token = localStorage.getItem("token") as string;
  token = JSON.parse(token);
  return token;
}
export const base_url = () => {

  return ("http://localhost/bhupendra/ApiController/");
}
//It will provide list of all the users
const getAlluser = async (page=1) => {
  
  return axios.get(base_url()+`index?page=${page}`,{
    headers:{
      Authentication: getToken(),
    },
  });

}

//It will delete particular user from the list of all the users
export const userDelete = (sno: string) => {


  if (window.confirm('Do you really want to Delete')) {
    return axios.get<boolean>(base_url()+`delete/${sno}`);
  }
  toast.error('Deletion cancelled');
  return;
}

export interface response {
  status: string,
  error: string | null,
  messages: {
    success: boolean,
    message: string
  }
}

//update data service
export const update = (data: object, sno: string) => {


  return axios.put<response>(base_url()+`update/${sno}`, data);
}

//loan apply service
export const loanApply = async (data: object) => {
  return axios.post<response>(base_url()+"applyloan", data);
}

//It will print data using id of particular user
export const loanDataById = async (sno: string) => {
  return axios.get(base_url()+`loanDataById/${sno}`);
}

//It is used to update remark of user form admin page
export const updateRemark = async (data: object) => {


  return axios.post<response>(base_url()+'editRemark', data);
}

//It is used to update status of user form admin page
export const updateStatus = async (data: object) => {

  return axios.post<response>(base_url()+'editStatus', data);
}

//It is used to provide the deatail of user  by sno 
export const dataBysno = async (sno: string) => {
  return axios.get(base_url()+`userdetail/${sno}`);
}


export const imageUpload = async (image:object,sno: string) => {
  console.log(image);
  return axios.post(base_url()+`imageUpload/${sno}`,image);
}





//This functin used in filteration
export const filter = async (data: any) => {
  let keys = Object.keys(data);
  let values = Object.values(data);
  let query = ""
  for (let i in values) {
      if (values[i] !== "")
          query += keys[i] + "=" + values[i] + "&";
  }
  query = query.substring(0, query.length - 1);

  return axios.get(base_url()+"filters?" + query);

}

export { getAlluser };