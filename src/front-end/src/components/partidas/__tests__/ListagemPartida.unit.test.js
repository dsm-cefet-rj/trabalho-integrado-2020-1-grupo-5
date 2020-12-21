import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deletePartidaServer, fetchPartidas} from './../PartidasSlice'
import userEvent from '@testing-library/user-event'

import TabelaPartidas from './../TabelaPartidas'
import ListagemPartida from './../ListagemPartida'
import FormPartida from './../FormPartida'
import LinhaPartida from './../LinhaPartida'

// Mocking tabela Partidas
//jest.mock('./../TabelaPartidas', () => jest.fn((props) => (<LinhaPartida onClick={() => props?.onClickExcluirPartida(0)}/>)));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

const mockAppState = {
    Partidas: {
        status: 'not_loaded',
        error: null
    }
}

jest.mock("./../PartidasSlice", () => ({
    selectAll: jest.fn(() => mockAppState.partidas.partidas),
    deletePartidaServer: jest.fn(),
    fetchPartidas: jest.fn()
}));


jest.useFakeTimers()

describe('ListagemPartida unit', function (){

    test('not_loaded', () => {
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });
        expect(container.querySelector('#partidas')).not.toBeInTheDocument();
        expect(fetchPartidas).toHaveBeenCalledTimes(1);
    });


    test('loading', () => {
        mockAppState.partidas.status = 'loading'; 
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });
        expect(fetchPartidas).toHaveBeenCalledTimes(0);
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('Carregando as Partidas...');
    });

    const failedStateTest = () => {
    
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('Error: Bola Fora');
        expect(fetchPartidas).toHaveBeenCalledTimes(1);
        expect(TabelaPartidas).toHaveBeenCalledTimes(0);
      }
    
      test('failed', () => {
        mockAppState.partidas.status = 'failed';
        mockAppState.partidas.error = 'Bola fora';
        failedStateTest();
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });

        expect(TabelaPartidas).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('Partidas');
        
        expect(fetchPartidas).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.partidas.status = 'loaded';
        mockAppState.partidas.error = '';
        okStateTest();
    });

    test('saved', () => {
        mockAppState.partidas.status = 'saved';
        mockAppState.partidas.error = '';
        okStateTest();
    });
      
      test('deleted', () => {
        mockAppState.partidas.status = 'deleted';
        mockAppState.partidas.error = '';
        okStateTest();
    });

    test('call handleClickExcluirPartida', () => {
        mockAppState.partidas.status = 'loaded';
        mockAppState.partidas.error = '';
        const { container } = render(<ListagemPartida />, { wrapper: MemoryRouter });

        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(TabelaPartidas).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#partidas')).toBeInTheDocument();
        expect(container.querySelector('#partidas').innerHTML).toContain('Partidas');
        
        expect(fetchPartidas).toHaveBeenCalledTimes(0);
      
        const leftClick = { button: 0 };
        userEvent.click(container.querySelector("#partidas"), leftClick);
        expect(deletePartidaServer).toHaveBeenCalledTimes(1);
        expect(deletePartidaServer).toHaveBeenCalledWith(1);
      
    });

});

