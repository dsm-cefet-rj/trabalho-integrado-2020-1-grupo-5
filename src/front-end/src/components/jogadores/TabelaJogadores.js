import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteJogadorServer, fetchJogadores, selectAllJogadores} from './JogadoresSlice'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


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
            <div id="lbl_titulo_pagina"><Typography variant="h3">Listagem de Jogadores</Typography></div><br/>
            <label>Nome:</label> <input type="text" onChange={ProcurarJogador}/>
            &nbsp;
            <Button id="Novo Jogador" name="btn_novo_jogador" to="/jogadores/novo" variant='contained' color='primary' component={Link}>Novo Jogador</Button><br/><br/>
            {tabelaJogadores}
          </>
  );
}

const LinhaJogador = (props) => {
  if(props != null && props.jogador != null && props.jogador.id != null){
      return(
          <tr>
            <Link to={`/jogadores/visualizar/${props.jogador.id}`}>
              <td>{props.jogador.nome}</td>
            </Link>
            <td><Link to={`/jogadores/${props.jogador.id}`}><IconButton id="edita_jogador" ><EditIcon/></IconButton></Link></td>
            <td><IconButton id="deleta_jogador" name="excluir_jogador" onClick={() => props.onClickExcluirJogador(props.jogador.id)}><DeleteIcon /></IconButton></td>
          </tr>
     );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir jogadores.</td></tr>)
  }
}

function TabelaJogadores(props) {
  if(props != null && props.jogadores != null && props.jogadores.length > 0){
    return(
          <table id="jogadores" border="1">
            <tbody>
              {props.jogadores.map((jogador) =><LinhaJogador key={jogador.id} jogador={jogador} 
                                    onClickExcluirJogador={props.onClickExcluirJogador}/>)}
            </tbody>
          </table>
    );
  }else{
    return(<div>Não existem jogadores a serem exibidos.</div>)
  }
}