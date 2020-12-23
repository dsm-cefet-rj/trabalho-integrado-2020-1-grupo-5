import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaPartidas from './../TabelaPartidas'
import LinhaPartidas from './../LinhaPartida'

//Erro ao mockar ListItems
// Insight: ListItems cria elementos HTML não-ordenados
jest.mock('./../LinhaPartida', () => jest.fn(() => (<ul><li>MokedLine</li><li>MokedLine</li></ul>)));

// Módulo de Partida não foi terminado
describe('TabelaPartidas Unit', function () {

    const partida_1={
        id: 1,
        data: '08/07/2014',
        arbitro: 'Marco Rodriguez',
        local: 'Mineirão',
        time_A: 'Brasil',
        gols_time_A: 1,
        time_B: 'Alemanha',
        gols_time_B: 7
    };

    const partida_2={
        id:2,
        data: '30/06/2002',
        arbitro: "Pierluigi Collina",
        local: "Yokohama",
        id_time_A: "Alemanha",
        gols_time_A: 0,
        id_time_B: "Brasil",
        gols_time_B: 2
    };

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
        render(<TabelaPartidas partidas={[partida_1]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaPartidas).toHaveBeenCalledTimes(1);
    });

    test('duas partidas na tabela', () => {
        const partidas = [{partida_1}, {partida_2}];
        render(<TabelaPartidas partidas={partidas}  />, { wrapper: MemoryRouter });
        expect(LinhaPartida).toHaveBeenCalledTimes(2);
    });
    
    test('N Partidas na tabela', () => {
        const partidas = []
        for(let i = 0; i < 10; i++){
            partidas.push({
            id:i,
            data: '30/06/2002',
            arbitro: "Arbitro" + i,
            local: "Local" + i,
            id_time_A: "Time A" + i,
            gols_time_A: i,
            id_time_B: "Time B" + i,
            gols_time_B: 10-i
            })
        }
        render(<TabelaPartidas partidas={partidas}  />, { wrapper: MemoryRouter });
        expect(LinhaPartida).toHaveBeenCalledTimes(10);
    });

});