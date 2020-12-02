import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {selectAdmsById} from './AdmsSlice'
import {admSchema} from './AdmSchema';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(5),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    form: {
      '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
      },
    },
  
  }));


export default function VisualizarAdm() {
    const classes = useStyles(); 
    let { id } = useParams();
    id = parseInt(id);
 
    const admFound = useSelector(state => selectAdmsById(state, id))

    const [admOnLoad] = useState(
        id ? admFound ?? admSchema.cast({}): admSchema.cast({}));

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome:</b> {admOnLoad.nome} </Paper>
                        <Paper className={classes.paper}><b>Usuário:</b> {admOnLoad.usuario} </Paper>
                        <Paper className={classes.paper}><b>Senha:</b> {admOnLoad.senha} </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}