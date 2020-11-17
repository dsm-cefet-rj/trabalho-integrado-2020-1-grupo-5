import React, {useState} from 'react';

export default function FormPartida(props) {
    
    //inicializa o estado com o hook useState
    const [partida, setPartida] = useState({});

    //Atualiza o estado usando o setPartida
    function handleInputChange(e) {
        setPartida( {...partida, [e.target.name]: e.target.value});
    }
    
    function handleSubmit(e){
        e.preventDefault();
        props.setPartidas(props.partidas.concat(partida))
    }

    return( <>
                <h1>Nova Partida</h1>
                <form onSubmit={handleSubmit}>
                    <label>Data:</label> <input type="date" name="data" value={partida.data} onChange={handleInputChange} />
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