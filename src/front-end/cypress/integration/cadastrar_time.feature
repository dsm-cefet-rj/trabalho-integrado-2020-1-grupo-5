#language: pt
Funcionalidade: Cadastrar novos times
 
  Cenário: Adicionar imagem de ícone do time
    Dado que é exibida a tela de novo time
    Quando clico em adicionar imagem
    Então é salva a imagem como icone do time

  Cenário: Cadastrar novo time
    Dado que é exibida a tela de novo time
    Quando a imagem está salva
      E o formulário está preenchido
      E clico em salvar
    Então é salvo o time
      E é exibida a tela de times

  Cenário: Não cadastrar novo time
    Dado que é exibida a tela de novo time
    Quando clico em cancelar
    Então é exibido a tela de times

  Cenário:Retornar para times
    Dado que é exibida a tela de novo time
    Quando clico em voltar
    Então é exibido a tela de times
 
