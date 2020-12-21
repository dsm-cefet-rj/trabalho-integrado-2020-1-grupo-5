import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import {deletePartidaServer, fetchPartidas} from './../PartidasSlice'

import ListagemPartida from './../ListagemPartida'
import TabelaPartidas from './../TabelaPartidas'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

const mockAppState = {
    partidas: {
        status: 'not_loaded',
        error: null,
        partidas: []
    }
}

jest.mock("./../PartidasSlice", () => ({
    selectAllPartidas: jest.fn(() => mockAppState.partidas.partidas),
    deletePartidasServer: jest.fn(),
    fetchPartidas: jest.fn()
}));

jest.useFakeTimers()

describe("ListagemPartida integration TabelaPartidas - tabela vazia", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });
    
    afterEach(() => {
        useSelector.mockClear();
        fetchPartidas.mockClear();
        jest.clearAllTimers()
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });

        expect(TabelaPartidas).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('partidas');
        
        expect(fetchPartidas).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.Partidas.status = 'loaded';
        mockAppState.Partidas.error = '';
        okStateTest();
    });

});