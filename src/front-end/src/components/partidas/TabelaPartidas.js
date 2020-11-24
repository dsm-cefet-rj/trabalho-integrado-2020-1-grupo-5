import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deletePartidaServer, fetchPartidas, selectAllPartidas} from './PartidasSlice'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


export default function ListagemPartida(props) {
  
  const partidas = useSelector(selectAllPartidas)
  const status = useSelector(state => state.partidas.status);
  const error = useSelector(state => state.partidas.error);

  const dispatch = useDispatch();
    
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
            <div id="lbl_titulo_pagina"><h1>Partidas</h1></div><br/>
            <label>Data:</label> <input type="text" name="data" onChange={ProcurarPartida}/>
            &nbsp;
            <Button id="Nova Partida" name="btn_nova_partida" to="/partidas/novo" variant='contained' color='primary' component={Link}>Nova Partida</Button><br/><br/>
            {tabelaPartidas}
          </>
  );
}

const LinhaPartida = (props) => {
  if(props != null && props.partida != null && props.partida.id != null){
      return(
          <tr>
            <Link to={`/partidas/visualizar/${props.partida.id}`}>
              <td>{props.partida.data}</td>
              <td>{props.partida.time_A}</td>
              <td>{props.partida.gols_time_A}</td>
              <td>X</td>
              <td>{props.partida.gols_time_B}</td>
              <td>{props.partida.time_B}</td>
            </Link>
            <td><Link to={`/partidas/${props.partida.id}`}><IconButton id="edita_partida" ><EditIcon/></IconButton></Link></td>
            <td><IconButton id="edita_partida" name="excluir_partida" onClick={() => props.onClickExcluirPartida(props.partida.id)}><DeleteIcon /></IconButton></td>
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
