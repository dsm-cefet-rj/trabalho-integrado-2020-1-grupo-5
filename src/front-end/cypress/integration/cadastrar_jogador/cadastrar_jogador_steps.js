import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Cadastrar novo jogador
Given('que é exibida a tela de novo jogador', () => {
    cy.visit('http://localhost:3000/jogadores/novo');
});

When('o formulário está preenchido', () => {
    cy.get('[id="nome_jogador"]').type('Diego Maradona');
    cy.get('[id="data_nascimento_jogador"]').type('1960-10-30');
});

And('clico em salvar', () =>{
    cy.get('[id="salva_jogador"]').click();
})

Then('o jogador é salvo', () =>{
    cy.visit('http://localhost:3000/jogadores');
    cy.contains('Diego Maradona');
})

And('é exibida a tela de jogadores', () =>{
    cy.visit('http://localhost:3000/jogadores');
})

//Cenário: Não cadastrar novo jogador
Given('que é exibida a tela de novo jogador', () => {
    cy.visit('http://localhost:3000/jogadores/novo');
});

When('clico em cancelar', () =>{
    cy.get('[id="cancela_jogador"]').click();
})

Then('é exibida a tela de jogadores', () =>{
    cy.visit('http://localhost:3000/jogadores');
})