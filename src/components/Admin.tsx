// import React from 'react'

import React, { useEffect, useState } from 'react'
import { getAlluser, update, userDelete, loanDataById, updateRemark, updateStatus, filter } from '../services/AdminServices';
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import FormHook from '../hooks/FormHook';

//Admin function
function Admin() {
    const [loanModel, setLoanModel] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [totalPages, setTotalpages] = useState(5);
    const [page, setPage] = useState(1);
    const [loanValues, setLoanValues] = useState({

        loanid: "",
        fname: "",
        lname: "",
        email: "",
        gender: "",
        aadhar: "",
        pan: "",
        profession: "",
        income: "",
        loanamount: "",
        duration: "",
        address1: "",
        address2: "",
        pincode: "",
        place: "",
        country: "",
        mobile: "",
        status: "",
        remark: "",
        sno: "",
    })
    const semail = FormHook("");
    const smobile = FormHook("");
    const sfname = FormHook("");
    const updateremark = async (data: object) => {
        await updateRemark(data).then(res => {

            const status = res.data.status;
            console.log(status);
            if (status) {
                setLoanModel(false);
            }
            else {
                toast.error('Error occured');
                console.log(res.data.error);
            }
        }).catch(err => console.log(err));
        getAlluser(page).then((res) => setUsers(res.data.messages.data)).catch((err) => console.log(err));
    }

    //UserLoanDeatails function provide details of users
    const userLoanDetails = async (cellValues: GridRenderCellParams) => {
        let sno = cellValues.row.sno;
        let result = await loanDataById(sno);
        if (result.data.sno) {
            setLoanValues((prevState) => {
                return {
                    loanid: result.data.loanid,
                    fname: result.data.fname,
                    lname: result.data.lname,
                    email: result.data.email,
                    gender: result.data.gender,
                    aadhar: result.data.aadhar,
                    pan: result.data.pan,
                    profession: result.data.profession,
                    income: result.data.income,
                    loanamount: result.data.loanamount,
                    duration: result.data.duration,
                    address1: result.data.address1,
                    address2: result.data.address2,
                    pincode: result.data.pincode,
                    place: result.data.place,
                    country: result.data.country,
                    mobile: result.data.mobile,
                    status: result.data.status,
                    remark: result.data.remark,
                    sno: result.data.sno,
                }
            });
            setLoanModel(!loanModel);

            console.log(result.data);
        }
        else {
            toast.error("This user haven't applied for loan yet");
        }
    }

    //This function update status of user
    const updatestatus = async (data: any) => {
        var stat = data['status'];
        await updateStatus(data).then(res => {
            const status = res.data.messages.success;
            console.log(res.data);
            if (status && stat === "1") {
                toast.success('Loan Approved');
                setLoanModel(false);
            }
            else if (status && stat === "0") {
                toast.error('Loan Rejected');
                setLoanModel(false);
            }
            else {
                toast.error('Error occured');
                console.log(res.data.error);
            }
        }).catch(err => console.log(err));
    }
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [users, setUsers] = useState();
    useEffect(() => {
        getAlluser(page).then(res => {
            setUsers(res.data.messages.data);
            setTotalpages(res.data.messages.totalPages)
        }).catch(err => console.log(err));
    }, [page])

    //userdelete function used to delete user
    const userdelete = async (sno: string) => {
        if (await userDelete(sno)) {
            getAlluser(page).then((res) => setUsers(res.data.messages.data)).catch((err) => console.log(err));
            toast.success('User Deleted');

        }
        else {
            toast.error('Error in Deletion');
        }
    }
    const submitSearch = async (e: any) => {
        e.preventDefault()
        {
            const data = {
                email: semail.value,
                mobile: smobile.value,
                fname: sfname.value,
            };
            filter(data).then((res) => { setUsers(res.data) }).catch(err => console.log(err));


        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage);

    };
    // It will show the usertable data in form of grid 
    const columns: GridColDef[] = [

        {
            field: 'sno',
            headerName: 'sno',
            width: 90
        },

        {
            field: 'fname',
            headerName: 'First Name',
            width: 200,
        }, {
            field: 'lname',
            headerName: 'Last Name',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
        },
        {
            field: "detail",
            headerName: 'Action',
            width: 120,
            renderCell: (cellValues) => {

                return (
                    <>
                        {
                            cellValues.row.role === "0" ?
                                <button className='btn btn-outline-info' onClick={() => { userLoanDetails(cellValues) }}> Details</button> :
                                <h4></h4>
                        }
                    </>
                );
            } 
        },

        //It is update button

        {
            field: "update",
            headerName: 'Action',
            width: 120,
            renderCell: (cellValues1) => {

                return (
                    <>
                        {
                            cellValues1.row.role === "0" ?

                                <button className='btn btn-outline-primary' onClick={() => {
                                    getUserDetail(cellValues1);
                                    setIsEditOpen(true);
                                }}> Update</button> :
                                <h4 style={{ color: 'primary' }}>Admin</h4>
                        }

                    </>
                );
            }
        },

        // It is delete button
        {
            field: "delete",
            headerName: 'Action',
            width: 120,
            renderCell: (cellValues) => {

                return (
                    <>
                        {
                            cellValues.row.role === "0" ?
                                <button className='btn btn-outline-danger' onClick={() => { userdelete(cellValues.row.sno) }}> Delete</button> :
                                <h4></h4>                        }
                    </>
                );
            }
        }


    ];


    const [obj, setObj] = useState({
        sno: "",
        fname: "",
        lname: "",
        email: "",
        mobile: ""
    })

    //This function provide userdetail i.e. loan applied or not
    const getUserDetail = (data: GridCellParams) => {

        console.log(data.row);
        const datain = {
            sno: data.row.sno,
            fname: data.row.fname,
            lname: data.row.lname,
            email: data.row.email,
            mobile: data.row.mobile,


        }
        setObj(datain);
        setIsEditOpen(true);

    }

    return (
        <>
            <div className='container'>
                <form onSubmit={submitSearch}>

                    <div className="row py-3">
                        <div className="col-md-2 text-center">
                            <span id='fhead'>Filter:</span>
                        </div>
                        <div className="col-md-2 ">
                            <input type="text" placeholder="First Name"  {...sfname} className="cinput finput rounded form-control" />
                        </div>
                        <div className="col-md-2 ">
                            <input type="text" placeholder='Email' {...semail} className="cinput finput rounded form-control" />
                        </div>
                        <div className="col-md-2 ">
                            <input type="number" placeholder='Mobile Number' {...smobile} className="cinput finput rounded form-control" />
                        </div>
                        <div className="col-md-4 button">
                            <input value="Search" type="submit" className='btn btn-info' />
                            <button className='btn btn-info mx-2'
                                onClick={() => {
                                    getAlluser(page).then(res => setUsers(res.data.messages.data)).catch(err => console.log(err));
                                    sfname.reset();
                                    semail.reset();
                                    smobile.reset();
                                }
                                }>Reset</button>
                        </div>
                    </div>

                </form>
            </div>
            {/* It will print userlist */}
            <div className='userlist' >

                <div className='col-10 p-5 '>
                    <Box sx={{ height: "70vh", width: '120%' }}>
                        <DataGrid

                            rows={users ? users : []}
                            columns={columns}
                            getRowId={(users: any) => users.sno}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[3, 5, 10, 20, 40]}
                            checkboxSelection

                            disableSelectionOnClick
                            components={{ Toolbar: GridToolbar }}
                        />
                        <div className="m-2">
                            {Array.from({ length: totalPages }, (val, index) => (

                                <button key={index} className="ms-2 btn btn-info" onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                            </div>
                    </Box>
                </div>

                <Modal isOpen={isEditOpen} size='md' toggle={() => setIsEditOpen(!isEditOpen)} >
                    <ModalHeader
                        toggle={() => setIsEditOpen(!isEditOpen)}>
                        Update Details
                    </ModalHeader>
                    <ModalBody>

                        <form onSubmit={async (evt) => {

                            evt.preventDefault();
                            let data = new FormData(evt.currentTarget);
                            let formData = {

                                fname: data.get("fname"),
                                lname: data.get("lname"),
                                email: data.get("email"),
                                mobile: data.get("mobile"),


                            };
                            console.log(formData);
                            const res = await update(formData, obj.sno);

                            console.log(res);
                            if (res.data.messages.success === true) {
                                setIsEditOpen(false)

                                toast.success("Data Updated Successfully");

                                getAlluser(page).then(res => setUsers(res.data.messages.data)).catch(err => console.log(err));

                            }
                            else {
                                setIsEditOpen(false)

                                toast.error("Error Occured");
                            }
                        }}>
                            <Row className='mt-2'>
                                <Col>First Name
                                </Col>

                                <Col><input type="text" name="fname" className='form-control' defaultValue={obj.fname} /></Col>

                            </Row>
                            <Row className='mt-2'>
                                <Col>Last Name
                                </Col>

                                <Col><input type="text" name="lname" className='form-control' defaultValue={obj.lname} /></Col>

                            </Row>
                            <Row className='mt-2'>
                                <Col>Email
                                </Col>
                                <Col><input type="text"
                                    name="email"
                                    className='form-control' defaultValue={obj.email} /></Col>

                            </Row>
                            <Row className='mt-2'>
                                <Col>Mobile
                                </Col>
                                <Col><input type="text"
                                    name="mobile"
                                    className='form-control'
                                    defaultValue={obj.mobile}
                                /></Col>

                            </Row>

                            <Row className='mt-4'>
                                <Col lg={12} className="row">
                                    <div className='d-flex justify-content-end'>
                                        <button type="button" onClick={() => setIsEditOpen(false)} className="col-md-3 ms-2 btn btn-success"  >Cancel</button>
                                        <button type='submit' className="col-md-3 ms-2 btn btn-danger">Update</button>

                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* loan details model*/}
                <Modal isOpen={loanModel} size='md' toggle={() => setLoanModel(!loanModel)}>
                    <ModalHeader >
                        {loanValues.fname + " " + loanValues.lname}
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={
                            (e) => {
                                e.preventDefault();
                                let data = new FormData(e.currentTarget);

                                let formData = {
                                    "remark": data.get('remark'),
                                    "sno": loanValues.sno
                                };

                                updateremark(formData);
                            }
                        }>
                            <Row className='mt-2'>
                                <Col>Loan Id</Col>
                                <Col><input type="text" name='loanid' className='form-control' defaultValue={loanValues.loanid} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>First Name</Col>
                                <Col><input type="text" name='firstname' className='form-control' defaultValue={loanValues.fname} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Last Name</Col>
                                <Col><input type="text" name='lastname' className='form-control' defaultValue={loanValues.lname} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Email</Col>
                                <Col><input type="email" name='email' className='form-control' defaultValue={loanValues.email} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Gender</Col>
                                <Col><input type="email" name='gender' className='form-control' defaultValue={loanValues.gender} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Aadhar Number</Col>
                                <Col><input type="text" name='aadhar' className='form-control' defaultValue={loanValues.aadhar} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>PAN Number</Col>
                                <Col><input type="text" name='pan' className='form-control' defaultValue={loanValues.pan} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Profession</Col>
                                <Col><input type="text" name='profession' className='form-control' defaultValue={loanValues.profession} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Annual Income</Col>
                                <Col><input type="text" name='income' className='form-control' defaultValue={loanValues.income} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Loan Amount</Col>
                                <Col><input type="text" name='loanamount' className='form-control' defaultValue={loanValues.loanamount} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Duration(in months)</Col>
                                <Col><input type="text" name='duration' className='form-control' defaultValue={loanValues.duration} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Address</Col>
                                <Col><input type="text" name='address' className='form-control' defaultValue={loanValues.address1 + ", " + loanValues.address2} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Pincode</Col>
                                <Col><input type="text" name='pincode' className='form-control' defaultValue={loanValues.pincode} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Place</Col>
                                <Col><input type="text" name='place' className='form-control' defaultValue={loanValues.place} disabled /></Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>Remark</Col>
                                <Col><textarea name='remark' className='form-control' defaultValue={loanValues.remark} /></Col>
                            </Row>
                            <>
                                {
                                    (loanValues.status === "1") &&
                                    <Row className='mt-2'>
                                        <Col>Status</Col>
                                        <Col>You have approved the Loan</Col>
                                    </Row>
                                }{
                                    (loanValues.status === "0") &&
                                    <Row className='mt-2'>
                                        <Col>Status</Col>
                                        <Col>You have rejected the Loan</Col>
                                    </Row>
                                }{(loanValues.status === null) &&
                                    <Row className='mt-2'>
                                        <Col>Status</Col>
                                        <Col><Button className=" btn btn-success ml-4" onClick={() => {
                                            let formData = {
                                                "status": "1",
                                                "sno": loanValues.sno
                                            };

                                            updatestatus(formData);
                                        }}>Approve</Button>
                                            <Button className=" btn btn-danger" onClick={() => {
                                                let formData = {
                                                    "status": "0",
                                                    "sno": loanValues.sno
                                                };

                                                updatestatus(formData);
                                            }}>Reject</Button></Col>
                                    </Row>
                                }
                            </>



                            <Row className='mt-2'>
                                <Col>Mobile Number</Col>
                                <Col><input type="number" name='mobile' className='form-control' defaultValue={loanValues.mobile} disabled /></Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col lg={12} className="row">
                                    <div className='d-flex justify-content-end'>
                                        <Button onClick={() => setLoanModel(false)} className="col-md-3 ms-2 btn btn-danger"  >Close</Button>
                                        <Button type='submit' className="col-md-3 ms-2 btn btn-success">Okay</Button>
                                    </div>
                                </Col>
                            </Row>

                        </form>
                    </ModalBody>

                </Modal>
            </div>
        </>

    )
}

export default Admin