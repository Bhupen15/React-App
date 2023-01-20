import React from 'react'
import login from '../services/login';
import FormHook from '../hooks/FormHook';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HtmlHTMLAttributes, useState } from 'react'
import { Link } from 'react-router-dom';
// import "./LoginForm.css";
import 'react-toastify/dist/ReactToastify.css';


function Signin() {

  const navigate = useNavigate();

  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
  const passregex = /^[A-Za-z0-9!@#$%^&*()_]{6,16}$/i;
  const [emailerror, setEmailError] = useState('');
  const [passerror, setpassError] = useState('');

  const email = FormHook("");
  const password = FormHook("");
  const checkemail = (e: any) => {
    setEmailError(e.target.value);
    if (emailregex.test(e.target.value) === false) {

      setEmailError("Please Enter Valid Email");
      return false;
    }
    else {
      setEmailError("");
      return true;
    }
  }
  const checkPass = (e: any) => {
    setpassError(e.target.value);
    if (passregex.test(e.target.value) === false) {
      setpassError("Please Enter Valid  password");
      return false;
    }
    else {
      setpassError("");
      return true;
    }
  }

  const submitHandler = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (emailerror === "" && passerror === "") {
      if (email.value === "" && password.value === "") {
        toast.error("Please fill the values");
      }

      else {
        const data = {
          email: email.value,
          password: password.value
        }
        let result = await login(data);
        const success = result.data.messages.success;
        if (success) {

          const role = result.data.messages.role;
          const id = result.data.messages.sno;
          console.log(id);
          let session = {
            id: id,
            role: role,
          }
          localStorage.setItem("session", JSON.stringify(session));

          toast.success("login successful");
          if (role ==='1')
            
            navigate('/admin');
          else if (role === '0')
            navigate('/user');

        }
        else {
          const message = result.data.messages.message;
          toast.error(message);
          
        }
      }
    }

  }


  return (
    <div className='loan'>
      <div className="container ">
        <div className="row justify-content-md-center">
          <div className="col-5">

            <h2>Login</h2>


            <form method="post" id="form" onSubmit={submitHandler}>
              <div className="form-group mb-3">
                <input type="email" name="email" placeholder="Email" className="form-control" {...email} onChangeCapture={checkemail} />
                <p className='text-danger'>  {emailerror}</p>
              </div>
              <div className="form-group mb-3">
                <input type="password" name="password" placeholder="Password" className="form-control" {...password} onChangeCapture={checkPass} />
                <p className='text-danger'>  {passerror}</p>
              </div>
              {/* <div className="g-recaptcha mb-2" data-sitekey="6Lfp_dIjAAAAAAobizDB9S0Xl3_XqtWvyy_QV7kF"></div> */}

              <div className="d-grid">
                <button type="submit" className="btn btn-dark">Signin</button>
              </div>
            </form>
          </div>

        </div>
      </div>

<ToastContainer limit={1}/>
      
    </div>
  )
}

export default Signin