import {Link} from "react-router-dom";

export default function ListagemPartida(props) {
  
  function handleClickExcluirPartida(data){
    props.setPartidas(props.partidas.filter((value) => value.data !== data));
  }

  return( <>
            <div id='lbl_titulo_pagina'>Listagem de Partidas</div><br/>
            <Link to="/partidas/novo"><button id="Nova Partida" name="btn_nova_partida">Nova Partida</button></Link><br/><br/>
            <br/><br/>
            <TabelaPartidas partidas={props.partidas} onClickExcluirPartida={handleClickExcluirPartida}  />
          </>
  );
}

const TabelaPartidas = (props) => {
  return(
          <table id="partidas" border="1">
            <tbody>
              {props.partidas.map((partida) =><LinhaPartida key={partida.data} partida={partida} 
                                    onClickExcluirPartida={props.onClickExcluirPartida}/>)}
            </tbody>
          </table>
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
            <td><button onClick={() => props.onClickExcluirPartida(props.partida.data)}>X</button></td>
          </tr>
  );
}
