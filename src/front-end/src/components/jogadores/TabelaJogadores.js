import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteJogadorServer, fetchJogadores, selectAllJogadores} from './JogadoresSlice'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function ListagemJogador(props) {
  
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

  function ProcurarJogador(data){
    props.setJogador(props.jogadores.filter((value) => value.data === data));
  }

  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Jogadores</h1></div>
                <label>Nome:</label>
                <br></br>
                <input type="text" onChange={ProcurarJogador}/>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Box>
                <Button id="Novo Jogador" name="btn_novo_jogador" to="/jogadores/novo" variant='contained' color='primary' component={Link}>Novo Jogador</Button>
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
          <ListItemSecondaryAction>
            <Link to={`/jogadores/${props.jogador.id}`}><IconButton id="edita_jogador" Link to={`/jogadores/${props.jogador.id}`} ><EditIcon/></IconButton></Link>
            <IconButton id="deleta_jogador" name="excluir_jogador" onClick={() => props.onClickExcluirJogador(props.jogador.id)}><DeleteIcon /></IconButton>
          </ListItemSecondaryAction>
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