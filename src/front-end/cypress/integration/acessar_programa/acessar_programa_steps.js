import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Cenário: Exibir tela inicial
When('o programa é iniciado', () => {
    cy.visit('baseUrl');
});

Then('a tela inicial é exibida', () => {
    cy.contains('Futadm');
});

//Cenário: Fazer login como visitante
Given('que a tela inicial é exibida', () => {
    cy.visit('baseUrl');
});

When('clico no botão entrar como visitante', () => {
    cy.get('[id="visitante_entrar"]').click();
});

Then('a tela de partidas visitante é exibida', () => {
    cy.get('[id="usuario_perfil"');
});

//Cenário: Fazer login como administrador
Given('que a tela inicial é exibida', () => {
    cy.visit('baseUrl');
});

When('clico no botão entrar como adm', () => {
    cy.get('[id="adm_entrar"]').click();
});

When('informo meu login e senha', () => {
    cy
        .get('input')
        .should(($input) => {
            expect($input).to.have.length(2)
            expect($input.eq(0)).to.contain('Usuário')
            expect($input.eq(1)).to.contain('Senha')
        })
    /*
    Pseudocodigo para quando a tela de login for implementada:
        cy.get('input(0)').type('lucas_user');
        cy.get('input(1)').type('senha****');
        cy.get('botao_entrar').click();
    */
});

Then('a tela de partidas visitante é exibida', () => {
    cy.get('http://localhost:3000/partidas');
});