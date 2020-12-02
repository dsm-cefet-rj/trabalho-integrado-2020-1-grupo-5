import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaJogador from './LinhaJogador';


export default function TabelaJogadores(props) {
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
