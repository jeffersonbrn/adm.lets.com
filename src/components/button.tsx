import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    buttonAdd: {
        marginBottom: 20
    }
}));

export default function ButtonDefault(props: any) {
    const classes = useStyles();
    return (
        <Button href={props.urlButton} className={classes.buttonAdd} variant="contained" color="primary">
            {props.nameButton}
        </Button>
    )
}

