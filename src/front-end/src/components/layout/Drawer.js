import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FolderIcon from '@material-ui/icons/Folder';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function Drawer(props){

    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


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
                    <ListItem button key="Cadastros" onClick={() => {props.toggleDrawerHandler(false);handleClick();}}>
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary="Cadastros" />
                        {open ? <ExpandLess /> : <ExpandMore />}                       
                    </ListItem> 

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key="Jogadores" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/jogadores">
                                <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
                                <ListItemText primary="Jogadores" />
                            </ListItem>
                            <ListItem button key="Times" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/times">
                                <ListItemIcon><BeenhereIcon /></ListItemIcon>
                                <ListItemText primary="Times" />
                            </ListItem>
                            <ListItem button key="ADMs" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/jogadores">
                                <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
                                <ListItemText primary="ADMs" />
                            </ListItem>
                        </List>
                    </Collapse>
                    
                </List>
            </Box>
        </MUIDrawer>
    )

}