import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { dataBysno } from '../services/AdminServices';
import { loanApply } from '../services/AdminServices';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../style/Loan.css';

//Apply function
export const Apply = () => {
   
      const [Error, setError] = useState({ 
        pan: "", 
        aadhar: "", 
        income: "", 
        loanamount: "", 
        duration: "", 
        address1: "", 
        address2: "", 
        pincode: "", 
        place: "", 
        state: "", 
        country: "" 
    });

    const panRegex = /^[A-Z0-9]{10}$/;  // Proper Regex for pancard is "/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/" include 5-Alphabet,4-digit,1-Alphabet
    const aadharRegex = /^[1-9]{1}[0-9]{11}$/; //replacement regex is "/^\d{12}$/"
    const incomeRegex = /^[1-9]{1}[0-9]{4,8}$/;
    const loanRegex = /^[1-9]{1}[0-9]{3,8}$/;
    const durationRegex = /^[1-9]{1}[0-9]{0,3}$/;
    const addressRegex = /^[A-Za-z0-9\s,.'-]+$/;
    const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;
    const placeRegex = /^[A-Za-z]{3,30}$/;
    const stateRegex = /^[a-zA-Z.' ']{3,30}$/;
    const countryRegex = /^(Russia|Canada|China|United States|Brazil|Australia|India|Argentina|Kazakhstan|Algeria)$/i;

   
    const checkPan = (e: any) => {
        if (panRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "pan": "Please Enter Valid Pan Number i.e ABCDE1234F" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "pan": "" } })
            return true;
        }
    }
    const checkAadhar = (e: any) => {
        if (aadharRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "aadhar": "Please enter valid Aadhar Number" } })
            return false;
                }
        else {
            setError((prevState) => { return { ...prevState, "aadhar": "" } })
            return true;
        }
    }
    const checkIncome = (e: any) => {
        if (incomeRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "income": "Please enter valid Income" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "income": "" } })
            return true;
        }
    }
    const checkLoanamount= (e: any) => {
        if (loanRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "loanamount": "Please enter valid Loan amount" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "loanamount": "" } })
            return true;
        }
    }
    const checkDuration = (e: any) => {
        if (durationRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "duration": "Please enter valid Duration" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "duration": "" } })
            return true;
        }
    }
    const checkAddress1 = (e: any) => {
        if (addressRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "address1": "Please enter valid Address" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "address1": "" } })
            return true;
        }
    }
    const checkAddress2 = (e: any) => {
        if (addressRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "address2": "Please enter valid Address" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "address2": "" } })
            return true;
        }
    }
    const checkPincode = (e: any) => {
        if (pincodeRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "pincode": "Please enter valid Pincode" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "pincode": "" } })
            return true;
        }
    }
    const checkPlace = (e: any) => {
        if (placeRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "place": "Please enter valid Place" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "place": "" } })
            return true;
        }
    }
    const checkState = (e: any) => {
        if (stateRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "state": "Please enter valid State" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "state": "" } })
            return true;
        }
    }
    const checkCountry = (e: any) => {
        if (countryRegex.test(e.currentTarget.value) === false) {
            setError((prevState) => { return { ...prevState, "country": "Please enter valid Country" } })
            return false;
        }
        else {
            setError((prevState) => { return { ...prevState, "country": "" } })
            return true;
        }
    }
    interface User {
        fname: string,
        lname: string,
        email: string,
        mobile: string
    }

    let localdata = localStorage.getItem("session") as string;
    let sno = JSON.parse(localdata).id;
    const [preData, setPreData] = useState<User>({
        fname: "",
        lname: "",
        email: "",
        mobile: ""
    })

    useEffect(() => {

        dataBysno(sno).then((res) => {
            setPreData({
                fname: res.data[0].fname,
                lname: res.data[0].lname,
                email: res.data[0].email,
                mobile: res.data[0].mobile
            })
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    console.log(preData.fname);
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        let formData = {
            "fname": preData.fname,
            "lname": preData.lname,
            "email": preData.email,
            "gender": data.get('gender'),
            "aadhar": data.get('aadhar'),
            "pan": data.get('pan'),
            "profession": data.get('profession'),
            "income": data.get('income'),
            "loanamount": data.get('loanamount'),
            "duration": data.get('duration'),
            "address1": data.get('address1'),
            "address2": data.get('address2'),
            "pincode": data.get('pincode'),
            "place": data.get('place'),
            "country": data.get('country'),
            "mobile": preData.mobile,
            "sno": sno,
        };
        // ritik is changing this file for now 
        let check:boolean = false;
        
        let values = Object.values(formData);

        for (let value of values){

             if (value === ""){
                // toast.error("Please fill value");
                check = true;
             }
        }

        if (check){
            toast.error("please fill values");
        }
        else{
     
        let result = loanApply(formData);
        let r = (await result).data.messages.success;
        console.log(r);
        let message = (await result).data.messages.message;
        console.log(message);
        if (r) {
            toast.success('Successfully applied for loan');
            navigate('/user');
        }
        else {
            toast.error('Error occurred');
        }
    }
}
    return (
        <>
        {/* Apply form */}
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div className="apply_loan">
                        <section className="h-100 h-custom gradient-custom-2">
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12">
                                        <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                            <div className="card-body p-0">
                                                <div className="row g-0">
                                                    <div className="col-lg">
                                                        <div className="p-5">
                                                            <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>General Infomation</h3>
                                                            <div className="row">
                                                                <div className="col-md-6 mb-4 pb-2">

                                                                    <div className="form-outline">
                                                                        <label className="form-label" htmlFor="form3Examplev2">First
                                                                            name</label>
                                                                        <input type="text" id="form3Examplev2" name="fname" disabled defaultValue={preData.fname}
                                                                            className="form-control form-control-lg" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mb-4 pb-2">

                                                                    <div className="form-outline">
                                                                        <label className="form-label" htmlFor="form3Examplev3">Last name</label>
                                                                        <input type="text" id="form3Examplev3" name="lname" disabled defaultValue={preData.lname}
                                                                            className="form-control form-control-lg" />
                                                                    </div>

                                                                </div>
                                                            </div>



                                                            <div className="mb-4 pb-2">
                                                                <div className="form-outline">
                                                                    <label className="form-label" htmlFor="form3Examplev4">Email Address</label>
                                                                    <input type="email" id="form3Examplev4" name="email" disabled defaultValue={preData.email}
                                                                        className="form-control form-control-lg" />
                                                                </div>
                                                            </div>

                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    <div className="mb-4 pb-2">
                                                                        <label className="form-label" htmlFor="form3Examplev5">Gender : </label>
                                                                        <select name="gender" className="select form-control form-control-lg">
                                                                            <option value="">--Choose--</option>
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                                                    <div className="mb-4 pb-2">
                                                                        <div className="form-outline">
                                                                            <label className="form-label" htmlFor="form3Examplev5">Aadhar
                                                                                Number</label>
                                                                            <input type="number" name="aadhar" id="form3Examplev5"
                                                                                className="form-control form-control-lg" onChangeCapture={checkAadhar}/>
                                                                        <p className='text-danger'>{Error.aadhar}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                                                    <div className="mb-4 pb-2">
                                                                        <div className="form-outline">
                                                                            <label className="form-label" htmlFor="form3Examplev5">Pan
                                                                                Number</label>
                                                                            <input type="text" id="form3Examplev5" name="pan"
                                                                                className="form-control form-control-lg" onChangeCapture={checkPan}/>
                                                                                 <p className='text-danger'>{Error.pan}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>Loan Details</h3>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-4 pb-2">
                                                                        <label className="form-label" htmlFor="form3Examplev5">Profession</label>
                                                                        <select name="profession" className="select form-control form-control-lg">
                                                                            <option value="">--Choose--</option>
                                                                            <option value="Salaried">Salaried</option>
                                                                            <option value="Self Employed">Self Employed</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                                                    <div className="mb-4 pb-2">
                                                                        <div className="form-outline">
                                                                            <label className="form-label" htmlFor="form3Examplev5">Annual Income</label>
                                                                            <input type="number" name="income" id="form3Examplev5"
                                                                                className="form-control form-control-lg" onChangeCapture={checkIncome} />
                                                                                  <p className='text-danger'>{Error.income}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                                                    <div className="mb-4 pb-2">
                                                                        <div className="form-outline">
                                                                            <label className="form-label" htmlFor="form3Examplev5">Loan Amount</label>
                                                                            <input type="number" name="loanamount" id="form3Examplev5"
                                                                                className="form-control form-control-lg" onChangeCapture={checkLoanamount}/>
                                                                                  <p className='text-danger'>{Error.loanamount}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                                                    <div className="mb-4 pb-2">
                                                                        <div className="form-outline">
                                                                            <label className="form-label" htmlFor="form3Examplev5">Duration (In month)</label>
                                                                            <input type="number" name="duration" id="form3Examplev5"
                                                                                className="form-control form-control-lg" onChangeCapture={checkDuration} />
                                                                                  <p className='text-danger'>{Error.duration}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg bg-black text-white">
                                                        <div className="p-5">
                                                            <h3 className="fw-normal mb-5">Contact Details</h3>

                                                            <div className="mb-4 pb-2">
                                                                <div className="form-outline form-white">
                                                                    <input type="text" name="address1" id="form3Examplea2"
                                                                        className="form-control form-control-lg" onChangeCapture={checkAddress1}/>
                                                                    <label className="form-label" htmlFor="form3Examplea2">Flat No/House No + Street</label>
                                                                    <p className='text-danger'>{Error.address1}</p>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 pb-2">
                                                                <div className="form-outline form-white">
                                                                    <input type="text" name="address2" id="form3Examplea3"
                                                                        className="form-control form-control-lg" onChangeCapture={checkAddress2}/>
                                                                    <label className="form-label" htmlFor="form3Examplea3">Locality/Area </label>
                                                                    <p className='text-danger'>{Error.address2}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-5 mb-4 pb-2">

                                                                    <div className="form-outline form-white">
                                                                        <input type="number" name="pincode" id="form3Examplea4"
                                                                            className="form-control form-control-lg" onChangeCapture={checkPincode}/>
                                                                        <label className="form-label" htmlFor="form3Examplea4">Zip Code</label>
                                                                        <p className='text-danger'>{Error.pincode}</p>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-7 mb-4 pb-2">

                                                                    <div className="form-outline form-white">
                                                                        <input type="text" name="place" id="form3Examplea5"
                                                                            className="form-control form-control-lg" onChangeCapture={checkPlace}/>
                                                                        <label className="form-label" htmlFor="form3Examplea5">Place</label>
                                                                        <p className='text-danger'>{Error.place}</p>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                          
                                                            <div className="mb-4 pb-2">
                                                                <div className="form-outline form-white">
                                                                    <input type="text" name="state" id="form3Examplea6"
                                                                        className="form-control form-control-lg" onChangeCapture={checkState}/>
                                                                    <label className="form-label" htmlFor="form3Examplea6">State</label>
                                                                    <p className='text-danger'>{Error.state}</p>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 pb-2">
                                                                <div className="form-outline form-white">
                                                                    <input type="text" name="country" id="form3Examplea6"
                                                                        className="form-control form-control-lg" onChangeCapture={checkCountry}/>
                                                                    <label className="form-label" htmlFor="form3Examplea6">Country</label>
                                                                    <p className='text-danger'>{Error.country}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-5 mb-4 pb-2">

                                                                    <div className="form-outline form-white">
                                                                        <input type="text" id="form3Examplea7" disabled
                                                                            defaultValue={"+91"} className="form-control form-control-lg" />
                                                                        <label className="form-label" htmlFor="form3Examplea7">Country Code </label>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-7 mb-4 pb-2">

                                                                    <div className="form-outline form-white">
                                                                        <input type="number" id="form3Examplea8" name="mobile" disabled defaultValue={preData.mobile}
                                                                            className="form-control form-control-lg" />
                                                                        <label className="form-label" htmlFor="form3Examplea8">Phone
                                                                            Number</label>
                                                                    </div>

                                                                </div>
                                                            </div>


                                                            <div className="form-check d-flex justify-content-start mb-4 pb-3">
                                                                <input className="form-check-input me-3" type="checkbox" value=""
                                                                    id="form2Example3c" required />
                                                                <label className="form-check-label text-white" htmlFor="form2Example3">
                                                                    I do accept the <a href="#!" className="text-white"><u>Terms and
                                                                        Conditions</u></a> of your
                                                                    site.
                                                                </label>
                                                            </div>

                                                            <button type="submit" className="btn btn-info btn-lg"
                                                                data-mdb-ripple-color="dark">Register</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}