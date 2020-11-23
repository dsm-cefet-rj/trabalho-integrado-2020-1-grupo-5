import React, {useState, useEffect} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addJogadorServer, updateJogadorServer, selectJogadoresById} from './JogadoresSlice'
import {jogadorSchema} from './JogadorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

export default function FormJogador(props) {
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Nome:
                        <input type="text" name="nome" defaultValue={jogadorOnLoad.nome} ref={register} />
                        &nbsp;<span>{errors.nome?.message}</span>
                    </label>
                    <br/>
                    <label>
                    Data de Nascimento:
                        <input type="text" name="data_nascimento" defaultValue={jogadorOnLoad.data_nascimento} ref={register} />
                        &nbsp;<span>{errors.data_nascimento?.message}</span>
                    </label>
                    <br/>
                    <Button type="submit" id="Salvar" name="btn_salvar_jogador" variant="contained" color="primary">Salvar</Button>
                </form>
            </>
        );
}

export function VisualizarJogador() {
    let { id } = useParams();
    id = parseInt(id);
 
    const jogadorFound = useSelector(state => selectJogadoresById(state, id))

    const [jogadorOnLoad] = useState(
        id ? jogadorFound ?? jogadorSchema.cast({}): jogadorSchema.cast({}));

    return( <>
                <tr>
                    <td>Nome:</td>
                    <td>{jogadorOnLoad.nome}</td>
                </tr>
                <br></br>
                <tr> 
                    <td>Data de Nascimento:</td>
                    <td>{jogadorOnLoad.data_nascimento}</td>
                </tr>
            </>
    );
}