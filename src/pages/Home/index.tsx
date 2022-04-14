import Layout from '../../components/layout';
import Grid from '../../components/grid';

export default function Dashboard() {
    const titlePage = 'Dashboard';

    return (
        <>
            <Layout titlePage={titlePage} >
                <Grid>
                    <span>Dashboard Page</span>
                </Grid>
            </Layout>
        </>
    )
}