import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const admsAdapter = createEntityAdapter();

const initialState = admsAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchAdms = createAsyncThunk('adms/fetchAdms', async () => {
    return await httpGet(`${baseUrl}/adms`);
});

export const deleteAdmServer = createAsyncThunk('adms/deleteAdmServer', async (idAdm) => {
    await httpDelete(`${baseUrl}/adms/${idAdm}`);
    return idAdm;
});

export const addAdmServer = createAsyncThunk('adms/addAdmServer', async (adm) => {
    return await httpPost(`${baseUrl}/adms`, adm);
});

export const updateAdmServer = createAsyncThunk('adms/updateAdmServer', async (adm) => {
    return await httpPut(`${baseUrl}/adms/${adm.id}`, adm);
});

export const admsSlice = createSlice({
    name: 'adms',
    initialState: initialState,
    extraReducers: {
       [fetchAdms.pending]: (state, action) => {state.status = 'loading'},
       [fetchAdms.fulfilled]: (state, action) => {state.status = 'loaded'; admsAdapter.setAll(state, action.payload);},
       [fetchAdms.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteAdmServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteAdmServer.fulfilled]: (state, action) => {state.status = 'deleted'; admsAdapter.removeOne(state, action.payload);},
       [addAdmServer.pending]: (state, action) => {state.status = 'loading'},
       [addAdmServer.fulfilled]: (state, action) => {state.status = 'saved'; admsAdapter.addOne(state, action.payload);},
       [updateAdmServer.pending]: (state, action) => {state.status = 'loading'},
       [updateAdmServer.fulfilled]: (state, action) => {state.status = 'saved'; admsAdapter.upsertOne(state, action.payload);},
    },
})

export default admsSlice.reducer

export const {
    selectAll: selectAllAdms,
    selectById: selectAdmsById,
    selectIds: selectAdmsIds
} = admsAdapter.getSelectors(state => state.adms)
