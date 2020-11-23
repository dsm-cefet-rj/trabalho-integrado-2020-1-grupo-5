import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addPartidaServer, updatePartidaServer, selectPartidasById} from './PartidasSlice'
import {partidaSchema} from './PartidaSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

export default function FormPartida(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Data:
                        <input type="text" name="data" defaultValue={partidaOnLoad.data} ref={register} />
                        &nbsp;<span>{errors.data?.message}</span>
                    </label>
                    <br/> 
                    <label>
                        Árbitro:
                        <input type="text" name="arbitro" defaultValue={partidaOnLoad.arbitro} ref={register} />
                        &nbsp;<span>{errors.arbitro?.message}</span>
                    </label>
                    <br/> 
                    <label>
                        Local:
                        <input type="text" name="local" defaultValue={partidaOnLoad.local} ref={register} />
                        &nbsp;<span>{errors.local?.message}</span>
                    </label>
                    <br/> 

                    <label>
                        <input type="text" name="time_A" defaultValue={partidaOnLoad.time_A} ref={register} />
                        &nbsp;<span>{errors.time_A?.message}</span>
                    </label>
                    <label>
                        <input type="number" name="gols_time_A" defaultValue={partidaOnLoad.gols_time_A} ref={register} />
                        &nbsp;<span>{errors.gols_time_A?.message}</span>
                    </label>
                    &nbsp;
                    X
                    &nbsp;
                    <label>
                        <input type="number" name="gols_time_B" defaultValue={partidaOnLoad.gols_time_B} ref={register} />
                        &nbsp;<span>{errors.gols_time_B?.message}</span>
                    </label>
                    &nbsp;
                    <label>
                        <input type="text" name="time_B" defaultValue={partidaOnLoad.time_B} ref={register} />
                        &nbsp;<span>{errors.time_B?.message}</span>
                    </label>
                    <br/> 

                    <hr></hr>
                    <div>
                        <input classname="adiciona_jogador_A" type="button" name="adiciona_jogador_A" value="+A"/>
                        <input classname="adiciona_jogador_B" type="button" name="adiciona_jogador_B" value="+B" />
                    </div>
                    <br></br>
    
                    <label>
                        Jogador_A
                        <input type="text" name="jogador_A" defaultValue={partidaOnLoad.jogador_A} ref={register} />
                        &nbsp;<span>{errors.jogador_A?.message}</span>
                    </label>
                    &nbsp;
                    <label>
                        Gols
                        <input type="number" name="gols_jogador_A" defaultValue={partidaOnLoad.gols_jogador_A} ref={register} />
                        &nbsp;<span>{errors.gols_jogador_A?.message}</span>
                    </label>
                    <br/> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        Jogador_B
                        <input type="text" name="jogador_B" defaultValue={partidaOnLoad.jogador_B} ref={register} />
                        &nbsp;<span>{errors.jogador_B?.message}</span>
                    </label>
                    &nbsp;
                    <label>
                        Gols
                        <input type="number" name="gols_jogador_B" defaultValue={partidaOnLoad.gols_jogador_B} ref={register} />
                        &nbsp;<span>{errors.v?.message}</span>
                    </label>
                    <br/> 
                    <br></br><br></br>
                    <Button type="submit" id="Salvar" name="btn_salvar_partida" variant="contained" color="primary">Salvar</Button>
                </form>
            </>
        );
}

export function VisualizarPartida() {
    let { id } = useParams();
    id = parseInt(id);

    const partidaFound = useSelector(state => selectPartidasById(state, id))

    const [partidaOnLoad] = useState(
        id ? partidaFound ?? partidaSchema.cast({}): partidaSchema.cast({}));
 
     return( <>
                 <tr>
                     <td>Data:</td>
                     <td>{partidaOnLoad.data}</td>
                 </tr>
                 <br></br>
                 <tr> 
                     <td>Árbitro:</td>
                     <td>{partidaOnLoad.arbitro}</td>
                 </tr>
             </>
     );
 }