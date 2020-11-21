import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchPartidas = createAsyncThunk('projetos/fetchPartidas', 
    async () => {
        return await (await fetch('http://localhost:3004/partidas')).json();
});

const initialState = {
    status: 'not_loaded',
    partidas: [],
    error: null
};

function addPartidaReducer(state, partida){
    let proxId = 1 + state.partidas.map(p => p.id).reduce((x, y) => Math.max(x,y));
    state.partidas = state.partidas.concat([{...partida, id: proxId}]);
}

function deletePartidaReducer(state, id){
    state.partidas = state.partidas.filter((p) => p.id !== id);
}

function updatePartidaReducer(state, partida){
    let index = state.partidas.map(p => p.id).indexOf(partida.id);
    state.partidas.splice(index, 1, partida);
}    

function fullfillPartidasReducer(partidasState, partidasFetched){
    partidasState.status = 'loaded';
    partidasState.partidas = partidasFetched;
}

export const partidasSlice = createSlice({
    name: 'partidas',
    initialState: initialState,
    reducers: {
       addPartida:    (state, action) => addPartidaReducer(state, action.payload),
       updatePartida: (state, action) => updatePartidaReducer(state, action.payload),
       deletePartida: (state, action) => deletePartidaReducer(state, action.payload)
    },
    extraReducers: {
       [fetchPartidas.pending]: (state, action) => {state.status = 'loading'},
       [fetchPartidas.fulfilled]: (state, action) => fullfillPartidasReducer(state, action.payload),
       [fetchPartidas.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message}
    },
})

export const { addPartida, updatePartida, deletePartida } = partidasSlice.actions
export default partidasSlice.reducer
