import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const jogadoresAdapter = createEntityAdapter();

const initialState = jogadoresAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchJogadores = createAsyncThunk('jogadores/fetchJogadores', async () => {
    return await httpGet(`${baseUrl}/jogadores`);
});

export const deleteJogadorServer = createAsyncThunk('jogadores/deleteJogadorServer', async (idJogador) => {
    await httpDelete(`${baseUrl}/jogadores/${idJogador}`);
    return idJogador;
});

export const addJogadorServer = createAsyncThunk('jogadores/addJogadorServer', async (jogador) => {
    return await httpPost(`${baseUrl}/jogadores`, jogador);
});

export const updateJogadorServer = createAsyncThunk('jogadores/updateJogadorServer', async (jogador) => {
    return await httpPut(`${baseUrl}/jogadores/${jogador.id}`, jogador);
});

export const jogadoresSlice = createSlice({
    name: 'jogadores',
    initialState: initialState,
    extraReducers: {
       [fetchJogadores.pending]: (state, action) => {state.status = 'loading'},
       [fetchJogadores.fulfilled]: (state, action) => {state.status = 'loaded'; jogadoresAdapter.setAll(state, action.payload);},
       [fetchJogadores.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteJogadorServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteJogadorServer.fulfilled]: (state, action) => {state.status = 'deleted'; jogadoresAdapter.removeOne(state, action.payload);},
       [addJogadorServer.pending]: (state, action) => {state.status = 'loading'},
       [addJogadorServer.fulfilled]: (state, action) => {state.status = 'saved'; jogadoresAdapter.addOne(state, action.payload);},
       [updateJogadorServer.pending]: (state, action) => {state.status = 'loading'},
       [updateJogadorServer.fulfilled]: (state, action) => {state.status = 'saved'; jogadoresAdapter.upsertOne(state, action.payload);},
    },
})

export default jogadoresSlice.reducer

export const {
    selectAll: selectAllJogadores,
    selectById: selectJogadoresById,
    selectIds: selectJogadoresIds
} = jogadoresAdapter.getSelectors(state => state.jogadores)
