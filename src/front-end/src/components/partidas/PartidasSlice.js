import {createSlice} from '@reduxjs/toolkit'

const initialPartidas  = 
    [ {id:1, data:'31/10/2020', arbitro:'José Filho', local: 'Maracanã', time_A:'Barcelona', gols_time_A:2, gols_time_B:2, time_B:'M. City', jogador_A:['Cristiano', 'Mbappé'], jogador_B:['Messi', 'Neymar'], gols_jogador_A:[1,1],gols_jogador_B:[2,0]},
    {id:2, data:'07/11/2020', arbitro:'José Filho', local: 'Maracanã', time_A:'Barcelona', gols_time_A:1, gols_time_B:0, time_B:'M. City', jogador_A:['Cristiano', 'Mbappé'], jogador_B:['Messi', 'Neymar'], gols_jogador_A:[1,0],gols_jogador_B:[0,0]},
    {id:3, data:'14/11/2020', arbitro:'José Filho', local: 'Maracanã', time_A:'Barcelona', gols_time_A:0, gols_time_B:1, time_B:'M. City', jogador_A:['Cristiano', 'Mbappé'], jogador_B:['Messi', 'Neymar'], gols_jogador_A:[0,0],gols_jogador_B:[1,0]}];

function addPartidaReducer(partidas, partida){
    let proxId = 1 + partidas.map(p => p.id).reduce((x, y) => Math.max(x,y));
    return partidas.concat([{...partida, id: proxId}]);
}

function deletePartidaReducer(partidas, id){
    return partidas.filter((p) => p.id !== id);
}

function updatePartidaReducer(partidas, partida){
    let index = partidas.map(p => p.id).indexOf(partida.id);
    partidas.splice(index, 1, partida);
    return partidas;
}    

export const partidasSlice = createSlice({
    name: 'partidas',
    initialState: initialPartidas,
    reducers: {
       addPartida:    (state, action) => addPartidaReducer(state, action.payload),
       updatePartida: (state, action) => updatePartidaReducer(state, action.payload),
       deletePartida: (state, action) => deletePartidaReducer(state, action.payload)
    }
})

export const { addPartida, updatePartida, deletePartida } = partidasSlice.actions
export default partidasSlice.reducer
