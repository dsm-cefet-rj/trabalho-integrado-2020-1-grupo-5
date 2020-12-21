import React from 'react';
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import PartidasReducer, {deletePartidaServer, fetchPartidas, addPartidaServer, updatePartidaServer, selectAllPartidas} from './PartidasSlice'
import ListagemPartida from './ListagemPartida'


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
        store = configureStore({reducer: { Partidas: PartidasReducer }});
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
                "data": '30/06/2002',
                "arbitro": "Pierluigi Collina",
                "local": "Yokohama",
                "id_time_A": "Alemanha",
                "gols_time_A": 0,
                "id_time_B": "Brasil",
                "gols_time_B": 2
            }
        ]));
        
        await store.dispatch(fetchPartidas());  
        okStateTest();
    })

    const okStateTest = () => {
  
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });

        expect(TabelaPartidas).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('Partida');
        
        expect(fetchPartidas).toHaveBeenCalledTimes(0);
    }

});