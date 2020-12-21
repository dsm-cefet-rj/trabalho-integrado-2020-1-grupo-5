import React from 'react';
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import jogadoresReducer, {deleteJogadorServer, fetchJogadores, addJogadorServer, updateJogadorServer, selectAllJogadores} from './JogadoresSlice'
import ListagemJogador from './ListagemJogador'


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
        store = configureStore({reducer: { jogadores: jogadoresReducer }});
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
              "name": "Jogador 5",
              "id": 5
            }
        ]));
        
        await store.dispatch(fetchJogadores());  
        okStateTest();
    })

    const okStateTest = () => {
  
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });

        expect(TabelaJogadores).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#jogadores')).toBeInTheDocument();
        expect(container.querySelector('#jogadores').innerHTML).toContain('Jogador');
        
        expect(fetchJogadores).toHaveBeenCalledTimes(0);
    }

});