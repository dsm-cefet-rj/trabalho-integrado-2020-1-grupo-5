import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const partidasAdapter = createEntityAdapter();

const initialState = partidasAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchPartidas = createAsyncThunk('partidas/fetchPartidas', async () => {
    return await httpGet(`${baseUrl}/partidas`);
});

export const deletePartidaServer = createAsyncThunk('partidas/deletePartidaServer', async (idPartida) => {
    await httpDelete(`${baseUrl}/partidas/${idPartida}`);
    return idPartida;
});

export const addPartidaServer = createAsyncThunk('partidas/addPartidaServer', async (partida) => {
    return await httpPost(`${baseUrl}/partidas`, partida);
});

export const updatePartidaServer = createAsyncThunk('partidas/updatePartidaServer', async (partida) => {
    return await httpPut(`${baseUrl}/partidas/${partida.id}`, partida);
});

export const partidasSlice = createSlice({
    name: 'partidas',
    initialState: initialState,
    extraReducers: {
       [fetchPartidas.pending]: (state, action) => {state.status = 'loading'},
       [fetchPartidas.fulfilled]: (state, action) => {state.status = 'loaded'; partidasAdapter.setAll(state, action.payload);},
       [fetchPartidas.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deletePartidaServer.pending]: (state, action) => {state.status = 'loading'},
       [deletePartidaServer.fulfilled]: (state, action) => {state.status = 'deleted'; partidasAdapter.removeOne(state, action.payload);},
       [addPartidaServer.pending]: (state, action) => {state.status = 'loading'},
       [addPartidaServer.fulfilled]: (state, action) => {state.status = 'saved'; partidasAdapter.addOne(state, action.payload);},
       [updatePartidaServer.pending]: (state, action) => {state.status = 'loading'},
       [updatePartidaServer.fulfilled]: (state, action) => {state.status = 'saved'; partidasAdapter.upsertOne(state, action.payload);},
    },
})

export default partidasSlice.reducer

export const {
    selectAll: selectAllPartidas,
    selectById: selectPartidasById,
    selectIds: selectPartidasIds
} = partidasAdapter.getSelectors(state => state.partidas)
