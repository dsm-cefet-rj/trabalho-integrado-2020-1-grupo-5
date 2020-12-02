import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaTime from './LinhaTime';


export default function TabelaTimes(props) {
  if(props != null && props.times != null && props.times.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
              {props.times.map((time) =><LinhaTime key={time.id} time={time} 
                                    onClickExcluirTime={props.onClickExcluirTime}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>Não existem times a serem exibidos.</div>)
  }
}