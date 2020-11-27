import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//Cenário: Modificar dados da partida
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
})

When('clico em modificar dados da partida', () => {
    cy.get('[class="MuiSvgIcon-root MuiSvgIcon-colorPrimary"]').click();
})

Then('a tela de nova partida é exibida', () => {
    cy.visit('http://localhost:3000/partidas/novo');
})

Then('o formulário está preenchido', () => {
    cy.visit('http://localhost:3000/partidas/novo');
    cy.get('input').should('have.value');
})

//Cenário: Excluir uma partida
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
})

When('clico em excluir uma partida', () => {
    cy.get('[id="deleta_partida"]').click();
})

When('confirmo a exclusão', () => {
    if($('[id^="tab_partidas"]').length == partidas-1){
        return true; 
    }
})

Then('a partida é excluída', () => {
    cy.visit('http://localhost:3000/partidas');
})

//Cenário: Acessar nova partida
Given('que é exibida a tela de partidas', () => {
    cy.visit('http://localhost:3000/partidas');
})

When('clico em nova partida', () => {
    cy.get('[class="MuiSvgIcon-root MuiSvgIcon-colorPrimary"]').click();
})

Then('a tela de nova partida é exibida', () => {
    cy.visit('http://localhost:3000/partidas/novo');
})

//Cenário: Preencher os dropdowns
Given('que é exibida a tela de nova partida', () => {
    cy.visit('http://localhost:3000/partidas/novo');
})

When('clico no menu dropdowns', () => {
    cy.get('[class="MuiSvgIcon-root MuiSelect-icon"]').click({multiple:true, force: true});
})

Then('aparecem os dados correspondentes disponíveis no banco de dados', () =>{
    cy.get('[id="time_A"]').should('have.value');
    cy.get('[id="time_B"]').should('have.value');
})

// Cenário: Adicionar jogador que participou da partida
Given('que é exibida a tela de nova partida', () => {
    cy.visit('http://localhost:3000/partidas/novo'); 
})

When('clico no ícone de adicionar', () => {
    cy.get('[id="adiciona_jogador_A"]').click();
})

Then('o novo jogador pode ser adicionado', () =>{
    cy.visit('http://localhost:3000/jogadores');
    cy.get('[id="edita_jogador"]').click();
})

// Cenário: Preencher o formulário
Given('que é exibida a tela de nova partida', () => {
    cy.visit('http://localhost:3000/partidas/novo'); 
})

When('o formulário foi preenchido', () => {
    cy.get('[id="data_partida"]').type('2014-07-08');
    cy.get('[id="arbitro_partida"]').type('Marco Rodríguez');
    cy.get('[id="local_partida"]').type('Mineirão');
    cy.get('[id="time_A"]').type('Brasil');
    cy.get('[id="gols_time_A"]').type('1');
    cy.get('[id="time_B"]').type('Alemanha');
    cy.get('[id="gols_time_B"]').type('7');
})

And('clico em salvar', () => {
    cy.get('[id="salva_partida"]').click();
})

Then('a partida é salva no banco de dados', () =>{
    cy.visit('http://localhost:3000/partidas');
    cy.contains('Brasil');
})

And('é exibida a tela de partidas', () =>{
    cy.visit('http://localhost:3000/partidas');
})

// Cenário: Não alterar partidas

Given('que é exibida a tela de nova partida', () => {
    cy.visit('http://localhost:3000/partidas/novo'); 
})

When('clico em cancelar', () => {
    cy.get('[id="cancela_partida"]').click();
})

Then('é exibida a tela de partidas', () =>{
    cy.visit('http://localhost:3000/partidas');
})
