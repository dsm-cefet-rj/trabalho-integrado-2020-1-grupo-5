import React from 'react';
import { render } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import {deleteTimeServer, fetchTimes} from './../TimesSlice'

import ListagemTime from './../ListagemTime'
import TabelaTimes from './../TabelaTimes'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

const mockAppState = {
    times: {
        status: 'not_loaded',
        error: null,
        times: []
    }
}

jest.mock("./../TimesSlice", () => ({
    selectAllTimes: jest.fn(() => mockAppState.times.times),
    deleteTimesServer: jest.fn(),
    fetchTimes: jest.fn()
}));

jest.useFakeTimers()

describe("ListagemTime integration TabelaTimes - tabela vazia", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });
    
    afterEach(() => {
        useSelector.mockClear();
        fetchTimes.mockClear();
        jest.clearAllTimers()
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

});
