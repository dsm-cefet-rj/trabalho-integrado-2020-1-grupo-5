import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import TabelaTimes from './../TabelaTimes';

describe('Tabela x Linha Time Integration', function () {

    test('Exibição N Times - TabelaTimes integrado com LinhaTime', () => {
        const times = []
        for(let i = 1; i < 10; i++){
            times.push({id:i, name: 'Time ' + i})
        }

        render(<TabelaTimes times={times}  />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Time " + i)).toBeInTheDocument();
        }
    });

    test('Chamada da exclusão - TabelaTimes integrado com LinhaTime', () => {
        
        const mockExcluirHandler = jest.fn();
        
        const times = []
        for(let i = 1; i < 10; i++){
            times.push({id:i, nome: 'Time ' + i})
        }

        let dom = render(<TabelaTimes times={times} onClickExcluirTime={mockExcluirHandler} />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Time " + i)).toBeInTheDocument();
        }

        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#excluir_Time_1"), leftClick);

        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(3);
    });

});