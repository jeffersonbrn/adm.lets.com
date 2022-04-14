import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}))

export default function GridDefault(props: any) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={12}>
                    {props.children}
                </Grid>
            </Grid>
        </Paper>
    )
}