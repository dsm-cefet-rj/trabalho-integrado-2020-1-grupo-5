import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Editar time
Given('que é exibida a tela de times', () => {
    cy.visit('http://localhost:3000/times');
});

When('clico em editar time', () => {
    cy.get('[id="novo_time"]').click();
});

Then('é exibida a tela de novo time', () =>{
    cy.visit('http://localhost:3000/times/novo');
})

//Cenário: Excluir time
Given('que é exibida a tela de times', () => {
    cy.visit('http://localhost:3000/times');
});

When('clico em excluir time', () => {
    cy.get('[id="deleta_time"]').click();
});

And('confirmo a exclusão', () =>{
    cy.get('alert');
})

Then('o time é excluído', () =>{
    cy.visit('http://localhost:3000/times');
})

// Cenário: Adicionar time
Given('que é exibida a tela de times', () => {
    cy.visit('http://localhost:3000/times');
});

When('clico em novo time', () => {
    cy.get('[id="novo_time"]').click();
});

Then('é exibida a tela de novo time', () =>{
    cy.visit('http://localhost:3000/times/novo');
})