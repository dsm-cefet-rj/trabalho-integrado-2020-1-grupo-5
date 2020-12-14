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

import LinhaAdm from './LinhaAdm';

/**
 * @module adms/TabelaAdms
 */

/**
 * Renderiza a tabela de adms.
 * 
 * @param {object} props.adms - Lista de adms para ser exibida na tabela.
 * 
 */

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

export default TabelaAdms