import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteJogadorServer, fetchJogadores, selectAllJogadores} from './JogadoresSlice'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function ListagemJogador(props) {
  const classes = useStyles();
  
  const jogadores = useSelector(selectAllJogadores)
  const status = useSelector(state => state.jogadores.status);
  const error = useSelector(state => state.jogadores.error);
  const dispatch = useDispatch();

    
  function handleClickExcluirJogador(id){
    dispatch(deleteJogadorServer(id));
  }

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchJogadores())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchJogadores()), 5000);
    }
  }, [status, dispatch])


  let tabelaJogadores = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    tabelaJogadores = <TabelaJogadores jogadores={jogadores} onClickExcluirJogador={handleClickExcluirJogador} />;
  }else if(status === 'loading'){
    tabelaJogadores = <div>Carregando os jogadores...</div>;
  }else if(status === 'failed'){
    tabelaJogadores = <div>Error: {error}</div>;
  }

  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Jogadores</h1></div>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton component={Link} to="/jogadores/novo" id="novo_jogador" name="btn_novo_jogador"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
              </Box>
            </Box>
            {tabelaJogadores}
          </div>
          </>
  );
}

const LinhaJogador = (props) => {
  if(props != null && props.jogador != null && props.jogador.id != null){
      return(
        <>
        <ListItem>
          <ListItem button component={Link} to = {`/jogadores/visualizar/${props.jogador.id}`}>
            <ListItemText primary={props.jogador.nome}/>
          </ListItem>
          
            <Link to={`/jogadores/${props.jogador.id}`}><IconButton id="edita_jogador" Link to={`/jogadores/${props.jogador.id}`} ><EditIcon/></IconButton></Link>
            <IconButton id="deleta_jogador" name="excluir_jogador" onClick={() => props.onClickExcluirJogador(props.jogador.id)}><DeleteIcon /></IconButton>

      </ListItem>
        </>
     );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir jogadores.</td></tr>)
  }
}

function TabelaJogadores(props) {
  if(props != null && props.jogadores != null && props.jogadores.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
              {props.jogadores.map((jogador) =><LinhaJogador key={jogador.id} jogador={jogador} 
                                    onClickExcluirJogador={props.onClickExcluirJogador}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>Não existem jogadores a serem exibidos.</div>)
  }
}