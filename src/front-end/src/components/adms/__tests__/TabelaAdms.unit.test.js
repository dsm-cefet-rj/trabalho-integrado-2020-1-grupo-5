import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaAdms from './../TabelaAdms'
import LinhaAdm from './../LinhaAdm'

//Erro ao mockar ListItems
// Insight: ListItems cria elementos HTML não-ordenados
jest.mock('./../LinhaAdm', () => jest.fn(() => (<ul><li>MokedLine</li><li>MokedLine</li></ul>)));

describe('TabelaAdms Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaAdms/>);
        expect(screen.getByText(/Não existem adms a serem exibidos./i)).toBeInTheDocument()
    });

    test('tabela Adms vazio', () => {
        render(<TabelaAdmes adms={[]}  />);
        expect(screen.getByText(/Não existem adms a serem exibidos./i)).toBeInTheDocument() 
    });

    // Erro ao chamar função LinhaAdm por meio da TabelaAdms
    // Insight: Entender melhor como funciona a função e mockar parte dela
    test('um Adm na tabela', () => {
        render(<TabelaAdms adms={[{id:1, nome: 'Adm 1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaAdmes).toHaveBeenCalledTimes(1);
    });

    test('dois Adms na tabela', () => {
        const adms = [{id:1, nome: 'Adm 1'}, {id:2, nome: 'Adm 2'}];
        render(<TabelaAdms adms={adms}  />, { wrapper: MemoryRouter });
        expect(LinhaAdm).toHaveBeenCalledTimes(2);
    });
    
    test('N Adms na tabela', () => {
        const adms = []
        for(let i = 0; i < 10; i++){
            adms.push({id:i, nome: 'Adm ' + i})
        }
        render(<TabelaAdms adms={adms}  />, { wrapper: MemoryRouter });
        expect(LinhaAdm).toHaveBeenCalledTimes(10);
    });

});