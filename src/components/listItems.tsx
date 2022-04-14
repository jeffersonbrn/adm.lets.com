import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core/';
import { List, ListItemButton, Collapse } from '@mui/material';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export function MainListItems(props: any) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
        props.modifyFather(!open)
    };

    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Pacotes" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 3 }} component='a' href='/packages' >
                        <ListItemIcon>
                            <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista de Pacotes" />
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 3 }} component='a' href='/packages/create' >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Adicionar Pacote" />
                    </ListItemButton>
                </List>
            </Collapse>
        </div>
    )
};

export function SecondaryListItems() {
    return (
        <div>
            <ListSubheader inset>Configurações</ListSubheader>
            <ListItem button component="a" href="/users" >
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
            </ListItem>
            <ListItem button component="a" href="/users/create" >
                <ListItemIcon>
                    <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText primary="Criar Usuário" />
            </ListItem>
        </div>
    )
};