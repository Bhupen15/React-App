import React from 'react'
import { useNavigate } from 'react-router-dom';
import FormHook from '../hooks/FormHook';
import signup from '../services/create';
import { ToastContainer, toast } from 'react-toastify';
import { HtmlHTMLAttributes, useState } from 'react'
import { Link } from 'react-router-dom';
// import "./LoginForm.css";
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const navigate = useNavigate();



    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
    const passregex = /^[A-Za-z0-9!@#$%^&*()_]{6,16}$/i;
    const mobregex = /^[0-9]{10}$/i;
    const [fnameerror, setfnameError] = useState('');
    const [lnameerror, setlnameError] = useState('');
    const [emailerror, setEmailError] = useState('');
    const [passerror, setpassError] = useState('');
    const [moberror, setMobError] = useState('');
    const [cpass, setcpasserror] = useState('');
    const fname = FormHook("");
    const lname = FormHook("");
    const email = FormHook("");
    const mobile = FormHook("");
    const password = FormHook("");
    const [cpassword, setCPassword] = useState("");


    const checkfname = (e: any) => {
        setfnameError(e.target.value);
        if (e.target.value.length < 3) {

            setfnameError("Please Enter Valid Name");
            return false;
        } else {
            setfnameError('');
        }
    }

    const checklname = (e: any) => {
        setlnameError(e.target.value);
        if (e.target.value.length < 3) {

            setlnameError("Please Enter Valid Name");
            return false;
        } else {
            setlnameError('');
        }

    }
    const checkmobile = (e: any) => {
        setMobError(e.target.value);
        console.log(moberror);
        if (mobregex.test(e.target.value) === false) {

            setMobError("Please Enter Valid mobile no");

        }
        else {
            setMobError("");

        }
    }
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


    const checkCpass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCPassword(e.currentTarget.value);
        setcpasserror(e.target.value);
        if (password.value !== e.currentTarget.value) {
            setcpasserror("Please Enter same password");
            return false;
        }
        else {
            setcpasserror("");
            return true;
        }
    }



    const SubmitHandler = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();

        if (fnameerror === "" && lnameerror === "" && emailerror === "" && moberror === "" && passerror === "" && cpass === "") {
            if (fname.value === "" && lname.value === "" && email.value === "" && mobile.value === "" && password.value === "") {
                toast.error("Please fill the values");
            }

            else {
                const data =
                {
                    fname: fname.value,
                    lname: lname.value,
                    email: email.value,
                    mobile: mobile.value,
                    password: password.value,
                };
                const result = await signup(data);
                const success = result.data.messages.success;
                if (success) {
                    toast.success("Data added successfully");
                    navigate('/signin');
                }
                else {
                    toast.error("Account already exist");
                }

            }
        }
        else {

            toast.error("Fill the value");
        }
    }

    return (
        <div className='loan'>
            <div className="container ">
                <div className="row justify-content-md-center" >
                    <div className="col-5">
                        <h2>Register</h2>


                        <form action="" method="post" id="form" onSubmit={SubmitHandler}>
                            <div className="form-group mb-3">
                                <input type="text" name="fname" placeholder="First name" className="form-control" {...fname} onChangeCapture={checkfname} />
                                <p className='text-danger'>  {fnameerror}</p>
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" name="lname" placeholder="Last name" className="form-control" {...lname} onChangeCapture={checklname} />
                                <p className='text-danger'>  {lnameerror}</p>
                            </div>
                            <div className="form-group mb-3">
                                <input type="number" name="mobile" placeholder="Mobile" className="form-control"    {...mobile} onChangeCapture={checkmobile} />
                                <p className='text-danger'>  {moberror}</p>
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" name="email" placeholder="Email" className="form-control" {...email} onChangeCapture={checkemail} />
                                <p className='text-danger'>  {emailerror}</p>
                            </div>
                            <div className="form-group mb-3">
                                <input id="password" type="password" name="password" placeholder="Password" className="form-control" {...password} onChangeCapture={checkPass} />
                                <p className='text-danger'>  {passerror}</p>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" name="confirmpassword" placeholder="Confirm Password" className="form-control" value={cpassword} onChange={checkCpass} />
                                <p className='text-danger'>  {cpass}</p>

                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark">Signup</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>


            <ToastContainer limit={1} />

        </div>



    )
}


export default SignUp