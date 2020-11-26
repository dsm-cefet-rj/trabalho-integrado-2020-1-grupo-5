import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteAdmServer, fetchAdms, selectAllAdms} from './AdmsSlice'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function ListagemAdm(props) {
  const classes = useStyles();
  
  const adms = useSelector(selectAllAdms)
  const status = useSelector(state => state.adms.status);
  const error = useSelector(state => state.adms.error);
  const dispatch = useDispatch();

    
  function handleClickExcluirAdm(id){
    dispatch(deleteAdmServer(id));
  }

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchAdms())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchAdms()), 5000);
    }
  }, [status, dispatch])


  let tabelaAdms = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    tabelaAdms = <TabelaAdms adms={adms} onClickExcluirAdm={handleClickExcluirAdm} />;
  }else if(status === 'loading'){
    tabelaAdms = <div>Carregando os adms...</div>;
  }else if(status === 'failed'){
    tabelaAdms = <div>Error: {error}</div>;
  }

  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Adms</h1></div>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton component={Link} to="/adms/novo" id="novo_adm" name="btn_novo_adm"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
              </Box>
            </Box>
            {tabelaAdms}
          </div>
          </>
  );
}

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

function TabelaAdms(props) {
  if(props != null && props.adms != null && props.adms.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
              {props.adms.map((adm) =><LinhaAdm key={adm.id} adm={adm} 
                                    onClickExcluirAdm={props.onClickExcluirAdm}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>Não existem adms a serem exibidos.</div>)
  }
}