import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Cadastrar novo adm
Given('que é exibida a tela de novo adm', () => {
    cy.visit('http://localhost:3000/adms/novo');
});

When('o formulário está preenchido', () => {
    cy.get('[id="nome_adm"]').type('Diogo Mendonça');
    cy.get('[id="usuario_adm"]').type('DiogoM');
    cy.get('[id="senha_adm"]').type('12345678');
});

And('clico em salvar', () =>{
    cy.get('[id="salva_adm"]').click();
})

Then('é salvo o adm', () =>{
    cy.get('alert');
})

And('é exibida a tela de adms', () =>{
    cy.visit('http://localhost:3000/adms');
})

And('é exibida a tela de adms', () =>{
    cy.get('alert');
})

//Cenário: Não cadastrar novo adm
Given('que é exibida a tela de novo adm', () => {
    cy.visit('http://localhost:3000/adms/novo');
});

When('clico em cancelar', () => {
    cy.get('[id="cancela_adm"]').click();
});

Then('é exibido a tela de adms', () =>{
    cy.visit('http://localhost:3000/adms');
})

