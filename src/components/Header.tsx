import React from 'react'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// let result="";
// const role = result.data.messages.role;
// const id = result.data.messages.sno;
// console.log(id);
// let session = {
//   id: id,
//   role: role,
// }
// localStorage.setItem("session", JSON.stringify(session));
const logout=()=>{
    localStorage.removeItem("session");
    toast.success("logged out successfully");
  }


function Header() {
    const location = useLocation();
    let path = location.pathname;
    // const logout = (evt) =>{
    //     evt.preventdefault()

    // } 


    return (
        <>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#">MyLoan</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="me-auto">
                        {/* {path === "/admin" && <LinkContainer to="/">
                            <Nav.Link href="/">Home</Nav.Link>
                        </LinkContainer>} */}
                        {(path === "/signup" || path === "/") && <LinkContainer to="/signin">
                            <Nav.Link >Login</Nav.Link>
                        </LinkContainer>}
                        {(path === "/signin" || path === "/") && <LinkContainer to="/signup">
                            <Nav.Link >Register</Nav.Link>
                        </LinkContainer>}
               
                     
                        {/* {path==="/admin"&&<LinkContainer to="/" onClick={logout}>   <Nav.Link >Logout</Nav.Link> */}
                        {(path === "/admin" ||path === "/user")  && <LinkContainer to="/">
                            <Nav.Link  onClick={logout}>Logout</Nav.Link>
                        </LinkContainer>}
                        {/* {(path === "/userlist")  && <LinkContainer to="/admin">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>} */}
                       
                    </Nav>
                </Container>
            </Navbar>

        </>

    )
}

export default Header