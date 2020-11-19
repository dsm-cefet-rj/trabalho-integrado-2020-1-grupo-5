import React from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

export default function ListagemPartida(props) {
  
  const partidas = useSelector(state => state.partidas);
  const dispatch = useDispatch();
  
  function handleClickExcluirPartida(id){
      dispatch({type: 'delete_partida', payload:id})
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
              <TabelaPartidas partidas={partidas} onClickExcluirPartida={handleClickExcluirPartida}/>
            </form>
          </>
  );
}

const LinhaPartida = (props) => {
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
}

function TabelaPartidas(props) {
  return(
          <table id="partidas" border="1">
            <tbody>
              {props.partidas.map((partida) =><LinhaPartida key={partida.id} partida={partida} 
                                    onClickExcluirPartida={props.onClickExcluirPartida}/>)}
            </tbody>
          </table>
  );
}
