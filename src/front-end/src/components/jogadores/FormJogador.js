import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addJogadorServer, updateJogadorServer, selectJogadoresById} from './JogadoresSlice'
import {jogadorSchema} from './JogadorSchema';
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

export default function FormJogador(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = parseInt(id);

    const jogadorFound = useSelector(state => selectJogadoresById(state, id))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(jogadorSchema)
    });

    const [jogadorOnLoad] = useState(
        id ? jogadorFound ?? jogadorSchema.cast({}): jogadorSchema.cast({}));

    const [actionType, ] = useState(
        id  ? jogadorFound 
                ? 'jogadores/updateJogador'
                : 'jogadores/addJogador'
            : 'jogadores/addJogador');

    function onSubmit(jogador){
        if(actionType === 'jogadores/addJogador'){
            dispatch(addJogadorServer(jogador));
        }else{
            dispatch(updateJogadorServer({...jogador, id: jogadorFound.id}));
        }
        
        history.push('/jogadores');
    }    

    return( <>
                <h1>{(jogadorOnLoad.id ?? 0) === 0 ? "Novo Jogador" : "Editar Jogador"}</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="nome_jogador" 
                        label="Nome" 
                        name="nome" 
                        defaultValue={jogadorOnLoad.nome} 
                        inputRef={register}
                        helperText={errors.nome?.message} 
                        error={errors.nome?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br/>
                    {(jogadorOnLoad.id ?? 0) === 0 ? 
                    <TextField
                        id="data_nascimento_jogador"
                        type="date"
                        label="Data de nascimento" 
                        name="data_nascimento"
                        defaultValue= {jogadorOnLoad.data_nascimento}
                        inputRef={register}
                        helperText={errors.data_nascimento?.message} 
                        error={errors.data_nascimento?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                    />
                    :   
                    <TextField
                        id="data_nascimento_jogador"
                        type="date"
                        label="Data de nascimento" 
                        name="data_nascimento"
                        defaultValue= {jogadorOnLoad.data_nascimento.substring(0,10)}
                        inputRef={register}
                        helperText={errors.data_nascimento?.message} 
                        error={errors.data_nascimento?.message ? true: false} 
                        InputLabelProps={{ shrink: true }}
                    />      
                    }
                    <br/><br/>
                    <Button type="submit" id="salva_jogador" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                    <Button type="submit" id="cancela_jogador" name="cancela_jogador" variant="contained" onClick={() => { history.push('/jogadores') }}>Cancelar</Button>                    
                </form>
            </>
        );
}

export function VisualizarJogador() {
    const classes = useStyles(); 
    let { id } = useParams();
    id = parseInt(id);
 
    const jogadorFound = useSelector(state => selectJogadoresById(state, id))

    const [jogadorOnLoad] = useState(
        id ? jogadorFound ?? jogadorSchema.cast({}): jogadorSchema.cast({}));

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><b>Nome:</b> {jogadorOnLoad.nome} </Paper>
                        <Paper className={classes.paper}><b>Data de Nascimento:</b> {jogadorOnLoad.data_nascimento.substring(0,10)} </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}