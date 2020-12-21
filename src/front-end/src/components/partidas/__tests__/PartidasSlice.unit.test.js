import PartidasReducer, {deletePartidaServer, fetchPartidas, addPartidaServer, updatePartidaServer, selectAllPartidas} from './../PartidasSlice'
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'

jest.mock("./../../../utils", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

jest.useFakeTimers();

let store;

describe('PartidasSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { Partida: PartidasReducer }});
    });

    afterEach(() => {
        httpGet.mockClear();
        httpPost.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
        jest.clearAllTimers();
    });

    test('dispatch fetch fullfiled', async () => {
        httpGet.mockImplementation(() => Promise.resolve([
            { 
                "id": 1,
                "data": '08/07/2014',
                "arbitro": "Marco Rodriguez",
                "local": "Mineirão",
                "id_time_A": "Brasil",
                "gols_time_A": 1,
                "id_time_B": "Alemanha",
                "gols_time_B": 7
            }
        ]));
        
        await store.dispatch(fetchPartidas());
        expect(store.getState().partidas.status).toBe('loaded');
        expect(store.getState().partidas.entities['4']).toEqual(
            { 
                "id": 1,
                "data": '08/07/2014',
                "arbitro": "Marco Rodriguez",
                "local": "Mineirão",
                "id_time_A": "Brasil",
                "gols_time_A": 1,
                "id_time_B": "Alemanha",
                "gols_time_B": 7
            }
        );
    })

    test('dispatch fetch rejected', async () => {
        httpGet.mockImplementation(() => Promise.reject("err msg"));
        
        await store.dispatch(fetchPartidas());
        expect(store.getState().partidas.status).toBe('failed');
        expect(store.getState().partidas.error).toBe('err msg');
    })

    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchPartidas());
        jest.advanceTimersByTime(500);
        expect(store.getState().partidas.status).toBe('loading');
    })

    test('dispatch addPartida fullfiled', async () => {
        let partida = {
            "data": '08/07/2014',
            "arbitro": "Marco Rodriguez",
            "local": "Mineirão",
            "id_time_A": "Brasil",
            "gols_time_A": 1,
            "id_time_B": "Alemanha",
            "gols_time_B": 7
        };
        
        httpPost.mockImplementation(() => Promise.resolve(
            {...partida, id: 1}
        ));
        
        await store.dispatch(addPartidaServer(Partida));
        expect(store.getState().partidas.status).toBe('saved');
        expect(store.getState().partidas.entities['1']).toEqual(
            {...partida, id: 1}
        );
    })

    test('dispatch updatePartida fullfiled', async () => {
 
        let partida = {
            "data": '08/07/2014',
            "arbitro": "Marco Rodriguez",
            "local": "Mineirão",
            "id_time_A": "Brasil",
            "gols_time_A": 1,
            "id_time_B": "Alemanha",
            "gols_time_B": 7
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...partida, id: 1}
        ));        
        await store.dispatch(addPartidaServer(partida));
        
        let PartidaUpdated = {
            "data": '30/06/2002',
            "arbitro": "Pierluigi Collina",
            "local": "Yokohama",
            "id_time_A": "Alemanha",
            "gols_time_A": 0,
            "id_time_B": "Brasil",
            "gols_time_B": 2
        };
        httpPut.mockImplementation(() => Promise.resolve(PartidaUpdated));
        await store.dispatch(updatePartidaServer(PartidaUpdated));
        expect(store.getState().partidas.status).toBe('saved');
        expect(store.getState().partidas.entities['1']).toEqual(PartidaUpdated);
    })

    test('dispatch deletePartida fullfiled', async () => {

        let partida = {
            "data": '30/06/2002',
            "arbitro": "Pierluigi Collina",
            "local": "Yokohama",
            "id_time_A": "Alemanha",
            "gols_time_A": 0,
            "id_time_B": "Brasil",
            "gols_time_B": 2
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...partida, id: 1}
        ));        
        await store.dispatch(addPartidaServer(partida));
        
        httpPut.mockImplementation(() => Promise.resolve({...partida, id: 1}));
        await store.dispatch(deletePartidaServer(1));
        expect(store.getState().partidas.status).toBe('deleted');
        expect(store.getState().partidas.ids.length).toBe(0);
    })

    test('selectAll Partidas', async () => {

        let Partida = {
            "data": '30/06/2002',
            "arbitro": "Pierluigi Collina",
            "local": "Yokohama",
            "id_time_A": "Alemanha",
            "gols_time_A": 0,
            "id_time_B": "Brasil",
            "gols_time_B": 2
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...partida, id: 1}
        ));        
        await store.dispatch(addPartidaServer(partida));

        expect(selectAllPartidas(store.getState())).toEqual([{...partida, id: 1}])
    })
});
