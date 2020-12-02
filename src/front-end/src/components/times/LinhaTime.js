import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const LinhaTime = (props) => {
  if(props != null && props.time != null && props.time.id != null){
      return(
        <>
        <ListItem>
          <ListItem button component={Link} to = {`/times/visualizar/${props.time.id}`}>
            <ListItemText primary={props.time.nome}/>
          </ListItem>
          
            <Link to={`/times/${props.time.id}`}><IconButton id="edita_time" Link to={`/times/${props.time.id}`} ><EditIcon/></IconButton></Link>
            <IconButton id="deleta_time" name="deleta_time" onClick={() => props.onClickExcluirTime(props.time.id)}><DeleteIcon /></IconButton>

      </ListItem>
        </>
     );
  }else{
    return(<tr><td colSpan={3}>Não foi possível exibir times.</td></tr>)
  }
}

export default LinhaTime;