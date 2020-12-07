import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Azul from './camisaazul.png'
import Vermelho from './camisavermelha.png'


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    image: {
      width : 30,
      height: "auto"
    }
  }));

const LinhaPartida = (props) => {
    const classes = useStyles();
    if(props != null && props.partida != null && props.partida.id != null){
        return(
          <>
            <ListItem>
              <ListItem button component={Link} to = {`/partidas/visualizar/${props.partida.id}`}>
                <Hidden xsDown>
                  <ListItemText secondary= {new Date(props.partida.data).toLocaleDateString()}/>
                </Hidden>
                <ListItemAvatar>
                <img className={classes.image} alt={props.partida.time_A} src={Azul}/>
                  <ListItemText secondary={props.partida.time_A}></ListItemText>
                </ListItemAvatar>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ListItemText  primary={props.partida.gols_time_A}/>
                <ListItemText  primary="X"/>
                <ListItemText  primary={props.partida.gols_time_B}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ListItemAvatar>
                  <img className={classes.image} alt={props.partida.time_B} src={Vermelho}/>
                  <ListItemText secondary={props.partida.time_B}></ListItemText>
                </ListItemAvatar>
              </ListItem>           
                <Link to={`/partidas/${props.partida.id}`}><IconButton id="edita_partida" Link to={`/partidas/${props.partida.id}`} ><EditIcon/></IconButton></Link>
                <IconButton id="deleta_partida" name="excluir_partida" onClick={() => props.onClickExcluirPartida(props.partida.id)}><DeleteIcon /></IconButton>
            </ListItem>
          </>
       );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir a partida.</td></tr>)
    }
  }

  export default LinhaPartida;