import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const timesAdapter = createEntityAdapter();

const initialState = timesAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchTimes = createAsyncThunk('times/fetchTimes', async () => {
    return await httpGet(`${baseUrl}/times`);
});

export const deleteTimeServer = createAsyncThunk('times/deleteTimeServer', async (idTime) => {
    await httpDelete(`${baseUrl}/times/${idTime}`);
    return idTime;
});

export const addTimeServer = createAsyncThunk('times/addTimeServer', async (time) => {
    return await httpPost(`${baseUrl}/times`, time);
});

export const updateTimeServer = createAsyncThunk('times/updateTimeServer', async (time) => {
    return await httpPut(`${baseUrl}/times/${time.id}`, time);
});

export const timesSlice = createSlice({
    name: 'times',
    initialState: initialState,
    extraReducers: {
       [fetchTimes.pending]: (state, action) => {state.status = 'loading'},
       [fetchTimes.fulfilled]: (state, action) => {state.status = 'loaded'; timesAdapter.setAll(state, action.payload);},
       [fetchTimes.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteTimeServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteTimeServer.fulfilled]: (state, action) => {state.status = 'deleted'; timesAdapter.removeOne(state, action.payload);},
       [addTimeServer.pending]: (state, action) => {state.status = 'loading'},
       [addTimeServer.fulfilled]: (state, action) => {state.status = 'saved'; timesAdapter.addOne(state, action.payload);},
       [updateTimeServer.pending]: (state, action) => {state.status = 'loading'},
       [updateTimeServer.fulfilled]: (state, action) => {state.status = 'saved'; timesAdapter.upsertOne(state, action.payload);},
    },
})

export default timesSlice.reducer

export const {
    selectAll: selectAllTimes,
    selectById: selectTimesById,
    selectIds: selectTimesIds
} = timesAdapter.getSelectors(state => state.times)
