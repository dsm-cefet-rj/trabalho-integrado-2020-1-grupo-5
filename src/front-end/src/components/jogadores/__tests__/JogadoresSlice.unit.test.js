import jogadoresReducer, {deleteJogadorServer, fetchJogadores, addJogadorServer, updateJogadorServer, selectAllJogadores} from './../JogadoresSlice'
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'

// Mocking utils
jest.mock("./../../../utils", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

jest.useFakeTimers();

let store;

describe('JogadoresSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { jogador: jogadoresReducer }});
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
              "name": "Diogo Mendonça",
              "id": 4
            }
        ]));
        
        await store.dispatch(fetchJogadores());
        expect(store.getState().jogadores.status).toBe('loaded');
        expect(store.getState().jogadores.entities['4']).toEqual(
            {
              "nome": "Diogo Mendonça",
              "id": 4            
            }
        );
    })

    test('dispatch fetch rejected', async () => {
        httpGet.mockImplementation(() => Promise.reject("err msg"));
        
        await store.dispatch(fetchJogadores());
        expect(store.getState().jogadores.status).toBe('failed');
        expect(store.getState().jogadores.error).toBe('err msg');
    })

    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchJogadores());
        jest.advanceTimersByTime(500);
        expect(store.getState().jogadores.status).toBe('loading');
    })

    test('dispatch addJogador fullfiled', async () => {
        let jogador = {
            "nome": "Diogo Mendonça"
        };
        
        httpPost.mockImplementation(() => Promise.resolve(
            {...jogador, id: 1}
        ));
        
        await store.dispatch(addJogadorServer(jogador));
        expect(store.getState().jogadores.status).toBe('saved');
        expect(store.getState().jogadores.entities['1']).toEqual(
            {...jogador, id: 1}
        );
    })

    test('dispatch updateJogador fullfiled', async () => {
 
        let jogador = {
            "name": "Diogo Mendonça",
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...jogador, id: 1}
        ));        
        await store.dispatch(addJogadorServer(jogador));
        
        let jogadorUpdated = {
            "name": "Diego Maradona",
            "id": 1
        };
        httpPut.mockImplementation(() => Promise.resolve(jogadorUpdated));
        await store.dispatch(updateProjetoServer(jogadorUpdated));
        expect(store.getState().jogadores.status).toBe('saved');
        expect(store.getState().jogadores.entities['1']).toEqual(jogadorUpdated);
    })

    test('dispatch deleteJogador fullfiled', async () => {

        let jogador = {
            "nome": "Diogo Mendonça"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...jogador, id: 1}
        ));        
        await store.dispatch(addProjetoServer(jogador));
        
        httpPut.mockImplementation(() => Promise.resolve({...jogador, id: 1}));
        await store.dispatch(deleteJogadorServer(1));
        expect(store.getState().jogadores.status).toBe('deleted');
        expect(store.getState().jogadores.ids.length).toBe(0);
    })

    test('selectAll jogadores', async () => {

        let jogador = {
            "nome": "Diogo Mendonça"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...jogador, id: 1}
        ));        
        await store.dispatch(addJogadorServer(jogador));

        expect(selectAllJogadores(store.getState())).toEqual([{...jogador, id: 1}])
    })
});