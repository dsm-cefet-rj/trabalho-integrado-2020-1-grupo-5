import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteTimeServer, fetchTimes, selectAllTimes} from './TimesSlice'
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


export default function ListagemTime(props) {
  const classes = useStyles();
  
  const times = useSelector(selectAllTimes)
  const status = useSelector(state => state.times.status);
  const error = useSelector(state => state.times.error);
  const dispatch = useDispatch();

    
  function handleClickExcluirTime(id){
    dispatch(deleteTimeServer(id));
  }

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchTimes())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchTimes()), 5000);
    }
  }, [status, dispatch])


  let tabelaTimes = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    tabelaTimes = <TabelaTimes times={times} onClickExcluirTime={handleClickExcluirTime} />;
  }else if(status === 'loading'){
    tabelaTimes = <div>Carregando os times...</div>;
  }else if(status === 'failed'){
    tabelaTimes = <div>Error: {error}</div>;
  }

  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Times</h1></div>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton component={Link} to="/times/novo" id="novo_time" name="novo_time"><AddCircleIcon color='primary' style={{fontSize: 50}}/></IconButton>
              </Box>
            </Box>
            {tabelaTimes}
          </div>
          </>
  );
}

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

function TabelaTimes(props) {
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