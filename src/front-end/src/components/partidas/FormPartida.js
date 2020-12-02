import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import {addPartidaServer, updatePartidaServer, selectPartidasById} from './PartidasSlice'
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

  
export default function FormPartida(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = parseInt(id);

    const partidaFound = useSelector(state => selectPartidasById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(partidaSchema)
    });

    const [partidaOnLoad] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));

    const [actionType, ] = useState(
        id  ? partidaFound
                ? 'partidas/updatePartida'
                : 'partidas/addPartida'
            : 'partidas/addPartida');

    function onSubmit(partida){
        if(actionType === 'partidas/addPartida'){
            dispatch(addPartidaServer(partida));
        }else{
            dispatch(updatePartidaServer({...partida, id: partidaFound.id}));
        }
        
        history.push('/partidas');
    }                

    return( <>
                <h1>{(partidaOnLoad.id ?? 0) === 0 ? "Nova Partida" : "Editar Partida"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate autoComplete="off" >
                    <TextField 
                        id="data_partida" 
                        label="Data" 
                        name="data"
                        type="date"
                        defaultValue={partidaOnLoad.data} 
                        inputRef={register}
                        helperText={errors.data?.message} 
                        error={errors.data?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <br/>
                    <TextField
                        id="arbitro_partida"
                        label="Árbitro" 
                        name="arbitro"
                        defaultValue={partidaOnLoad.data_arbitro} 
                        inputRef={register}
                        helperText={errors.arbitro?.message} 
                        error={errors.arbitro?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                    />
                    <br/>
                    <TextField
                        id="local_partida"
                        label="Local" 
                        name="local"
                        defaultValue={partidaOnLoad.local} 
                        inputRef={register}
                        helperText={errors.local?.message} 
                        error={errors.local?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                    />
                    <br/>
                    <TextField
                        id="time_A"
                        label="Time_A" 
                        name="time_A"
                        
                        defaultValue={partidaOnLoad.time_A} 
                        inputRef={register}
                        helperText={errors.time_A?.message} 
                        error={errors.time_A?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                    />
                    <TextField
                        id="gols_time_A"
                        label="Gols" 
                        name="gols_time_A"
                        type="number"
                        size="small"
                        defaultValue={partidaOnLoad.gols_time_A} 
                        inputRef={register}
                        helperText={errors.gols_time_A?.message} 
                        error={errors.gols_time_A?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 30}}
                    />
                    <TextField
                        id="time_B"
                        label="Time_B" 
                        name="time_B"
                        
                        defaultValue={partidaOnLoad.time_B} 
                        inputRef={register}
                        helperText={errors.time_B?.message} 
                        error={errors.time_B?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                    /> 
                    <TextField
                        id="gols_time_B"
                        label="Gols" 
                        name="gols_time_B"
                        type="number"
                        defaultValue={partidaOnLoad.gols_time_B} 
                        inputRef={register}
                        helperText={errors.gols_time_B?.message} 
                        error={errors.gols_time_B?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 30}}
                    />
                    <IconButton id="adiciona_jogador_A" name="adiciona_jogador_A"><AddCircleIcon color='primary'/></IconButton>
                    <IconButton id="adiciona_jogador_B" name="adiciona_jogador_B"><AddCircleIcon color='primary'/></IconButton>               
                    <br/><br/>
                    <Button type="submit" id="salva_partida" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_partida" name="cancela_partida" variant="contained" onClick={() => { history.push('/partidas') }}>Cancelar</Button>
                </form>
            </>
        );
}