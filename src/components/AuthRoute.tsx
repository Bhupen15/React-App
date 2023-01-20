
import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';



type Props = {
    children: JSX.Element,
    allowedRole: string

}

const AuthRoute = ({ children, allowedRole }: Props) => {

    let session = localStorage.getItem("session");
    let role;
    if (session!==null) {
        role = JSON.parse(session).role;
        if (role == allowedRole) {
            return (
                <>{children}</>
            )
        }
        toast.error(`Not Authorized, your role ${role} is not Allowed`)

        return <Navigate to="/signin" replace={true} />

    } else {
        toast.error(`You Are not Logged in`)
        return <Navigate to="/signin" replace={true} />
    }

}

export default AuthRoute