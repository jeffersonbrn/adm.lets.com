import React, { useState } from 'react';
import Layout from '../../components/layout';
import Grid from '../../components/grid';
import ButtonDefault from '../../components/button';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';

import SearchCep from '../../services/searchcep';
import { AxiosError } from 'axios';
import PackageType from '../../types/package.type';
import PackageService from '../../services/package.services';

const useStyles = makeStyles((theme) => ({
    buttonAdd: {
        marginBottom: 20,
        marginLeft: 15
    }
}));

export default function EditPackage() {
    const classes = useStyles();
    const titlePage = 'Criar Pacote';
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code_tracking, setCode] = useState('');
    const [cep, setCep] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [complement, setComplement] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [returnCep, setReturnCep] = useState('');

    function isValid() {
        if (name.length > 3 && description.length > 3 && code_tracking.length > 0 && cep.length == 8 && road.length > 3 && district.length > 3 && state.length > 1 && city.length > 3) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid()) {
            const data: PackageType = {
                name,
                description,
                code_tracking,
                cep,
                road,
                number,
                district,
                complement,
                state,
                city
            }
            PackageService.createPackage(data)
                .then((res) => {
                    setMessage("Pacote Cadastrado com sucesso");
                    setTimeout(() => {
                        window.location.href = '/packages';
                    }, 1000);
                })
                .catch((error) => {
                    const err = error as AxiosError
                    setMessage("Error: " + JSON.stringify(err.response?.data.errors))
                })
        } else {
            setMessage("Algo deu errado, tente novamente")
        }
    };

    function handleSearchCep() {
        SearchCep.getCep(cep)
            .then((res: any) => {
                console.log(res.data.erro)
                if (res.data.erro == 'true') {
                    setReturnCep("CEP Não Localizado")
                }
                setRoad(res.data.logradouro);
                setDistrict(res.data.bairro);
                setState(res.data.uf);
                setCity(res.data.localidade);
            })
            .catch((err: any) => {
                const error: any = err as AxiosError;
                setReturnCep("error" + JSON.stringify(error.response?.data.errors))
            })
    }

    return (
        <>
            <Layout titlePage={titlePage} >
                <ButtonDefault nameButton={`Retornar a Lista`} urlButton={`/packages`} />
                <div style={{ marginLeft: '1%' }}>
                    <TextField
                        required
                        id="cep"
                        name='cep'
                        label="CEP"
                        type="text"
                        variant="standard"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                    />
                    <Button onClick={handleSearchCep} disabled={cep.length !== 8 ? true : false} type="submit" className={classes.buttonAdd} variant="contained" color="primary">
                        Buscar CEP
                    </Button>
                    <span style={{ marginLeft: '1%' }}>{returnCep ? returnCep : ""}</span>
                </div>

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
                                <h4 style={{ marginLeft: '2%' }}>Dados de Entrega</h4>
                                <TextField
                                    required
                                    id="road"
                                    name='road'
                                    label="Lograduro"
                                    type="text"
                                    variant="standard"
                                    value={road}
                                    onChange={e => setRoad(e.target.value)}
                                />
                                <TextField
                                    id="number"
                                    name='number'
                                    label="Nº"
                                    type="text"
                                    variant="standard"
                                    value={number}
                                    onChange={e => setNumber(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="district"
                                    name='district'
                                    label="Bairro"
                                    type="text"
                                    variant="standard"
                                    value={district}
                                    onChange={e => setDistrict(e.target.value)}
                                />
                                <TextField
                                    id="complement"
                                    name='complement'
                                    label="Complemento"
                                    type="text"
                                    variant="standard"
                                    value={complement}
                                    onChange={e => setComplement(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="state"
                                    name='state'
                                    label="Estado"
                                    type="text"
                                    variant="standard"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="city"
                                    name='city'
                                    label="Cidade"
                                    type="text"
                                    variant="standard"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <h4 style={{ marginLeft: '2%' }}>Dados Do Pacote</h4>
                                <TextField
                                    required
                                    id="name"
                                    name='name'
                                    label="Nome do Pacote"
                                    type="text"
                                    variant="standard"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="description"
                                    name='description'
                                    label="Descrição do Pacote"
                                    type="text"
                                    variant="standard"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="code_tracking"
                                    name='code_tracking'
                                    label="Código"
                                    type="text"
                                    variant="standard"
                                    value={code_tracking}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </div>
                            <Button disabled={!isValid()} type="submit" className={classes.buttonAdd} variant="contained" color="primary">
                                Adicionar Pacote
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