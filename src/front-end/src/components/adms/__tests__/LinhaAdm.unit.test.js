import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import LinhaAdm from './../LinhaAdm'


describe('LinhaAdm unit', function () {

    test('props vazio', () => {
        render(<LinhaAdm />);
        expect(screen.getByText(/Não foi possível exibir adms./)).toBeInTheDocument()
    });

    test('Adm sem id', () => {
        render(<LinhaAdm adm={{}} />);
        expect(screen.getByText(/Não foi possível exibir adms./i)).toBeInTheDocument()
    });

    test('Adm sem nome', () => {
        render(<LinhaAdm adm={{id: 1}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Adm com nome', () => {
        render(<LinhaAdm adm={{id: 1, nome: 'Adm 1'}} />, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Adm 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });

    test('Adm click editar', () => {
        const history = createMemoryHistory();
        let adm = {id: 1, nome: 'Adm 1'};
        render(<Router history={history}><LinhaAdm adm={adm} /></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Adm 1/i), leftClick);
        expect(history.location.pathname).toBe('/adms/visualizar/1');
    });

    test('Adm click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let adm = {id: 1, nome: 'Adm 1'};
        let dom = render(<LinhaAdm adm={adm} onClickExcluirAdm={mockExcluirHandler} />, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_adm"), leftClick);
    });

});
