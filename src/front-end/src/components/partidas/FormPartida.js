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
                    <input type="submit" value="Salvar" />
                </form>
            </>
        );
}