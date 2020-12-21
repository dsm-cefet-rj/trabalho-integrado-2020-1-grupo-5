import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaPartidas from './../TabelaPartidas'
import LinhaPartidas from './../LinhaPartida'

//Erro ao mockar ListItems
//jest.mock('./../LinhaPartida', () => jest.fn(() => ( <ListItem>MockedLine </ListItem>)));

describe('TabelaPartidas Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaPartidas  />);
        expect(screen.getByText(/Não existem partidas a serem exibidas./i)).toBeInTheDocument()
    });

    test('tabela Partidas vazio', () => {
        render(<TabelaPartidas partidas={[]}  />);
        expect(screen.getByText(/Não existem partidas a serem exibidas./i)).toBeInTheDocument() 
    });

    test('uma partida na tabela', () => {
        render(<TabelaPartidas partidas={[{id:1, id_time_A: 'Brasil'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaPartidas).toHaveBeenCalledTimes(1);
    });

    test('duas partidas na tabela', () => {
        const Partidas = [{id:1, id_time_A: 'Brasil'}, {id:2, id_time_B: 'Alemanha'}];
        render(<TabelaPartidas partidas={partidas}  />, { wrapper: MemoryRouter });
        expect(LinhaPartida).toHaveBeenCalledTimes(2);
    });
    
    test('N Partidas na tabela', () => {
        const partidas = []
        for(let i = 0; i < 10; i++){
            partidas.push({id:i, id_time_A: 'Partida ' + i})
        }
        render(<TabelaPartidas partidas={partidas}  />, { wrapper: MemoryRouter });
        expect(LinhaPartida).toHaveBeenCalledTimes(10);
    });

});