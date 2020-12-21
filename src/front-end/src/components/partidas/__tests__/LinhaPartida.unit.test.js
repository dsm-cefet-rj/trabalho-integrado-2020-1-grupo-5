import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import LinhaPartida from './../LinhaPartida'


describe('LinhaPartida unit', function () {

    test('props vazio', () => {
        render(<table><tbody><LinhaPartida /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir a partida./)).toBeInTheDocument()
    });

    test('Partida sem id', () => {
        render(<table><tbody><LinhaPartida Partida={{}} /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir a partida./i)).toBeInTheDocument()
    });

    test('Partida sem times', () => {
        render(<table><tbody><LinhaPartida Partida={{id: 1}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Partida com times', () => {
        render(<table><tbody><LinhaPartida Partida={{id: 1, time_A: 'Brasil', time_B: 'Alemanha'}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Partida 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });

    test('Partida click editar', () => {
        const history = createMemoryHistory();
        let Partida = {id: 1, name: 'Partida 1'};
        render(<Router history={history}><table><tbody><LinhaPartida partida={partida} /></tbody></table></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Partida 1/i), leftClick);
        expect(history.location.pathname).toBe('/Partidas/1');
    });

    test('Partida click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let Partida = {id: 1, nome: 'Partida 1'};
        let dom = render(<table><tbody><LinhaPartida partida={partida} onClickExcluirPartida={mockExcluirHandler} /></tbody></table>, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_Partida_1"), leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });

});