import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Azul from './camisaazul.png'
import Vermelho from './camisavermelha.png'
import Grid from '@material-ui/core/Grid';

import BotaoExcluir from '../layout/AlertDialog.js'

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
            <Grid className={classes.root} container direction="row">           
              <Grid direction="column" item xs={12} container alignItems="center">
                    <ListItemText secondary={new Date(props.partida.data).toLocaleDateString()}/>            
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center" >
                  <img className={classes.image} alt={props.partida.time_A} src={Azul}/>
                  <br/>
                  <ListItemText secondary={props.partida.time_A}/>
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center">
                  <h3>{props.partida.gols_time_A} X {props.partida.gols_time_B}</h3>
              </Grid>
              <Grid direction="column" item xs={4} container alignItems="center">
                  <img className={classes.image} alt={props.partida.time_B} src={Vermelho}/>
                  <br/>
                  <ListItemText secondary={props.partida.time_B}/>
              </Grid>
            </Grid>        
          </ListItem>

          <Link to={`/partidas/${props.partida.id}`}><IconButton id="edita_partida" Link to={`/partidas/${props.partida.id}`} ><EditIcon/></IconButton></Link>
          
          <BotaoExcluir 
            id="deleta_partida" 
            name="excluir_partida"
            msg="Você está prestes a excluir a partida selecionada."
            funcao={props.onClickExcluirPartida} 
            chave={props.partida.id}
          />
          <br/>
        </ListItem>
      </>
    );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir a partida.</td></tr>)
  }
}

export default LinhaPartida;