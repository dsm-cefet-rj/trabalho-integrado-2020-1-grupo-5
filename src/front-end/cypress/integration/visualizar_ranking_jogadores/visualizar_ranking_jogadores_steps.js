import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Acessar ranking
Given('que é exibida qualquer tela', () => {
    cy.visit('http://localhost:3000');
});

When('clico no menu sanduiche', () => {
    cy.get('[class="MuiButtonBase-root MuiIconButton-root makeStyles-menuButton-2 MuiIconButton-colorInherit MuiIconButton-edgeStart"').click();
});

And('clico no botão Ranking', () => {
    cy.get('[class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"]').contains('Ranking').click();
});

Then('é exibida a tela de ranking', () => {
    cy.visit('http://localhost:3000/ranking');
});

//Cenário: Digitar nome do jogador cadastrado
Given('que é exibida a tela de ranking', () => {
    cy.visit('http://localhost:3000/ranking');
});

When('digito o nome de um jogador cadastrado', () => {
    cy.get('[id="procura_jogador"').type('jogador teste');
});

Then('é exibido o registro do jogador pesquisado', () => {
    cy.contains('jogador teste').eq(1);
});

//Cenário: Digitar nome do jogador não cadastrado
Given('que é exibida a tela de ranking', () => {
    cy.visit('http://localhost:3000/ranking');
});

When('digito o nome de um jogador não cadastrado', () => {
    cy.get('[id="procura_jogador"').type('jogador não teste');
});

Then('não é exibido o registro do jogador pesquisado', () => {
    cy.get('jogador não teste').eq(1).should('not.exist');
});