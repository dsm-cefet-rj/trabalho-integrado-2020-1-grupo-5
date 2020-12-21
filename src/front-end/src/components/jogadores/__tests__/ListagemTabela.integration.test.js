import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import {deleteJogadorServer, fetchJogadores} from './../JogadoresSlice'

import ListagemJogador from './../ListagemJogador'
import TabelaJogadores from './../TabelaJogadores'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

const mockAppState = {
    jogadores: {
        status: 'not_loaded',
        error: null,
        jogadores: []
    }
}

jest.mock("./../JogadoresSlice", () => ({
    selectAllJogadores: jest.fn(() => mockAppState.jogadores.jogadores),
    deleteJogadoresServer: jest.fn(),
    fetchJogadores: jest.fn()
}));

jest.useFakeTimers()

describe("ListagemJogador integration TabelaJogadores - tabela vazia", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });
    
    afterEach(() => {
        useSelector.mockClear();
        fetchJogadores.mockClear();
        jest.clearAllTimers()
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });

        expect(TabelaJogadores).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#jogadores')).toBeInTheDocument();
        expect(container.querySelector('#jogadores').innerHTML).toContain('Jogadores');
        
        expect(fetchJogadores).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.jogadores.status = 'loaded';
        mockAppState.jogadores.error = '';
        okStateTest();
    });

});