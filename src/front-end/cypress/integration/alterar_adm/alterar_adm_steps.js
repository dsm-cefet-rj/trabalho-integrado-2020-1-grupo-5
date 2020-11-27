import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Adicionar adm
Given('é exibida a tela de adms', () => {
    cy.visit('http://localhost:3000/adms');
});

When('clico em novo adm', () => {
    cy.get('[id="novo_adm"]').click();
});

Then('é exibida a tela de novo adm', () =>{
    cy.visit('http://localhost:3000/adms/novo');
})


// Cenário: Excluir adm
Given('que é exibida a tela de adms', () =>{
    cy.visit('http://localhost:3000/adms');
});

When('clico em novo adm', () => {
    cy.get('[id="deleta_adm"]').click();
});

And('confirmo a exclusão', () =>{
    cy.get('alert');
})

Then('é exibida a tela de cadastros', () =>{
    cy.visit('http://localhost:3000/adms');
})
