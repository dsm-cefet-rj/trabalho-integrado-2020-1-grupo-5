import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Acessar cadastros
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
});

When('clico em cadastros', () => {
    cy,get(['id=tab_cadastros']).click();
});

Then('é exibida a tela de cadastros', ( )=> {
    cy.visit('http://localhost:3000/cadastros');
});

//Cenário: Acessar jogadores
Given('que é exibida a tela de cadastros', () => {
    cy.visit('http://localhost:3000/cadastros');
});

When('clico em jogadores', () => {
    cy,get(['id=jogador_cadastros']).click();
});

Then('é exibida a tela de jogadores', () => {
    cy.visit('http://localhost:3000/jogadores');
});

    
//Cenário: Acessar times
Given('que é exibida a tela de cadastros', () => {
    cy.visit('http://localhost:3000/cadastros');
});

When('clico em times', () => {
    cy,get(['id=times_cadastros']).click();
});

Then('é exibida a tela de times', () => {
    cy.visit('http://localhost:3000/times');    
});


//Cenário: Acessar adms
Given('que é exibida a tela de cadastros', () => {
    cy.visit('http://localhost:3000/cadastros');
});

When('clico em adms', () => {
    cy,get(['id=adm_cadastros']).click();
});

Then('é exibida a tela de adms', () => {
    cy.visit('http://localhost:3000/adms'); 
});