import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Editar um jogador
Given('que é exibida a tela de jogadores', () => {
    cy.visit('http://localhost:3000/jogadores');
});

When('clico em editar jogador', () => {
    cy.get('[id="edita_jogador"]').click();
});

Then('é exibida a tela de novo jogador', () =>{
    cy.visit('http://localhost:3000/jogadores/novo');
})

//Cenário: Excluir um jogador
Given('que é exibida a tela de jogadores', () => {
    cy.visit('http://localhost:3000/jogadores');
});

When('clico em excluir jogador', () => {
    cy.get('[id="deleta_jogador"]').click();
});

And('confirmo a exclusão', () =>{
    cy.get('alert');
})

Then('jogador é excluído', () =>{
    cy.visit('http://localhost:3000/jogadores');
})

// Cenário: Adicionar um jogador
Given('é exibida a tela de adms', () => {
    cy.visit('http://localhost:3000/jogadores');
});

When('clico em novo jogador', () => {
    cy.get('[id="novo_jogador"]').click();
});

Then('é exibida a tela de novo adm', () =>{
    cy.visit('http://localhost:3000/jogadores/novo');
})