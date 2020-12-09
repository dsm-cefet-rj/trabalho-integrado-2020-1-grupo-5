import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BotaoExcluir from '../layout/AlertDialog.js'


const LinhaTime = (props) => {
  if(props != null && props.time != null && props.time.id != null){
    return(
      <>
        <ListItem>
          <ListItem>
            <ListItem button component={Link} to = {`/times/visualizar/${props.time.id}`}>
              <ListItemText primary={props.time.nome}/>
            </ListItem>
          </ListItem>
          
          <Link to={`/times/${props.time.id}`}><IconButton id="edita_time" Link to={`/times/${props.time.id}`} ><EditIcon/></IconButton></Link>
        
          <BotaoExcluir 
            id="deleta_time" 
            name="deleta_time"
            msg="Você está prestes a excluir o time selecionado."
            funcao={props.onClickExcluirTime} 
            chave={props.time.id}
          />
        </ListItem>          
      </>
    );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir times.</td></tr>)
  }
}

export default LinhaTime;