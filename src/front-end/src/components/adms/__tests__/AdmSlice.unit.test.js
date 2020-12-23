import AdmsReducer, {deleteAdmServer, fetchAdms, addAdmServer, updateAdmServer, selectAllAdms} from './../AdmsSlice'
import {httpDelete, httpGet, httpPut, httpPost} from './../../../utils'
import { configureStore } from '@reduxjs/toolkit'

// Mocking utils
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
        store = configureStore({reducer: { Adm: AdmsReducer }});
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
              "name": "Diogo Mendonça",
              "id": 4
            }
        ]));
        
        await store.dispatch(fetchAdms());
        expect(store.getState().adms.status).toBe('loaded');
        expect(store.getState().adms.entities['4']).toEqual(
            {
              "nome": "Diogo Mendonça",
              "id": 4            
            }
        );
    })

    test('dispatch fetch rejected', async () => {
        httpGet.mockImplementation(() => Promise.reject("err msg"));
        
        await store.dispatch(fetchAdms());
        expect(store.getState().adms.status).toBe('failed');
        expect(store.getState().adms.error).toBe('err msg');
    })

    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchAdms());
        jest.advanceTimersByTime(500);
        expect(store.getState().adms.status).toBe('loading');
    })

    test('dispatch addAdm fullfiled', async () => {
        let adm = {
            "nome": "Diogo Mendonça"
        };
        
        httpPost.mockImplementation(() => Promise.resolve(
            {...adm, id: 1}
        ));
        
        await store.dispatch(addAdmServer(Adm));
        expect(store.getState().adms.status).toBe('saved');
        expect(store.getState().adms.entities['1']).toEqual(
            {...adm, id: 1}
        );
    })

    test('dispatch updateAdm fullfiled', async () => {
 
        let adm = {
            "name": "Diogo Mendonça",
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...adm, id: 1}
        ));        
        await store.dispatch(addAdmServer(adm));
        
        let admUpdated = {
            "name": "Diego Maradona",
            "id": 1
        };
        httpPut.mockImplementation(() => Promise.resolve(admUpdated));
        await store.dispatch(updateAdmServer(admUpdated));
        expect(store.getState().adms.status).toBe('saved');
        expect(store.getState().adms.entities['1']).toEqual(admUpdated);
    })

    test('dispatch deleteAdm fullfiled', async () => {

        let adm = {
            "nome": "Diogo Mendonça"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...adm, id: 1}
        ));        
        await store.dispatch(addAdmServer(adm));
        
        httpPut.mockImplementation(() => Promise.resolve({...adm, id: 1}));
        await store.dispatch(deleteAdmServer(1));
        expect(store.getState().adms.status).toBe('deleted');
        expect(store.getState().adms.ids.length).toBe(0);
    })

    test('selectAll Adms', async () => {

        let adm = {
            "nome": "Diogo Mendonça"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...adm, id: 1}
        ));        
        await store.dispatch(addAdmServer(adm));

        expect(selectAllAdms(store.getState())).toEqual([{...adm, id: 1}])
    })
});