import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@mui/material/TextField';
import Paper from '@material-ui/core/Paper';
import ProfileService from '../../../services/profile.services';

const useStyles = makeStyles((theme) => ({
    buttonAdd: {
        marginBottom: 20,
        marginLeft: 15
    }
}));

export default function FormProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function getProfile() {
            await ProfileService.getProfile()
                .then((response) => {
                    setName(response.data.name);
                    setEmail(response.data.email);
                })
        }
        getProfile();
    }, [])

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2 },
                    width: '100%',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'center',
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="name"
                        name='name'
                        label="Nome do Usuário"
                        type="text"
                        variant="standard"
                        sx={{ width: '50ch' }}
                        value={name}
                    />
                    <TextField
                        required
                        id="email"
                        name='email'
                        label="E-mail"
                        type="email"
                        variant="standard"
                        sx={{ width: '50ch' }}
                        value={email}
                    />
                </div>
            </Box>
        </TableContainer>
    );
}
