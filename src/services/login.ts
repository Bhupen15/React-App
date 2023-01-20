import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";


interface response {
  messages: {
    success: string|null,
    message:string|null,
    role:string|null,
    sno:number|null
  }
}

const login = async (data:object) =>{

  
  console.log(data)
  return axios.post<response>("http://localhost/bhupendra/ApiController/login",data);

}

export default login;