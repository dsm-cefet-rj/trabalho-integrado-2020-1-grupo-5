import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {deleteAdmServer, fetchAdms} from './../AdmsSlice'
import userEvent from '@testing-library/user-event'

import TabelaAdms from './../TabelaAdms'
import ListagemAdm from './../ListagemAdm'
import FormAdm from './../FormAdm'
import LinhaAdm from './../LinhaAdm'

//Erro ao mockar ListItems
//jest.mock('./../TabelaAdms', () => jest.fn((props) => (<LinhaAdm onClick={() => props?.onClickExcluirAdm(0)}/>)));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));


const mockAppState = {
    Adms: {
        status: 'not_loaded',
        error: null
    }
}


jest.mock("./../AdmsSlice", () => ({
    selectAll: jest.fn(() => mockAppState.adms.adms),
    deleteAdmServer: jest.fn(),
    fetchAdms: jest.fn()
}));


jest.useFakeTimers()

describe('ListagemAdm unit', function (){

    test('not_loaded', () => {
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });
        expect(container.querySelector('#adms')).not.toBeInTheDocument();
        expect(fetchAdms).toHaveBeenCalledTimes(1);
    });


    test('loading', () => {
        mockAppState.Adms.status = 'loading'; 
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });
        expect(fetchAdms).toHaveBeenCalledTimes(0);
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('Carregando os adms...');
    });

    const failedStateTest = () => {
    
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('Error: Bola Fora');
        expect(fetchAdms).toHaveBeenCalledTimes(1);
        expect(TabelaAdms).toHaveBeenCalledTimes(0);
      }
    
      test('failed', () => {
        mockAppState.Adms.status = 'failed';
        mockAppState.Adms.error = 'Bola fora';
        failedStateTest();
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });

        expect(TabelaAdms).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('adms');
        
        expect(fetchAdms).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.Adms.status = 'loaded';
        mockAppState.Adms.error = '';
        okStateTest();
    });

    test('saved', () => {
        mockAppState.Adms.status = 'saved';
        mockAppState.Adms.error = '';
        okStateTest();
    });
      
      test('deleted', () => {
        mockAppState.Adms.status = 'deleted';
        mockAppState.Adms.error = '';
        okStateTest();
    });

    test('call handleClickExcluirAdm', () => {
        mockAppState.Adms.status = 'loaded';
        mockAppState.Adms.error = '';
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });

        expect(container.querySelector('#lbl_titulo_pagina')).toBeInTheDocument();
        
        expect(TabelaAdms).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('Adms');
        
        expect(fetchAdms).toHaveBeenCalledTimes(0);
      
        const leftClick = { button: 0 };
        userEvent.click(container.querySelector("#adms"), leftClick);
        expect(deleteAdmServer).toHaveBeenCalledTimes(1);
        expect(deleteAdmServer).toHaveBeenCalledWith(1);
      
    });

});
