import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deletePartidaServer, fetchPartidas, selectAllPartidas} from './PartidasSlice'
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function ListagemPartida(props) {
  
  const partidas = useSelector(selectAllPartidas)
  const status = useSelector(state => state.partidas.status);
  const error = useSelector(state => state.partidas.error);
  const dispatch = useDispatch();
  const classes = useStyles();
    
  function handleClickExcluirPartida(id){
    dispatch(deletePartidaServer(id));
  }

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchPartidas())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchPartidas()), 5000);
    }
  }, [status, dispatch])


  let tabelaPartidas = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    tabelaPartidas = <TabelaPartidas partidas={partidas} onClickExcluirPartida={handleClickExcluirPartida} />;
  }else if(status === 'loading'){
    tabelaPartidas = <div>Carregando as partidas...</div>;
  }else if(status === 'failed'){
    tabelaPartidas = <div>Error: {error}</div>;
  }

  function ProcurarPartida(data){
    props.setPartidas(props.partidas.filter((value) => value.data === data));
  }

  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Partidas</h1></div>
                <div className={classes.root}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <TextField type="date" id="procura_data_partida" label="Data" InputLabelProps={{ shrink: true }}/>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton component={Link} to="/partidas/novo" id="nova_partida" name="btn_nova_partida"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
              </Box>

            </Box>
            {tabelaPartidas}
          </div>
          </>
  );
}

const LinhaPartida = (props) => {
  if(props != null && props.partida != null && props.partida.id != null){
      return(
        <>      
          <ListItem>
            <ListItem button component={Link} to = {`/partidas/visualizar/${props.partida.id}`}>
              <Hidden xsDown>
                <ListItemText secondary={props.partida.data}/>
              </Hidden>
              <ListItemText primary="Icon" secondary={props.partida.time_A}/>
                <ListItemText primary={props.partida.gols_time_A}/>
                <ListItemText>X</ListItemText>
                <ListItemText primary={props.partida.gols_time_B}/>
                <ListItemText primary="Icon" secondary={props.partida.time_B}/>
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

function TabelaPartidas(props) {
  if(props != null && props.partidas != null && props.partidas.length > 0){
    return(
      <Box justifyContent="flex-start">
        <List>
        {props.partidas.map((partida) =><LinhaPartida key={partida.id} partida={partida} 
                                    onClickExcluirPartida={props.onClickExcluirPartida}/>)}
        </List>
      </Box>
    );
  }else{
    return(<div>Não existem partidas a serem exibidas.</div>)
  }
}
