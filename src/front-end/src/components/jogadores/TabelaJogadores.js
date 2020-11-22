import React from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

export default function ListagemJogador(props) {
  
  const jogadoresState = useSelector(state => state.jogadores);
  const jogadores = jogadoresState.jogadores;
  const status = jogadoresState.status;
  const error = jogadoresState.error;
  
  const dispatch = useDispatch();
  
  function handleClickExcluirJogador(id){
      dispatch({type: 'delete_jogador', payload:id})
  }

  let tabelaJogadores = '';
  if(status === 'loaded'){
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
            <div id='lbl_titulo_pagina'>Listagem de jogadores</div><br/>
            <form>
              <label>Nome:</label> <input type="text" onChange={ProcurarJogador}/>
              &nbsp;
              <Link to="/jogadores/novo"><button id="Novo Jogador" name="btn_novo_jogador">Novo Jogador</button></Link><br/><br/>
              <br/><br/>
              {tabelaJogadores}
            </form>
          </>
  );
}

const LinhaJogador = (props) => {
  if(props != null && props.jogador != null && props.jogador.id != null){
      return(
          <tr>
            <td>{props.jogador.nome}</td>
            <td><Link to={`/jogadores/${props.jogador.id}`}><button>Editar</button></Link></td>
            <td><button id="excluir_jogador" name="excluir_jogador" onClick={() => props.onClickExcluirJogador(props.jogador.id)}>Del</button></td>
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