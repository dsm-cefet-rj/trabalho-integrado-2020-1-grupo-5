import React from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

export default function ListagemPartida(props) {
  
  const partidasState = useSelector(state => state.partidas);
  const partidas = partidasState.partidas;
  const status = partidasState.status;
  const error = partidasState.error;
  
  const dispatch = useDispatch();
  
  function handleClickExcluirPartida(id){
      dispatch({type: 'delete_partida', payload:id})
  }

  let tabelaPartidas = '';
  if(status === 'loaded'){
    tabelaPartidas = <TabelaPartidas partidas={partidas} onClickExcluirProjeto={handleClickExcluirPartida} />;
  }else if(status === 'loading'){
    tabelaPartidas = <div>Carregando as partidas...</div>;
  }else if(status === 'failed'){
    tabelaPartidas = <div>Error: {error}</div>;
  }

  function ProcurarPartida(data){
    props.setPartidas(props.partidas.filter((value) => value.data === data));
  }

  return( <>
            <div id='lbl_titulo_pagina'>Listagem de Partidas</div><br/>
            <form>
              <label>Data:</label> <input type="text" name="data" onChange={ProcurarPartida}/>
              &nbsp;
              <Link to="/partidas/novo"><button id="Nova Partida" name="btn_nova_partida">Nova Partida</button></Link><br/><br/>
              <br/><br/>
              {tabelaPartidas}
            </form>
          </>
  );
}

const LinhaPartida = (props) => {
  if(props != null && props.partida != null && props.partida.id != null){
      return(
          <tr>
            <td>{props.partida.data}</td>
            <td>{props.partida.time_A}</td>
            <td>{props.partida.gols_time_A}</td>
            <td>X</td>
            <td>{props.partida.gols_time_B}</td>
            <td>{props.partida.time_B}</td>
            <td><Link to={`/partidas/${props.partida.id}`}><button>Editar</button></Link></td>
            <td><button id="excluir_partida" name="excluir_partida" onClick={() => props.onClickExcluirPartida(props.partida.id)}>Del</button></td>
          </tr>
     );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir a partida.</td></tr>)
  }
}

function TabelaPartidas(props) {
  if(props != null && props.partidas != null && props.partidas.length > 0){
    return(
          <table id="partidas" border="1">
            <tbody>
              {props.partidas.map((partida) =><LinhaPartida key={partida.id} partida={partida} 
                                    onClickExcluirPartida={props.onClickExcluirPartida}/>)}
            </tbody>
          </table>
    );
  }else{
    return(<div>Não existem partidas a serem exibidas.</div>)
  }
}
