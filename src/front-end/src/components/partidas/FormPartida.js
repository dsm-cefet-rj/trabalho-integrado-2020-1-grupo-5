import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from "react-hook-form";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import {addPartidaServer, updatePartidaServer, selectPartidasById} from './PartidasSlice'
import {partidaSchema} from './PartidaSchema';
import {selectAllJogadores, fetchJogadores} from '../jogadores/JogadoresSlice'
import {selectAllTimes, fetchTimes} from '../times/TimesSlice'


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
      },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      formControl: {
        margin: theme.spacing(2),
      },
  }));

 
/**
 * @module partidas/FormPartida
 */

 /**
 * @typedef Partida
 * @type {object}
 * @property {string} id - identificador.
 * @property {date} data - data da partida.
 * @property {string} arbitro - árbitro da partida.
 * @property {string} local - local da partida.
 * @property {string} time_A - nome do time A da partida.
 * @property {number} gols_time_A - quantidade de gols do time A da partida.
 * @property {string} time_B - nome do time B da partida.
 * @property {number} gols_time_B - quantidade de gols do time B da partida.
 * @property {string[]} jogador_time_A - jogadores do time A da partida.
 * @property {string[]} jogador_time_B - jogadores do time B da partida.

/**
 * Renderiza a tela com os campos para inclusão de uma nova partida ou a alteração dos dados da partida selecionada na lista. 
 */

 function FormPartida() {
    let { id } = useParams();

    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes  = useStyles(); 
    
    const jogadores = useSelector(selectAllJogadores);
    const times     = useSelector(selectAllTimes);

    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(partidaSchema),
    });

    const partidaFound = useSelector(state => selectPartidasById(state, id))

    const [partidaOnLoad, ] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));


    const [actionType, ] = useState(
        id  ? partidaFound
                ? 'partidas/updatePartida'
                : 'partidas/addPartida'
            : 'partidas/addPartida');
   
    useEffect(() => {
        dispatch(fetchJogadores(jogadores))
        dispatch(fetchTimes(times))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   
    function onSubmit(partida){
        if(actionType === 'partidas/addPartida'){
            dispatch(addPartidaServer(partida));
        }else{
            dispatch(updatePartidaServer({...partida, id: partidaFound.id}));
        }
        history.push('/partidas');
    }                

    return( <>
                <h1>{partidaOnLoad.id == null ? "Nova Partida" : "Editar Partida"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate autoComplete="off" >
                    <TextField 
                        className={classes.formControl}
                        id="data_partida" 
                        label="Data" 
                        name="data"
                        type="date"
                        defaultValue={partidaOnLoad.id == null ? partidaOnLoad.data : partidaOnLoad.data.substring(0,10)} 
                        inputRef={register}
                        helperText={errors.data?.message} 
                        error={errors.data?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                        required
                        size="small"
                    />
                    <br/>
                    <TextField
                        className={classes.formControl}
                        id="arbitro_partida"
                        label="Árbitro" 
                        name="arbitro"
                        defaultValue={partidaOnLoad.arbitro} 
                        inputRef={register}
                        helperText={errors.arbitro?.message} 
                        error={errors.arbitro?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                        size="small"
                        required
                    />
                    
                    <TextField
                        className={classes.formControl}
                        id="local_partida"
                        label="Local" 
                        name="local"
                        defaultValue={partidaOnLoad.local} 
                        inputRef={register}
                        helperText={errors.local?.message} 
                        error={errors.local?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                        style = {{width: 150}}
                        size="small"
                        required
                    />                    
                    
                    <Grid container>
                        <Grid container item xs={6} >
                            <Grid> 
                                <FormControl 
                                        className={classes.formControl}
                                        error={Boolean(errors.time_A)}>
                                    <InputLabel>Time A</InputLabel>
                                    <Controller
                                    as={
                                        <Select>
                                            {times.map((option) => (
                                                <MenuItem key={option.id} value={option.nome}>
                                                    {option.nome}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    }
                                    style = {{width: 100}}
                                    name="time_A" 
                                    control={control}
                                    defaultValue={partidaOnLoad.id == null ? '' : partidaOnLoad.time_A}
                                    />
                                    <FormHelperText>
                                    {errors.time_A?.message}
                                    </FormHelperText>
                                </FormControl>      
                                <TextField
                                    className={classes.formControl}
                                    id="gols_time_A"
                                    label="Gols" 
                                    name="gols_time_A"
                                    type="number"
                                    size="small"
                                    defaultValue={partidaOnLoad.id == null ? 0 : partidaOnLoad.gols_time_A} 
                                    inputRef={register}
                                    InputProps={{
                                        inputProps: { 
                                            max: 99, min: 0
                                        }
                                    }}
                                    helperText={errors.gols_time_A?.message} 
                                    error={errors.gols_time_A?.message ? true: false} 
                                    //InputLabelProps={{ shrink: true }}
                                    style = {{width: 45}}
                                />
                            </Grid>
                           
                            <Grid container>
                                <FormControl 
                                    className={classes.formControl}
                                    error={Boolean(errors.jogador_time_A)}
                                >
                                    {/*<InputLabel>Jogadores</InputLabel>*/}
                                    <br/>
                                    <Controller
                                        control={control}
                                        name="jogador_time_A"
                                        defaultValue={partidaOnLoad.id == null ? [] : partidaOnLoad.jogador_time_A}
                                        render={({ onChange, value }) => {
                                            return (
                                                <TextField
                                                    //classes={classes.formControl}
                                                    select
                                                    label="Jogadores A"
                                                    style = {{width: 150}}
                                                    //InputLabelProps={{ shrink: true }}
                                                    SelectProps={{
                                                        multiple: true,
                                                        value: value,
                                                        renderValue: (selected) => 
                                                            <div className={classes.chips}>
                                                                {selected.map((value) => (
                                                                    <Chip key={value} label={value} className={classes.chip} />))}
                                                            </div>,
                                                        onChange: onChange
                                                    }}
                                                >
                                                    {jogadores.map((jogador) => (
                                                        <MenuItem key={jogador.id} value={jogador.nome}>
                                                            <Checkbox checked={value.includes(jogador.nome)} />
                                                            <ListItemText primary={jogador.nome} />
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            );
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container item xs={6}>
                            <Grid >
                            <FormControl 
                                        className={classes.formControl}
                                        error={Boolean(errors.time_B)}>
                                    <InputLabel>Time B</InputLabel>
                                    <Controller
                                    as={
                                        <Select  >
                                            {times.map((option) => (
                                                <MenuItem key={option.id} value={option.nome}>
                                                    {option.nome}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    }
                                    style = {{width: 100}}
                                    //InputLabelProps={{ shrink: true }}
                                    name="time_B" 
                                    control={control}
                                    defaultValue={partidaOnLoad.id == null ? '' : partidaOnLoad.time_B}
                                    />
                                    <FormHelperText>
                                    {errors.time_B?.message}
                                    </FormHelperText>
                                </FormControl>

                                <TextField
                                    className={classes.formControl}
                                    id="gols_time_B"
                                    label="Gols" 
                                    name="gols_time_B"
                                    type="number"
                                    size="small"
                                    defaultValue={partidaOnLoad.id == null ? 0 : partidaOnLoad.gols_time_B} 
                                    inputRef={register}
                                    InputProps={{
                                        inputProps: { 
                                            max: 99, min: 0
                                        }
                                    }}
                                    helperText={errors.gols_time_B?.message} 
                                    error={errors.gols_time_B?.message ? true: false} 
                                    InputLabelProps={{ shrink: true }}
                                    style = {{width: 45}}
                                />
                            </Grid>
                            
                            <Grid container >
                                    <FormControl 
                                        className={classes.formControl}
                                        error={Boolean(errors.jogador_time_B)}
                                    >
                                        {/*<InputLabel>Jogadores</InputLabel>*/}
                                        <br/>
                                        <Controller
                                            control={control}
                                            name="jogador_time_B"
                                            defaultValue={partidaOnLoad.id == null ? [] : partidaOnLoad.jogador_time_B}
                                            render={({ onChange, value }) => {
                                                return (
                                                    <TextField
                                                        //classes={classes.formControl}
                                                        select
                                                        label="Jogadores B"
                                                        style = {{width: 150}}
                                                        //InputLabelProps={{ shrink: true }}
                                                        SelectProps={{
                                                            multiple: true,
                                                            value: value,
                                                            renderValue: (selected) => 
                                                                <div className={classes.chips}>
                                                                    {selected.map((value) => (
                                                                        <Chip key={value} label={value} className={classes.chip} />))}
                                                                </div>,
                                                            onChange: onChange
                                                        }}
                                                    >
                                                        {jogadores.map((jogador) => (
                                                            <MenuItem key={jogador.id} value={jogador.nome}>
                                                                <Checkbox checked={value.includes(jogador.nome)} />
                                                                <ListItemText primary={jogador.nome} />
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                );
                                            }}
                                        />
                                    </FormControl>    
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button type="submit" id="salva_partida" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_partida" name="cancela_partida" variant="contained" onClick={() => { history.push('/partidas') }}>Cancelar</Button>
                </form>
            </>
        );
}

export default FormPartida