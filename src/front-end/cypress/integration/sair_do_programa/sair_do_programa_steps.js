import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Sair do perfil de adm
Given('que é exibida a tela de perfil', () => {
    cy.visit('http://localhost:3000/times/perfil');
});

When('clico em sair', () => {
    cy.get('[id="sair_logout]').click();
});

Then('é exibido a tela inicial', () =>{
    cy.visit('http://localhost:3000');
})

//Cenário: Sair do perfil de visitante
Given('que é exibida a tela de partidas visitante (ou a tela de ranking visitante)', () => {
    cy.visit('http://localhost:3000/partidas');
});

When('clico em sair', () => {
    cy.get('[id="visitante_sair]').click();
});

Then('é exibido a tela inicial', () =>{
    cy.visit('http://localhost:3000');
})