import React, {useState, useEffect} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addPartida, updatePartida} from './PartidasSlice'

export default function FormPartida(props) {
    
    //inicializa o estado com o hook useState
    const partidas = useSelector(state => state.partidas) 
    const history  = useHistory();
    const dispatch = useDispatch();

    let { id } = useParams();
    id = parseInt(id);

    const [partida, setPartida] = useState(
        id ? partidas.filter((p) => p.id === id)[0] ?? {} : {});

    const [actionType, ] = useState(
        id  ? partidas.filter((p) => p.id === id)[0] 
                ? 'partidas/updatePartida'
                : 'partidas/addPartida'
            : 'partidas/addPartida');

    //Atualiza o estado usando o setPartida
    function handleInputChange(e) {
        setPartida( {...partida, [e.target.name]: e.target.value});
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(actionType === 'partidas/addPartida'){
            dispatch(addPartida(partida));
        }else{
            dispatch(updatePartida(partida));
        }
        history.push('/partidas');
    }

    return( <>
                <h1>Nova Partida</h1>
                <form onSubmit={handleSubmit}>
                    <label>Data:</label> <input type="text" name="data" value={partida.data} onChange={handleInputChange} />
                    <br></br>
                    <br></br>
                    <label>Árbitro:</label> <input type="text" name="arbitro_partida" maxlength="50" size="15" value={partida.arbitro} onChange={handleInputChange} />
                    &nbsp;
                    <label>Local:</label> <input type="text" name="local_partida" maxlength="50" size="15" value={partida.local} onChange={handleInputChange} />
                    <br></br>
                    <br></br>
                    <label>Time A:</label> <input type="text" name="time_A" maxlength="50" size="15" value={partida.time_A} onChange={handleInputChange} />
                    &nbsp;
                    <label>Gols</label> <input type="number" name="gols_time_A" min="0" max="99" value={partida.gols_time_A} onChange={handleInputChange} />
                    &nbsp;
                    X
                    &nbsp;
                    <label>Gols</label> <input type="number" name="gols_time_B" min="0" max="99" value={partida.gols_time_B} onChange={handleInputChange} />
                    &nbsp;
                    <label>Time B:</label> <input type="text" name="time_B" maxlength="50" size="15" value={partida.time_B} onChange={handleInputChange} />
                    &nbsp;
                    <br/><br/>
                    <hr></hr>
                    <label>Jogador:</label> <input type="text" name="jogador_A" maxlength="50" size="15" value={partida.jogador_A} onChange={handleInputChange} />
                    &nbsp;
                    <label>Gols</label> <input type="number" name="gols_jogador_A" min="0" max="99" value={partida.gols_jogador_A} onChange={handleInputChange} />
                    &nbsp;
                    <label>Jogador:</label> <input type="text" name="jogador_B" maxlength="50" size="15" value={partida.jogador_B} onChange={handleInputChange} />
                    &nbsp;
                    <label>Gols</label> <input type="number" name="gols_jogador_B" min="0" max="99" value={partida.gols_jogador_B} onChange={handleInputChange} />
                    <br></br>
                    <br></br>
                    <input type="submit" value="Salvar" />
                </form>
            </>
        );
}