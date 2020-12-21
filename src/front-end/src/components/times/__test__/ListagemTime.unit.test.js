import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deleteTimeServer, fetchTimes} from './../TimesSlice'
import userEvent from '@testing-library/user-event'

import TabelaTimes from './../TabelaTimes'
import ListagemTime from './../ListagemTime'
import FormTime from './../FormTime'
import LinhaTime from './../LinhaTime'

//Erro ao mockar ListItems
//jest.mock('./../TabelaTimes', () => jest.fn((props) => (<LinhaTime onClick={() => props?.onClickExcluirTime(0)}/>)));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));


const mockAppState = {
    times: {
        status: 'not_loaded',
        error: null
    }
}


jest.mock("./../TimesSlice", () => ({
    selectAll: jest.fn(() => mockAppState.Times.Times),
    deleteTimeServer: jest.fn(),
    fetchTimes: jest.fn()
}));


jest.useFakeTimers()

describe('ListagemTime unit', function (){

    test('not_loaded', () => {
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });
        expect(container.querySelector('#times')).not.toBeInTheDocument();
        expect(fetchTimes).toHaveBeenCalledTimes(1);
    });

    test('loading', () => {
        mockAppState.Times.status = 'loading'; 
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });
        expect(fetchTimes).toHaveBeenCalledTimes(0);
        expect(container.querySelector('#times')).toBeInTheDocument();
        expect(container.querySelector('#times').innerHTML).toContain('Carregando os Times...');
    });

    const failedStateTest = () => {
    
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });
        expect(container.querySelector('#times')).toBeInTheDocument();
        expect(container.querySelector('#times').innerHTML).toContain('Error: Bola Fora');
        expect(fetchTimes).toHaveBeenCalledTimes(1);
        expect(TabelaTimes).toHaveBeenCalledTimes(0);
      }
    
      test('failed', () => {
        mockAppState.Times.status = 'failed';
        mockAppState.Times.error = 'Bola fora';
        failedStateTest();
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });

        expect(TabelaTimes).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#times')).toBeInTheDocument();
        expect(container.querySelector('#times').innerHTML).toContain('times');
        
        expect(fetchTimes).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.Times.status = 'loaded';
        mockAppState.Times.error = '';
        okStateTest();
    });

    test('saved', () => {
        mockAppState.Times.status = 'saved';
        mockAppState.Times.error = '';
        okStateTest();
    });
      
      test('deleted', () => {
        mockAppState.Times.status = 'deleted';
        mockAppState.Times.error = '';
        okStateTest();
    });

    test('call handleClickExcluirTime', () => {
        mockAppState.Times.status = 'loaded';
        mockAppState.Times.error = '';
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });

        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(TabelaTimes).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#times')).toBeInTheDocument();
        expect(container.querySelector('#times').innerHTML).toContain('times');
        
        expect(fetchTimes).toHaveBeenCalledTimes(0);
        
        const leftClick = { button: 0 };
        userEvent.click(container.querySelector("#times"), leftClick);
        expect(deleteTimeServer).toHaveBeenCalledTimes(1);
        expect(deleteTimeServer).toHaveBeenCalledWith(1);
      
    });

});

