import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import TabelaJogadores from './../TabelaJogadores';

describe('Tabela x Linha Jogador Integration', function () {

    test('Exibição N jogadores - TabelaJogadores integrado com LinhaJogador', () => {
        const jogadores = []
        for(let i = 1; i < 10; i++){
            jogadores.push({id:i, name: 'Jogador ' + i})
        }

        render(<TabelaJogadores jogadores={jogadores}  />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Jogador " + i)).toBeInTheDocument();
        }
    });

    test('Chamada da exclusão - TabelaJogadores integrado com LinhaJogador', () => {
        
        const mockExcluirHandler = jest.fn();
        
        const jogadores = []
        for(let i = 1; i < 10; i++){
            jogadores.push({id:i, nome: 'Jogador ' + i})
        }

        let dom = render(<TabelaJogadores jogadores={jogadores} onClickExcluirJogador={mockExcluirHandler} />, { wrapper: MemoryRouter });
        for(let i = 1; i < 10; i++){
            expect(screen.getByText("Jogador " + i)).toBeInTheDocument();
        }

        const leftClick = { button: 0 };
        userEvent.click(dom.container.querySelector("#excluir_jogador_1"), leftClick);

        expect(mockExcluirHandler).toHaveBeenCalledTimes(1);
        expect(mockExcluirHandler).toHaveBeenCalledWith(3);
    });

});