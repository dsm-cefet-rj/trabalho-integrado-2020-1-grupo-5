import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const LinhaAdm = (props) => {
    if(props != null && props.adm != null && props.adm.id != null){
        return(
          <>
          <ListItem>
            <ListItem button component={Link} to = {`/adms/visualizar/${props.adm.id}`}>
              <ListItemText primary={props.adm.nome}/>
            </ListItem>
            
              <Link to={`/adms/${props.adm.id}`}><IconButton id="edita_adm" Link to={`/adms/${props.adm.id}`} ><EditIcon/></IconButton></Link>
              <IconButton id="deleta_adm" name="deleta_adm" onClick={() => props.onClickExcluirAdm(props.adm.id)}><DeleteIcon /></IconButton>
  
        </ListItem>
          </>
       );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir adms.</td></tr>)
    }
  }

  export default LinhaAdm;