import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import Grid from '../../components/grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PositionService from '../../services/position.services';
import PackageService from '../../services/package.services';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@material-ui/core/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function ListPackages() {
    const titlePage = 'Listagem de Pacotes';
    const [packages, setPackages] = useState<any[]>([]);
    console.log(packages);

    useEffect(() => {
        async function getPackagesAll() {
            await PackageService.getPackagesAll()
                .then((res) => {
                    setPackages(res.data.packages)
                })
        }
        getPackagesAll();
    }, [])
    
    async function handleDelete(id: number) {
        if (window.confirm("Deseja realmente excluir o registro?")) {
            var result = await PackageService.deletePackage(id);
            if (result.status === 200) {
                window.location.href = '/packages';
            } else {
                alert("Ocorreu um erro. Por favor, tente novamente")
            }
        }
    }

    return (
        <>
            <Layout titlePage={titlePage} >
                <Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome do Pacote</TableCell>
                                    <TableCell align="center">Descrição</TableCell>
                                    <TableCell align="center">Código de Rastreamento</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Data de Criação</TableCell>
                                    <TableCell align="center">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(packages).map((item: any, i: any) => (
                                    <TableRow key={i}>
                                        <TableCell align="center" component="th" scope="row">
                                            {packages[item].name}
                                        </TableCell>
                                        <TableCell align="center">{packages[item].description}</TableCell>
                                        <TableCell align="center">{packages[item].code_tracking}</TableCell>
                                        <TableCell align="center">{packages[item].positions.name}</TableCell>
                                        <TableCell align="center">{new Date(packages[item].created_at).toLocaleString('pt-br')}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Tooltip title="Detalhes do Pacote">
                                                    <Button color="primary" href={`/packages/${packages[item].id}/view`} ><PreviewIcon /></Button>
                                                </Tooltip>
                                                <Tooltip title="Upload de arquivos">
                                                    <Button color="primary" href={`/packages/${packages[item].id}/uploadFile`} ><UploadFileIcon /></Button>
                                                </Tooltip>
                                                <Tooltip title="Alterar Status">
                                                    <Button color="primary" href={`/packages/${packages[item].id}/updatePackagePosition`} ><LocalShippingIcon /></Button>
                                                </Tooltip>
                                                <Tooltip title="Editar Pacote">
                                                    <Button color="primary" href={`/packages/${packages[item].id}/update`} ><EditIcon /></Button>
                                                </Tooltip>
                                                <Tooltip title="Deletar Cadastro">
                                                    <Button color="secondary" onClick={() => handleDelete(packages[item].id)} ><DeleteIcon /></Button>
                                                </Tooltip>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Layout>
        </>
    )
}