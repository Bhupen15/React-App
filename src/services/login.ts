import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";
import { base_url } from "./AdminServices";

interface response {
  messages: {
    success: string|null,
    message:string|null,
    role:string|null,
    sno:number|null,
    token: string|null
  }
}

const login = async (data:object) =>{

  
  console.log(data)
  return axios.post<response>(base_url()+"login",data);

}

export default login;