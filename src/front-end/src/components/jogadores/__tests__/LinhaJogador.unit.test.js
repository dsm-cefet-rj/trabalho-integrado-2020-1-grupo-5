import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import LinhaJogador from './../LinhaJogador'


describe('LinhaJogador unit', function () {

    test('props vazio', () => {
        render(<LinhaJogador />);
        expect(screen.getByText(/Não foi possível exibir jogadores./)).toBeInTheDocument()
    });

    test('jogador sem id', () => {
        render(<LinhaJogador jogador={{}} />);
        expect(screen.getByText(/Não foi possível exibir jogadores./i)).toBeInTheDocument()
    });

    test('jogador sem nome', () => {
        render(<LinhaJogador jogador={{id: 1}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('jogador com nome', () => {
        render(<LinhaJogador jogador={{id: 1, nome: 'Jogador 1'}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Jogador 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });

    test('jogador click editar', () => {
        const history = createMemoryHistory();
        let jogador = {id: 1, nome: 'Jogador 1'};
        render(<Router history={history}><LinhaJogador jogador={jogador} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Jogador 1/i), leftClick);
        expect(history.location.pathname).toBe('/jogadores/visualizar/1');
    });

    test('jogador click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let jogador = {id: 1, nome: 'Jogador 1'};
        let dom = render(<LinhaJogador jogador={jogador} onClickExcluirJogador={mockExcluirHandler} />, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_jogador"), leftClick);
    });

});
