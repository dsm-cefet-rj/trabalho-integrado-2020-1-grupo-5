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
        render(<table><tbody><LinhaAdm /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir adms./)).toBeInTheDocument()
    });

    test('Adm sem id', () => {
        render(<table><tbody><LinhaAdm adm={{}} /></tbody></table>);
        expect(screen.getByText(/Não foi possível exibir adms./i)).toBeInTheDocument()
    });

    test('Adm sem nome', () => {
        render(<table><tbody><LinhaAdm adm={{id: 1}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/undefined./i)).not.toBeInTheDocument();
    });

    test('Adm com nome', () => {
        render(<table><tbody><LinhaAdm adm={{id: 1, name: 'Adm 1'}} /></tbody></table>, { wrapper: MemoryRouter });
        expect(screen.queryByText(/Adm 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/1/i)).toBeInTheDocument();
    });

    test('Adm click editar', () => {
        const history = createMemoryHistory();
        let Adm = {id: 1, name: 'Adm 1'};
        render(<Router history={history}><table><tbody><LinhaAdm adm={adm} /></tbody></table></Router>);
        const leftClick = { button: 0 };
        userEvent.click(screen.getByText(/Adm 1/i), leftClick);
        expect(history.location.pathname).toBe('/adms/1');
    });

    test('Adm click excluir', () => {
        const mockExcluirHandler = jest.fn();
        let Adm = {id: 1, nome: 'Adm 1'};
        let dom = render(<table><tbody><LinhaAdm adm={adm} onClickExcluirAdm={mockExcluirHandler} /></tbody></table>, { wrapper: MemoryRouter });
        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#deleta_adm_1"), leftClick);
        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(1);
    });

});
