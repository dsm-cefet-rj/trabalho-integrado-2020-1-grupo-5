import React from 'react';
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import admsReducer, {deleteAdmServer, fetchAdms, addAdmServer, updateAdmServer, selectAllAdms} from './../AdmsSlice'
import ListagemAdm from './ListagemAdm'


jest.mock("./../../../utils", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

jest.useFakeTimers();

let store;
describe('AdmsSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { Adms: admsReducer }});
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
              "name": "Adm 5",
              "id": 5
            }
        ]));
        
        await store.dispatch(fetchAdms());  
        okStateTest();
    })

    const okStateTest = () => {
  
        const { container } = render(<ListagemAdm />, { wrapper: MemoryRouter });

        expect(TabelaAdms).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#adms')).toBeInTheDocument();
        expect(container.querySelector('#adms').innerHTML).toContain('Adm');
        
        expect(fetchAdms).toHaveBeenCalledTimes(0);
    }

});