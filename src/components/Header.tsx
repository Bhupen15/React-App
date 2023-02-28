import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import { dataBysno, imageUpload } from '../services/AdminServices';
import { Col, Modal, ModalBody, ModalHeader } from 'reactstrap';



function Header() {

    const location = useLocation();
    let path = location.pathname;
    const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        image: ""
    })
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        let session = localStorage.getItem("session") as string;
        if (session) {
            let sno = JSON.parse(session).id;
            dataBysno(sno).then((res) => setUserDetails(res.data[0])).catch((err) => console.log(err));
        }
    }, [])

    //logout funciton
    const logout = () => {
        localStorage.removeItem("session");
        toast.success("logged out successfully");
        navigate('/signin');

    }

    const uploadimage = async (e: any) => {
        e.preventDefault();
        if (!image) {
            return;
        }
        let session = localStorage.getItem("session") as string;
        let sno = JSON.parse(session).id;
        let formdata = new FormData(e.target);
        formdata.append('image', image)
        let r = await imageUpload(formdata, sno);
        if (r) {
            dataBysno(sno).then((res) => setUserDetails(res.data[0])).catch((err) => console.log(err));
        }
        else {
            toast.error('error occured');
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files ? e.target.files[0] : null);
    }



    return (
        <>
            {
                isLogOutOpen && <Modal isOpen={isLogOutOpen} size='md' toggle={() => setIsLogOutOpen(!isLogOutOpen)} >
                    <ModalHeader>
                        Do you really want to Log Out
                    </ModalHeader>
                    <ModalBody>

                        <button onClick={() => {
                            logout();
                            setIsLogOutOpen(false);
                            setIsMyProfileOpen(!isMyProfileOpen);
                        }
                        } className="col-md-3 ms-2 btn btn-success">Yes</button>
                        <button onClick={() => { setIsLogOutOpen(false); }} className="col-md-3 ms-2 btn btn-danger">No</button>
                    </ModalBody>
                </Modal>

            }

            {
                isMyProfileOpen && <Modal isOpen={isMyProfileOpen} size='md' toggle={() => setIsMyProfileOpen(!isMyProfileOpen)} >
                    <ModalHeader >My Profile </ModalHeader>
                    <ModalBody>
                        {(userDetails.image) ?
                            <img src={userDetails?.image} style={{ borderRadius: "100%", width: "150px ", height: "150px " }} alt="" />
                            :
                            <Col className='mt-2' >
                                <div style={{ fontSize: "x-large", textTransform: "capitalize" }}>Upload Image: </div>
                                <form onSubmit={uploadimage} encType="multipart/form-data">
                                    <input type="file" name='image' onChange={handleFileChange} />
                                    <input type="submit" value="Upload" className="btn btn-outline-primary" />
                                </form>
                            </Col>
                        }
                        <>
                            <Col className='mt-4' style={{ fontSize: "x-medium", textTransform: "capitalize" }} >Name : {userDetails?.fname + ' ' + userDetails?.lname}</Col>
                            <Col className='mt-2' style={{ fontSize: "x-medium", textTransform: "capitalize" }} >Mobile : {userDetails?.mobile}</Col>
                            <Col className='mt-2' style={{ fontSize: "x-medium" }} >Email : {userDetails?.email}</Col>
                            <Col className='mt-4'>
                                <button id="" onClick={() => setIsLogOutOpen(!isLogOutOpen)} className="btn btn-outline-info">Logout</button>
                                <Button onClick={() => setIsMyProfileOpen(false)} className="col-md-2 ms-2 btn btn-info">Close</Button>
                            </Col>
                        </>

                    </ModalBody>
                </Modal>

            }
            <Navbar className="" bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#">My Loan</Navbar.Brand>
                    </LinkContainer>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                            {/* path setting according to page navigation */}
                            {(path === "/signup" || path === "/") && <LinkContainer to="/signin">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>}
                            {(path === "/signin" || path === "/") && <LinkContainer to="/signup">
                                <Nav.Link >Register</Nav.Link>
                            </LinkContainer>}
                            {(path === "/admin") && <LinkContainer to="/">
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </LinkContainer>}
                            {(path === "/apply") && <LinkContainer to="/">
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </LinkContainer>}

                            {(path === "/user") &&

                                <Nav.Link onClick={() => { setIsMyProfileOpen(!isMyProfileOpen) }} >
                                    {(userDetails.image) ?
                                        <img src={userDetails?.image} style={{ borderRadius: "100%", width: "30px ", height: "20px " }} alt="" />
                                        : ""}
                                    {userDetails.fname + " " + userDetails.lname}
                                </Nav.Link>}
                        </Nav>





                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;