import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Buscar uma partida em uma data que há partidas
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
});

When('clico no ícone da data', () => {
    cy.get('[id="procura_data_partida"]').click();
});

And('busco uma partida', () => {
    cy.get('[id="procura_data_partida"]').type('2020-11-26');
    cy.get('[id="data_partida"]', {mutiple:true}).contains('2020-11-26');
});

Then('a tela de partidas é exibida', () =>{
    cy.visit('http://localhost:3000/partidas');
})

//Cenário: Buscar uma partida em uma data que não há partidas
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
});

When('clico no ícone da data', () => {
    cy.get('[id="procura_data_partida"]').click();
});

And('busco uma partida que não existe', () => {
    cy.get('[id="procura_data_partida"]').type('2020-11-26');
    cy.get('[id="data_partida"]').should('not.exist');
});

Then('a tela de partidas é exibida', () =>{
    cy.visit('http://localhost:3000/partidas');
})