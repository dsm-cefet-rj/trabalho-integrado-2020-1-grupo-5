import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import LinhaPartida from './../LinhaPartida'


describe('LinhaPartida unit', function () {

    const partida={
        id: 1,
        data: '08/07/2014',
        arbitro: 'Marco Rodriguez',
        local: 'Mineirão',
        time_A: 'Brasil',
        gols_time_A: 1,
        time_B: 'Alemanha',
        gols_time_B: 7
    };

    test('props vazio', () => {
        render(<LinhaPartida />);
        expect(screen.getByText(/Não foi possível exibir a partida./)).toBeInTheDocument()
    });

    test('Partida sem id', () => {
        render(<LinhaPartida partida={{}} />);
        expect(screen.getByText(/Não foi possível exibir a partida./i)).toBeInTheDocument()
    });

    test('Partida sem times', () => {
        render(<LinhaPartida partida={partida} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Partida com times', () => {
        render(<LinhaPartida partida={partida} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Brasil/i)).toBeInTheDocument();
        expect(screen.queryByText(/Alemanha/i)).toBeInTheDocument();
    });

    test('Partida click editar', () => {
        const history = createMemoryHistory();
        render(<Router history={history}><LinhaPartida partida={partida} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Brasil/i), leftClick);
        expect(history.location.pathname).toBe('/partidas/visualizar/1');
    });

    test('Partida click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let dom = render(<LinhaPartida partida={partida} onClickExcluirPartida={mockExcluirHandler} />, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_partida"), leftClick);
    });

});