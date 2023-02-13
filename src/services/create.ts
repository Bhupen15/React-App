import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";
import { base_url } from "./AdminServices";

interface response {
  messages: {
    success: string
  }
}

const signup = async (data:object) =>{

  return axios.post<response>(base_url()+"create",data);

}

export default signup;