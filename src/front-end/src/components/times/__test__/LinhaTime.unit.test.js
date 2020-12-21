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
        render(<LinhaTime />);
        expect(screen.getByText(/Não foi possível exibir times./)).toBeInTheDocument()
    });

    test('Time sem id', () => {
        render(<LinhaTime time={{}} />);
        expect(screen.getByText(/Não foi possível exibir times./i)).toBeInTheDocument()
    });

    test('Time sem times', () => {
        render(<LinhaTime time={{id: 1}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Time com times', () => {
        render(<LinhaTime time={{id: 1, nome: 'Time 1'}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Time 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });
    
    test('Time click editar', () => {
        const history = createMemoryHistory();
        let time = {id: 1, nome: 'Time 1'};
        render(<Router history={history}><LinhaTime time={time} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Time 1/i), leftClick);
        expect(history.location.pathname).toBe('/times/visualizar/1');
    });

    test('Time click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let time = {id: 1, nome: 'Time 1'};
        let dom = render(<LinhaTime time={time} onClickExcluirTime={mockExcluirHandler} />, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_time"), leftClick);
    });

});