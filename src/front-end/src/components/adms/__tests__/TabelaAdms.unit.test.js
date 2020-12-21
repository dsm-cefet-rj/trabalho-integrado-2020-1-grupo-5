import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TabelaAdms from './../TabelaAdms'
import LinhaAdm from './../LinhaAdm'

//Erro ao mockar ListItems
//jest.mock('./../LinhaAdm', () => jest.fn(() => ( <ListItem>MockedLine </ListItem>)));

describe('TabelaAdms Unit', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('props vazio', () => {
        render(<TabelaAdms  />);
        expect(screen.getByText(/Não existem adms a serem exibidos./i)).toBeInTheDocument()
    });

    test('tabela Adms vazio', () => {
        render(<TabelaAdmes Admes={[]}  />);
        expect(screen.getByText(/Não existem adms a serem exibidos./i)).toBeInTheDocument() 
    });

    test('um Adm na tabela', () => {
        render(<TabelaAdms adms={[{id:1, name: 'Adm 1'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(LinhaAdmes).toHaveBeenCalledTimes(1);
    });

    test('dois Adms na tabela', () => {
        const adms = [{id:1, name: 'Adm 1'}, {id:2, name: 'Adm 2'}];
        render(<TabelaAdms adms={adms}  />, { wrapper: MemoryRouter });
        expect(LinhaAdm).toHaveBeenCalledTimes(2);
    });
    
    test('N Adms na tabela', () => {
        const adms = []
        for(let i = 0; i < 10; i++){
            adms.push({id:i, name: 'Adm ' + i})
        }
        render(<TabelaAdms adms={adms}  />, { wrapper: MemoryRouter });
        expect(LinhaAdm).toHaveBeenCalledTimes(10);
    });

});