import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import {deleteAdmServer, fetchAdms} from './../AdmsSlice'

import ListagemAdm from './../ListagemAdm'
import TabelaAdms from './../TabelaAdms'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

const mockAppState = {
    adms: {
        status: 'not_loaded',
        error: null,
        adms: []
    }
}

jest.mock("./../AdmsSlice", () => ({
    selectAll: jest.fn(() => mockAppState.adms.adms),
    deleteAdmServer: jest.fn(),
    fetchAdms: jest.fn()
}));

jest.useFakeTimers()

describe("ListagemAdm integration TabelaAdms - tabela vazia", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });
    
    afterEach(() => {
        useSelector.mockClear();
        fetchAdms.mockClear();
        jest.clearAllTimers()
    });

    const okStateTest = () => {
  
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });

        expect(TabelaAdms).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('adms');
        
        expect(fetchAdms).toHaveBeenCalledTimes(0);
    }

    test('loaded', () => {
        mockAppState.adms.status = 'loaded';
        mockAppState.adms.error = '';
        okStateTest();
    });

});