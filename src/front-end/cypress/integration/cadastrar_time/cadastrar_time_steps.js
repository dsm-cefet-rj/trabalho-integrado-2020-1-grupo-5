import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Adicionar imagem de ícone do time
Given('que é exibida a tela de novo time', () => {
    cy.visit('http://localhost:3000/times/novo');
});

When('clico em adicionar imagem', () => {
    cy.get('[id="escudo_time"]').click();
});

Then('é salva a imagem como icone do time', () =>{
    cy.get('[id="escudo_time"]').find("img").should('be.visible');
})