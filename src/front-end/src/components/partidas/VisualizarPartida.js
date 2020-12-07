import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';

import {selectPartidasById} from './PartidasSlice'
import {partidaSchema} from './PartidaSchema';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    form: {
      '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
      },
    },
  
  }));

function VisualizarPartida() {
    const classes = useStyles();

    let { id } = useParams();
    id = parseInt(id);

    const partidaFound = useSelector(state => selectPartidasById(state, id))

    const [partidaOnLoad] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));
    

    return( <>
                <tr>
                    <td>Data:</td>
                    <td>{new Date(partidaOnLoad.data).toLocaleDateString()}</td>
                </tr>
                <br/>
                <tr> 
                     <td>Árbitro:</td>
                     <td>{partidaOnLoad.arbitro}</td>
                 </tr>
                 <br/>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        time a
                    </Grid>
                    <Grid item xs={4}>
                        placar
                    </Grid>
                    <Grid item xs={4}>
                        time b
                    </Grid>
                </Grid>
            
            </>
     );
 }
 
 export default VisualizarPartida;