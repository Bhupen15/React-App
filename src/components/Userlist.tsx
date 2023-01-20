import React, { useEffect, useState } from 'react'
import { User, getAlluser } from '../services/AdminServices';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

function Userlist() {

    const [users, setUsers] = useState<User[]>();
    useEffect(() => {
        getAlluser().then(res => setUsers(res.data)).catch(err => console.log(err));
    }, [])


  

    const columns: GridColDef[] = [
        { field: 'sno', headerName: 'sno', width: 100 },

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

    ];

    return (

        <div>



            <div className='col-10 m-4 p-5'>
                <Box sx={{ height: "45vh", width: '100%' }}>
                    <DataGrid

                        rows={users ? users : []}
                        columns={columns}
                        getRowId={(users: any) => users.sno}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection

                        disableSelectionOnClick
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </div>

        </div>
    )
}

export default Userlist