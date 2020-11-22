import React, {useState, useEffect} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addJogador, updateJogador} from './JogadoresSlice'

export default function FormJogador(props) {
    
    //inicializa o estado com o hook useState
    const jogadores = useSelector(state => state.jogadores.jogadores) 
    const history  = useHistory();
    const dispatch = useDispatch();

    let { id } = useParams();
    id = parseInt(id);

    const [jogador, setJogador] = useState(
        id ? jogadores.filter((p) => p.id === id)[0] ?? {} : {});

    const [actionType, ] = useState(
        id  ? jogadores.filter((p) => p.id === id)[0] 
                ? 'jogadores/updateJogador'
                : 'jogadores/addJogador'
            : 'jogadores/addJogador');

    //Atualiza o estado usando o setJogador
    function handleInputChange(e) {
        setJogador( {...jogador, [e.target.name]: e.target.value});
    }
    

    function handleSubmit(e){
        e.preventDefault();
        if(actionType === 'jogadores/addJogador'){
            dispatch(addJogador(jogador));
        }else{
            dispatch(updateJogador(jogador));
        }
        history.push('/jogadores');
    }

    return( <>
                <h1>{(jogador.id ?? 0) === 0 ? "Novo Jogador" : "Editar Jogador"}</h1>

                <form onSubmit={handleSubmit}>
                    <label>Nome:</label><br/> 
                    <input type="text" name="nome" value={jogador.nome} onChange={handleInputChange} />
                    <br></br><br></br>
                    <label>Data de Nascimento:</label><br/> 
                    <input type="text" name="data_nascimento" value={jogador.data_nascimento} onChange={handleInputChange} />
                    <br></br>
                    <br></br>
                    <input type="submit" value="Salvar" />
                </form>
            </>
        );
}