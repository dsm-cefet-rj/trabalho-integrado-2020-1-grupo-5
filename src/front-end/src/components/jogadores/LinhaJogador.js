import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const LinhaJogador = (props) => {
    if(props != null && props.jogador != null && props.jogador.id != null){
        return(
          <>
          <ListItem>
            <ListItem button component={Link} to = {`/jogadores/visualizar/${props.jogador.id}`}>
              <ListItemText primary={props.jogador.nome}/>
            </ListItem>
            
              <Link to={`/jogadores/${props.jogador.id}`}><IconButton id="edita_jogador" Link to={`/jogadores/${props.jogador.id}`} ><EditIcon/></IconButton></Link>
              <IconButton id="deleta_jogador" name="excluir_jogador" onClick={() => props.onClickExcluirJogador(props.jogador.id)}><DeleteIcon /></IconButton>
  
        </ListItem>
          </>
       );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir jogadores.</td></tr>)
    }
  }
  
  export default LinhaJogador;