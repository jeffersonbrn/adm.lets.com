import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import Grid from '../../components/grid';
import ButtonDefault from '../../components/button';
import PositionService from '../../services/position.services';
import AlterPositionType from '../../types/alterposition.type';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';

import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import PackageType from '../../types/package.type';
import PackageService from '../../services/package.services';

const useStyles = makeStyles((theme) => ({
    buttonAdd: {
        marginBottom: 20,
        marginLeft: 15
    }
}));

export default function EditStatusPackage() {
    const classes = useStyles();
    const titlePage = 'Alterar Status';
    const [positions, setPositions] = useState<any[]>([]);
    const [position, setPosition] = useState('');
    const [position_id, setNewPosition] = useState('');
    const [message, setMessage] = useState('');
    const { package_id } = useParams();

    useEffect(() => {
        async function getPackage() {
            await PackageService.getPackage(package_id)
                .then((res: any) => {
                    setPosition(res.data.Package.positions.name);
                })
                .catch((err: any) => {
                    const error: any = err as AxiosError;
                    setMessage("error" + JSON.stringify(error.response?.data.errors))
                })
        }
        getPackage()
    }, [])

    useEffect(() => {
        async function getPositionsAll() {
            await PositionService.getPositionsAll()
                .then((response) => {
                    setPositions(response.data.position);
                })
        }
        getPositionsAll();
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: AlterPositionType = { position_id };
        console.log(data);
        PackageService.alterStatusPackage(data, package_id)
            .then((res) => {
                setMessage("Status atualizado com sucesso");
                setTimeout(() => {
                    window.location.href = '/packages';
                }, 1000);
            })
            .catch((error) => {
                const err = error as AxiosError
                setMessage("Error: " + JSON.stringify(err.response?.data.errors))
            })
    };

    return (
        <>
            <Layout titlePage={titlePage} >
                <ButtonDefault nameButton={`Retornar a Lista`} urlButton={`/packages`} />
                <Grid>
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
                                <h4 style={{ marginLeft: '2%' }}>Status Atual</h4>
                                <TextField
                                    required
                                    id="name"
                                    name='name'
                                    label="Nome do Pacote"
                                    type="text"
                                    variant="standard"
                                    value={position}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="Status"
                                    select
                                    label="Novo Status"
                                    value={position_id}
                                    variant="standard"
                                    sx={{ width: '50%' }}
                                    onChange={e => setNewPosition(e.target.value)}
                                    helperText="Selecione o tipo de Usuário"
                                >
                                    {positions.map((option: any) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>

                                    ))}
                                </TextField>
                            </div>
                            <Button type="submit" className={classes.buttonAdd} variant="contained" color="primary">
                                Atualizar Status
                            </Button>
                            <div>
                                <span>{message ? message : ""}</span>
                            </div>
                        </Box>
                    </TableContainer>
                </Grid>
            </Layout>
        </>
    )
}