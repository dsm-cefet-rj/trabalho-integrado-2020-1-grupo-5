import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaTimes from './../TabelaTimes'
import LinhaTimes from './../LinhaTime'

//Erro ao mockar ListItems
// Insight: ListItems cria elementos HTML não-ordenados
jest.mock('./../LinhaTime', () => jest.fn(() => (<ul><li>MokedLine</li><li>MokedLine</li></ul>)));

describe('TabelaTimes Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaTimes  />);
        expect(screen.getByText(/Não existem times a serem exibidos./i)).toBeInTheDocument()
    });

    test('tabela Times vazio', () => {
        render(<TabelaTimes times={[]}  />);
        expect(screen.getByText(/Não existem times a serem exibidos./i)).toBeInTheDocument() 
    });

    // Erro ao chamar função LinhaTime por meio da TabelaTimes
    // Insight: Entender melhor como funciona a função e mockar parte dela
    test('um Time na tabela', () => {
        render(<TabelaTimes times={[{id:1, nome: 'Time 1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaTimes).toHaveBeenCalledTimes(1);
    });

    test('dois Times na tabela', () => {
        const times = [{id:1, nome: 'Time 1'}, {id:2, nome: 'Time 2'}];
        render(<TabelaTimes times={times}  />, { wrapper: MemoryRouter });
        expect(LinhaTime).toHaveBeenCalledTimes(2);
    });
    
    test('N Times na tabela', () => {
        const times = []
        for(let i = 0; i < 10; i++){
            times.push({id:i, nome: 'Time ' + i})
        }
        render(<TabelaTimes times={times}  />, { wrapper: MemoryRouter });
        expect(LinhaTime).toHaveBeenCalledTimes(10);
    });

});