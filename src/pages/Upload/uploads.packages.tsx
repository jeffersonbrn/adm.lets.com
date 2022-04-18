import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import GridDefault from '../../components/grid';
import UploadDataService from '../../services/upload.services';

import { makeStyles } from "@material-ui/core";
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

const useStyles = makeStyles((theme) => ({
    buttonAdd: {
        marginBottom: 20,
        marginLeft: 15
    }
}));

export default function AddUploads() {
    const classes = useStyles();
    const titlePage = 'Adicionar Anexos';
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState<any>();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const { package_id } = useParams();

    function handleChange(e: any) {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', name);
        console.log(formData);
        UploadDataService.uploadsPackage(formData, package_id)
            .then((response) => {
                if(response.data.status === 200) {
                    setMessage("Arquivo anexado com Sucesso")
                }
            })
            .catch((error) => {
                const err = error as AxiosError
                setMessage("Error: " + JSON.stringify(err.response?.data.errors))
            })
    }

    return (
        <>
            <Layout titlePage={titlePage} >
                <div style={{ marginBottom: '1%' }}>
                    <GridDefault>
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
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <h3 style={{ marginLeft: '2%' }}>Anexar Arquivos</h3>
                                    <TextField
                                        required
                                        id="name"
                                        name='name'
                                        label="Nome do Arquivo"
                                        type="text"
                                        variant="standard"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <TextField
                                        id="upload"
                                        name='file'
                                        label="Anexar"
                                        type="file"
                                        variant="standard"
                                        onChange={handleChange}
                                    />

                                </div>
                                <div>
                                    <Button type="submit" className={classes.buttonAdd} variant="contained" color="primary">
                                        Anexar arquivo
                                    </Button>
                                </div>
                                <div>
                                    <span>{message ? message : ""}</span>
                                </div>
                            </Box>
                        </TableContainer>
                    </GridDefault>
                </div>
                <div>
                    <GridDefault>
                        <span>Dashboard Page</span>
                    </GridDefault>
                </div>
            </Layout>
        </>
    )
}