import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {deletePartidaServer, fetchPartidas, selectAllPartidas} from './PartidasSlice'
import TabelaPartidas from './TabelaPartidas'

/**
 * @module partidas/ListagemPartida
 */

/**
 * Renderiza a tela de Listagem de Partidas.
 * 
 */

function ListagemPartida() {
  
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
      tabelaPartidas = <TabelaPartidas partidas={partidas} onClickExcluirPartida={handleClickExcluirPartida} />;
    }else if(status === 'loading'){
      tabelaPartidas = <div>Carregando as partidas...</div>;
    }else if(status === 'failed'){
      tabelaPartidas = <div>Error: {error}</div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Partidas</h1></div>
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


  export default ListagemPartida