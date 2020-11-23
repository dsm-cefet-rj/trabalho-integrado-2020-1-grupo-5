import React from 'react';
import MUIDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";


export default function Drawer(props){
    
    return(
        <MUIDrawer anchor="left" open={props.open} 
            onOpen={props.toggleDrawerHandler(true)} 
            onClose={props.toggleDrawerHandler(false)} >
            <Box width={250}>
                <List>
                    <ListItem key="Futadm">
                        <ListItemText primary="Futadm"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Partidas" onClick={props.toggleDrawerHandler(false)} component={Link} to="/">
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText primary="Partidas" />
                    </ListItem>
                    <ListItem button key="Ranking" onClick={props.toggleDrawerHandler(false)} component={Link} to="/partidas/novo">
                        <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItem>
                    <ListItem button key="Cadastros" onClick={props.toggleDrawerHandler(false)} component={Link} to="/jogadores">
                        <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                        <ListItemText primary="Cadastros" />
                    </ListItem>
                </List>
            </Box>
        </MUIDrawer>
    )

}