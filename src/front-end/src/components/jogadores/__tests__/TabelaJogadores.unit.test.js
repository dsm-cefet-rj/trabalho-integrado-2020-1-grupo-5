import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaJogadores from './../TabelaJogadores'
import LinhaJogador from './../LinhaJogador'

//Erro ao mockar ListItems
jest.mock('./../LinhaJogador', () => jest.fn(() => (<ul><li>MokedLine</li><li>MokedLine</li></ul>)));

describe('TabelaJogadores Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaJogadores  />);
        expect(screen.getByText(/Não existem jogadores a serem exibidos./i)).toBeInTheDocument()
    });

    test('tabela jogadores vazio', () => {
        render(<TabelaJogadores jogadores={[]}  />);
        expect(screen.getByText(/Não existem jogadores a serem exibidos./i)).toBeInTheDocument() 
    });

    test('um jogador na tabela', () => {
        const jogadores = [{id:1, nome: 'Jogador 1'}];
        render(<TabelaJogadores jogadores={jogadores}/>, { wrapper: MemoryRouter });
        expect(LinhaJogador).toHaveBeenCalledTimes(1);
    });

    test('dois jogadores na tabela', () => {
        const jogadores = [{id:1, nome: 'Jogador 1'}, {id:2, nome: 'Jogador 2'}];
        render(<TabelaJogadores jogadores={jogadores, 2}  />, { wrapper: MemoryRouter });
        expect(LinhaJogador).toHaveBeenCalledTimes(2);
    });
    
    test('N jogadores na tabela', () => {
        const jogadores = []
        for(let i = 0; i < 10; i++){
            jogadores.push({id:i, nome: 'Jogador ' + i})
        }
        render(<TabelaJogadores jogadores={jogadores}  />, { wrapper: MemoryRouter });
        expect(LinhaJogador).toHaveBeenCalledTimes(10);
    });

});