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
    image: {
        width : 50,
        height: "auto"
      }
  
  }));

/**
 * @module partidas/VisualizarPartida
 */

 /**
 * @typedef Partida
 * @type {object}
 * @property {date} data - data da partida.
 * @property {string} arbitro - árbitro da partida.
 * @property {string} local - local da partida.
 * @property {string} time_A - nome do time A da partida.
 * @property {number} gols_time_A - quantidade de gols do time A da partida.
 * @property {number} gols_time_B - quantidade de gols do time B da partida.
 * @property {string} time_B - nome do time B da partida.
*/

 /**
  * Renderiza a tela com os dados do time selecionado na linha.
 */

function VisualizarPartida() {
    const classes = useStyles();

    let { id } = useParams();

    const partidaFound = useSelector(state => selectPartidasById(state, id))

    const [partidaOnLoad] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));
    

    return( <>
 
            <Grid className={classes.root} container direction="row">
                <Grid direction="column" item xs={12} container alignItems="center">
                    <p>{partidaOnLoad.local} - {new Date(partidaOnLoad.data).toLocaleDateString()}</p>
                    Árbitro: {partidaOnLoad.arbitro}
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center" >
                    <h2>{partidaOnLoad.time_A}</h2>
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                    <h2>{partidaOnLoad.gols_time_A} X {partidaOnLoad.gols_time_B} </h2>
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                    <h2>{partidaOnLoad.time_B}</h2>
                </Grid>
            </Grid>
            <hr/>
            <Grid className={classes.root} container direction="row">
                <Grid direction="column" item xs={4} container alignItems="center">
                    {partidaOnLoad.jogador_time_A.map((jogador) => (
                        <div>
                            {jogador}
                            <br/>
                        </div>
                    ))}
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                    {partidaOnLoad.jogador_time_B.map((jogador) => (
                            <div>
                                {jogador}
                                <br/>
                            </div>
                        ))}
                </Grid>

            </Grid>
        
            
            </>
     );
 }
 
 export default VisualizarPartida;