import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addTimeServer, updateTimeServer, selectTimesById} from './TimesSlice'
import {timeSchema} from './TimeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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

export default function FormTime(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = parseInt(id);

    const timeFound = useSelector(state => selectTimesById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(timeSchema)
    });

    const [timeOnLoad] = useState(
        id ? timeFound ?? timeSchema.cast({}): timeSchema.cast({}));

    const [actionType, ] = useState(
        id  ? timeFound 
                ? 'times/updateTime'
                : 'times/addTime'
            : 'times/addTime');

    function onSubmit(time){
        if(actionType === 'times/addTime'){
            dispatch(addTimeServer(time));
        }else{
            dispatch(updateTimeServer({...time, id: timeFound.id}));
        }
        
        history.push('/times');
    }    

    return( <>
                <h1>{(timeOnLoad.id ?? 0) === 0 ? "Novo Time" : "Editar Time"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="nome_time" 
                        label="Nome" 
                        name="nome" 
                        defaultValue={timeOnLoad.nome} 
                        inputRef={register}
                        helperText={errors.nome?.message} 
                        error={errors.nome?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/><br/>
                    <Button type="submit" id="salva_time" name="salva_time" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_time" name="cancela_time" variant="contained" onClick={() => { history.push('/times') }}>Cancelar</Button>                    
                </form>
            </>
        );
}

export function VisualizarTime() {
    const classes = useStyles(); 
    let { id } = useParams();
    id = parseInt(id);
 
    const timeFound = useSelector(state => selectTimesById(state, id))

    const [timeOnLoad] = useState(
        id ? timeFound ?? timeSchema.cast({}): timeSchema.cast({}));

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome:</b> {timeOnLoad.nome} </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}