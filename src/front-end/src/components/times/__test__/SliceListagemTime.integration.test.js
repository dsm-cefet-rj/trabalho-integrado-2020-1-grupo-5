import React from 'react';
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import TimesReducer, {deleteTimeServer, fetchTimes, addTimeServer, updateTimeServer, selectAllTimes} from './TimesSlice'
import ListagemTime from './ListagemTime'


jest.mock("./../../../utils", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

jest.useFakeTimers();

let store;

describe('TimesSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { Times: TimesReducer }});
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
              "nome": "Time 1",
              "id": 5
            }
        ]));
        
        await store.dispatch(fetchTimes());  
        okStateTest();
    })

    const okStateTest = () => {
  
        const { container } = render(<ListagemTime />, { wrapper: MemoryRouter });

        expect(TabelaTimes).toHaveBeenCalledTimes(1);
        expect(container.querySelector('#times')).toBeInTheDocument();
        expect(container.querySelector('#times').innerHTML).toContain('Time');
        
        expect(fetchTimes).toHaveBeenCalledTimes(0);
    }

});