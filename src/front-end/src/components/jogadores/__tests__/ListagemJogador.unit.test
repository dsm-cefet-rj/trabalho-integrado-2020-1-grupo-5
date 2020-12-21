import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deleteJogadorServer, fetchJogadores} from './../JogadoresSlice'
import userEvent from '@testing-library/user-event'

import TabelaJogadores from './../TabelaJogadores'
import ListagemJogador from './../ListagemJogador'
import FormJogador from './../FormJogador'
import LinhaJogador from './../LinhaJogador'

// Mocking tabela jogadores
//jest.mock('./../TabelaJogadores', () => jest.fn((props) => (<LinhaJogador onClick={() => props?.onClickExcluirJogador(0)}/>)));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));


const mockAppState = {
    jogadores: {
        status: 'not_loaded',
        error: null
    }
}


jest.mock("./../JogadoresSlice", () => ({
    selectAll: jest.fn(() => mockAppState.jogadores.jogadores),
    deleteJogadorServer: jest.fn(),
    fetchJogadores: jest.fn()
}));


jest.useFakeTimers()

describe('ListagemJogador unit', function (){

    test('not_loaded', () => {
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });
        expect(container.querySelector('#jogadores')).not.toBeInTheDocument(); // passed
        expect(fetchJogadores).toHaveBeenCalledTimes(1); // failed
    });


    test('loading', () => {
        mockAppState.jogadores.status = 'loading'; 
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });
        expect(fetchJogadores).toHaveBeenCalledTimes(0); // passed
        expect(container.querySelector('#jogadores')).toBeInTheDocument(); // return null
        expect(container.querySelector('#jogadores').innerHTML).toContain('Carregando os jogadores...'); //não pode ler um elemento nulo
    });

    const failedStateTest = () => {
    
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });
        expect(container.querySelector('#jogadores')).toBeInTheDocument();
        expect(container.querySelector('#jogadores').innerHTML).toContain('Error: Bola Fora');
        expect(fetchJogadores).toHaveBeenCalledTimes(1);
        expect(TabelaJogadores).toHaveBeenCalledTimes(0);
      }
    
      test('failed', () => {
        mockAppState.jogadores.status = 'failed';
        mockAppState.jogadores.error = 'Bola fora';
        failedStateTest();
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

    test('saved', () => {
        mockAppState.jogadores.status = 'saved';
        mockAppState.jogadores.error = '';
        okStateTest();
    });
      
      test('deleted', () => {
        mockAppState.jogadores.status = 'deleted';
        mockAppState.jogadores.error = '';
        okStateTest();
    });

    test('call handleClickExcluirJogador', () => {
        mockAppState.jogadores.status = 'loaded';
        mockAppState.jogadores.error = '';
        const { container } = render(<ListagemJogador />, { wrapper: MemoryRouter });

        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(TabelaJogadores).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#jogadores')).toBeInTheDocument();
        expect(container.querySelector('#jogadores').innerHTML).toContain('Jogadores');
        
        expect(fetchJogadores).toHaveBeenCalledTimes(0);
      
        const leftClick = { button: 0 };
        userEvent.click(container.querySelector("#jogadores"), leftClick);
        expect(deleteJogadorServer).toHaveBeenCalledTimes(1);
        expect(deleteJogadorServer).toHaveBeenCalledWith(1);
      
    });

});

