import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import LinhaTime from './../LinhaTime'


describe('LinhaTime unit', function () {

    test('props vazio', () => {
        render(<table><tbody><LinhaTime /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir times./)).toBeInTheDocument()
    });

    test('Time sem id', () => {
        render(<table><tbody><LinhaTime time={{}} /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir times./i)).toBeInTheDocument()
    });

    test('Time sem times', () => {
        render(<table><tbody><LinhaTime time={{id: 1}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Time com times', () => {
        render(<table><tbody><LinhaTime time={{id: 1, nome: 'Time 1'}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Time 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });
    
    test('Time click editar', () => {
        const history = createMemoryHistory();
        let Time = {id: 1, name: 'Time 1'};
        render(<Router history={history}><table><tbody><LinhaTime time={time} /></tbody></table></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Time 1/i), leftClick);
        expect(history.location.pathname).toBe('/times/1');
    });

    test('Time click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let time = {id: 1, nome: 'Time 1'};
        let dom = render(<table><tbody><LinhaTime time={time} onClickExcluirTime={mockExcluirHandler} /></tbody></table>, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_time_1"), leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });

});