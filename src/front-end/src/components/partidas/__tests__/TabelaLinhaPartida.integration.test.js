import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import TabelaPartidas from './../TabelaPartidas';

describe('Tabela x Linha Partida Integration', function () {

    test('Exibição N Partidas - TabelaPartidas integrado com LinhaPartida', () => {
        const partidas = []
        for(let i = 1; i < 10; i++){
            partidas.push({id:i, time_A: 'Time' + i})
        }

        render(<TabelaPartidas partidas={partidas}  />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Partida " + i)).toBeInTheDocument();
        }
    });

    test('Chamada da exclusão - TabelaPartidas integrado com LinhaPartida', () => {
        
        const mockExcluirHandler = jest.fn();
        
        const partidas = []
        for(let i = 1; i < 10; i++){
            partidas.push({id:i, time_A: 'Time' + i})
        }

        let dom = render(<TabelaPartidas partidas={partidas} onClickExcluirPartida={mockExcluirHandler} />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Partida " + i)).toBeInTheDocument();
        }

        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#excluir_partida_1"), leftClick);

        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(3);
    });

});