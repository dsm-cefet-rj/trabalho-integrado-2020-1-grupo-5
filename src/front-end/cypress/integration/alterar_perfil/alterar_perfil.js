import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Editar um jogador
Given('que é exibida a tela de partidas (ou a tela de ranking ou a tela de cadastros)', () => {
    cy.visit('http://localhost:3000/partidas');
});

When('clico no perfil', () => {
    cy.get('[id="usuario_perfil"]').click();
});

Then('é exibida a tela de perfil', () =>{
    cy.visit('http://localhost:3000/perfil');
})

// Cenário: Alterar dados do perfil
Given('que é exibida a tela de perfil', () => {
    cy.visit('http://localhost:3000/perfil');
});

When('alterei algum dado do formulário', () => {
    cy.get('[id="nome_perfil"]').clear();
    cy.get('[id="nome_perfil"]').type('Diogo');
});

And('clico em salvar', () => {
    cy.get('[id="salva_jogador"]').click();
});

Then('é exibida a tela de perfil', () =>{
    cy.visit('http://localhost:3000/perfil');
})

//  Cenário: Não alterar dados do perfil
Given('que é exibida a tela de perfil', () => {
    cy.visit('http://localhost:3000/perfil');
});

When('clico em cancelar', () => {
    cy.get('[id="cancela_jogador"]').click();
});

Then('é exibida a tela de perfil', () =>{
    cy.visit('http://localhost:3000/perfil');
})

// Cenário: Retornar para a tela anterior
Given('que é exibida a tela de perfil', () => {
    cy.visit('http://localhost:3000/perfil');
});

When('clico em voltar', () => {
    cy.get('[id="sair_logout"]').click();
});

Then('é exibida a tela de perfil', () =>{
    cy.visit('http://localhost:3000/partidas');
})
