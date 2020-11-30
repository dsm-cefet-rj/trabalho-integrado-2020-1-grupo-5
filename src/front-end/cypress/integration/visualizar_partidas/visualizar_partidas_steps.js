import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Visualizar uma partida
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
});

const partida = cy.get('[id="tab_partidas"').eq(0);

When('clico em uma partida', () => {
    cy.get('[id="tab_partidas"').eq(0).click();
});

Then('a tela de visualizar partidas é exibida', () => {
    cy.visit('http://localhost:3000/visualizar-partida');
    cy.contains(partida);
});

//Cenário: Retornar para tela de partidas
Given('que é exibida a tela de visualizar partida', () => {
    cy.visit('http://localhost:3000/visualizar-partida');
});

When('clico em voltar', () => {
    cy.get('[id="voltar"').click();
});

Then('é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
});