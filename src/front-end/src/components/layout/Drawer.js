import React from 'react';
import MUIDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import ListIcon from '@material-ui/icons/List';
import FolderIcon from '@material-ui/icons/Folder';
import {Link} from "react-router-dom";


export default function Drawer(props){
    
    return(
        <MUIDrawer anchor="left" open={props.open} 
            onOpen={props.toggleDrawerHandler(true)} 
            onClose={props.toggleDrawerHandler(false)} >
            <Box width={250}>
                <List>
                    <ListItem key="Perfil">
                    <   ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="Perfil"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Partidas" onClick={props.toggleDrawerHandler(false)} component={Link} to="/">
                        <ListItemIcon><SportsSoccerIcon /></ListItemIcon>
                        <ListItemText primary="Partidas" />
                    </ListItem>
                    <ListItem button key="Ranking" onClick={props.toggleDrawerHandler(false)} component={Link} to="/partidas/novo">
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItem>
                    <ListItem button key="Cadastros" onClick={props.toggleDrawerHandler(false)} component={Link} to="/jogadores">
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary="Cadastros" />
                    </ListItem>
                </List>
            </Box>
        </MUIDrawer>
    )

}