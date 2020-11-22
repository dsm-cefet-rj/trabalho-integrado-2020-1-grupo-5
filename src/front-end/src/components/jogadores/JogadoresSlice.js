import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchJogadores = createAsyncThunk('projetos/fetchJogadores', 
    async () => {
        return await (await fetch('http://localhost:3004/jogadores')).json();
});

const initialState = {
    status: 'not_loaded',
    jogadores: [],
    error: null
};

function addJogadorReducer(state, jogador){
    let proxId = 1 + state.jogadores.map(p => p.id).reduce((x, y) => Math.max(x,y));
    state.jogadores = state.jogadores.concat([{...jogador, id: proxId}]);
}

function deleteJogadorReducer(state, id){
    state.jogadores = state.jogadores.filter((p) => p.id !== id);
}

function updateJogadorReducer(state, jogador){
    let index = state.jogadores.map(p => p.id).indexOf(jogador.id);
    state.jogadores.splice(index, 1, jogador);
}    

function fullfillJogadoresReducer(jogadoresState, jogadoresFetched){
    jogadoresState.status = 'loaded';
    jogadoresState.jogadores = jogadoresFetched;
}

export const jogadoresSlice = createSlice({
    name: 'jogadores',
    initialState: initialState,
    reducers: {
       addJogador:    (state, action) => addJogadorReducer(state, action.payload),
       updateJogador: (state, action) => updateJogadorReducer(state, action.payload),
       deleteJogador: (state, action) => deleteJogadorReducer(state, action.payload)
    },
    extraReducers: {
       [fetchJogadores.pending]: (state, action) => {state.status = 'loading'},
       [fetchJogadores.fulfilled]: (state, action) => fullfillJogadoresReducer(state, action.payload),
       [fetchJogadores.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message}
    },
})

export const { addJogador, updateJogador, deleteJogador } = jogadoresSlice.actions
export default jogadoresSlice.reducer
