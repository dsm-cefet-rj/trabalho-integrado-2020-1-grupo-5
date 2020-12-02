import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaPartida from './LinhaPartida';


export default function TabelaPartidas(props) {
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
