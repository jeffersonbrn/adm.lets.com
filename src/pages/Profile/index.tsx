import Layout from '../../components/layout';
import Button from '../../components/button';
import GridDefault from '../../components/grid';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormProfile from './components/FormProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    cardProfile: {
        display: 'flex',
        marginRight: 20
    }
}));

export default function ProfilePage() {
    const classes = useStyles();
    const titlePage = 'Perfil';
    const nameButton = 'Voltar';
    const urlButton = '/home';

    return (
        <>
            <Layout titlePage={titlePage} >
                <Button nameButton={nameButton} urlButton={urlButton}/>
                <GridDefault>
                    <Grid className={classes.root} item xs={12} sm={12}>
                        <FormProfile />
                    </Grid>
                </GridDefault>
            </Layout>
        </>
    )
}