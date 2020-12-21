import TimesReducer, {deleteTimeServer, fetchTimes, addTimeServer, updateTimeServer, selectAllTimes} from './../TimesSlice'
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

describe('TimesSlice', () => {

    beforeEach(() => {
        store = configureStore({reducer: { Time: TimesReducer }});
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
              "nome": "Internacional",
              "id": 2
            }
        ]));
        
        await store.dispatch(fetchTimes());
        expect(store.getState().times.status).toBe('loaded');
        expect(store.getState().times.entities['4']).toEqual(
            {
              "nome": "Internacional",
              "id": 2          
            }
        );
    })

    test('dispatch fetch rejected', async () => {
        httpGet.mockImplementation(() => Promise.reject("err msg"));
        
        await store.dispatch(fetchTimes());
        expect(store.getState().times.status).toBe('failed');
        expect(store.getState().times.error).toBe('err msg');
    })

    test('dispatch fetch pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        httpGet.mockImplementation(() => {
            return wait(1000);
        });
        store.dispatch(fetchTimes());
        jest.advanceTimersByTime(500);
        expect(store.getState().times.status).toBe('loading');
    })

    test('dispatch addTime fullfiled', async () => {
        let time = {
            "nome": "Internacional"
        };
        
        httpPost.mockImplementation(() => Promise.resolve(
            {...time, id: 1}
        ));
        
        await store.dispatch(addTimeServer(time));
        expect(store.getState().times.status).toBe('saved');
        expect(store.getState().times.entities['1']).toEqual(
            {...time, id: 1}
        );
    })

    test('dispatch updateTime fullfiled', async () => {
 
        let time = {
            "nome": "Internacional"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...time, id: 1}
        ));        
        await store.dispatch(addTimeServer(time));
        
        let TimeUpdated = {
            "nome": "Botafogo",
            "id": 1
        };
        httpPut.mockImplementation(() => Promise.resolve(TimeUpdated));
        await store.dispatch(updateTimeServer(TimeUpdated));
        expect(store.getState().times.status).toBe('saved');
        expect(store.getState().times.entities['1']).toEqual(TimeUpdated);
    })

    test('dispatch deleteTime fullfiled', async () => {

        let time = {
            "nome": "Internacional"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...time, id: 1}
        ));        
        await store.dispatch(addTimeServer(Time));
        
        httpPut.mockImplementation(() => Promise.resolve({...time, id: 1}));
        await store.dispatch(deleteTimeServer(1));
        expect(store.getState().times.status).toBe('deleted');
        expect(store.getState().times.ids.length).toBe(0);
    })

    test('selectAll Times', async () => {

        let time = {
            "nome": "Internacional"
        };
        httpPost.mockImplementation(() => Promise.resolve(
            {...time, id: 1}
        ));        
        await store.dispatch(addTimeServer(time));

        expect(selectAllTimes(store.getState())).toEqual([{...time, id: 1}])
    })
});