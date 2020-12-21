import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaJogadores from './../TabelaJogadores'
import LinhaJogadores from './../LinhaJogador'

//Erro ao mockar ListItems
//jest.mock('./../LinhaJogador', () => jest.fn(() => ( <ListItem>MockedLine </ListItem>)));

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
        render(<TabelaJogadores jogadores={[{id:1, name: 'Jogador 1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaJogadores).toHaveBeenCalledTimes(1);
    });

    test('dois jogadores na tabela', () => {
        const jogadores = [{id:1, name: 'Jogador 1'}, {id:2, name: 'Jogador 2'}];
        render(<TabelaJogadores jogadores={jogadores}  />, { wrapper: MemoryRouter });
        expect(LinhaJogador).toHaveBeenCalledTimes(2);
    });
    
    test('N jogadores na tabela', () => {
        const jogadores = []
        for(let i = 0; i < 10; i++){
            jogadores.push({id:i, name: 'Jogador ' + i})
        }
        render(<TabelaJogadores jogadores={jogadores}  />, { wrapper: MemoryRouter });
        expect(LinhaJogador).toHaveBeenCalledTimes(10);
    });

});