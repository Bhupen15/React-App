// import React from 'react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { User, getAlluser, userDelete } from '../services/AdminServices';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Admin() {
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [users, setUsers] = useState<User[]>();
    useEffect(() => {
        getAlluser().then(res => setUsers(res.data)).catch(err => console.log(err));
    }, [])
    const userdelete = async (sno: string) => {
        if (await userDelete(sno)) {
            getAlluser().then((res) => setUsers(res.data)).catch((err) => console.log(err));
            toast.success('User Deleted');

        }
        else {
            toast.error('Error in Deletion');
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'sno',
            headerName: 'sno',
            width: 90
        },

        {
            field: 'fname',
            headerName: 'First Name',
            width: 300,
            // editable: true,
        }, {
            field: 'lname',
            headerName: 'Last Name',
            width: 300,
            // editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            // editable: true,
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            width: 300,
            // editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            // editable: true,
        },

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
                                <h4 style={{ color: 'primary' }}>Admin</h4>
                        }
                    </>
                );
            }
        },
        {
            field: "update",
            headerName: 'Action',
            width: 120,
            renderCell: (cellValues1) => {

                return (
                    <>
                        {
                         cellValues1.row.role === "0" ?
                            <button className='btn btn-outline-primary' onClick={() => { console.log(cellValues1.row) }}> Update</button>:
                            <h4 style={{ color: 'primary' }}>Admin</h4>
                        }
                    </>
                );
            }
        }

    ];

    return (
        <div className='userlist'>



            <div className='col-10 m-4 p-5'>
                <Box sx={{ height: "70vh", width: '120%' }}>
                    <DataGrid

                        rows={users ? users : []}
                        columns={columns}
                        getRowId={(users: any) => users.sno}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20, 40]}
                        checkboxSelection

                        disableSelectionOnClick
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </div>

        </div>

    )
}

export default Admin