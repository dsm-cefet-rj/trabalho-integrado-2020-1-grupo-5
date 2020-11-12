#language: pt
Funcionalidade: Cadastrar novos jogadores

  Cenário: Cadastrar novo jogador
    Dado que é exibida a tela de novo jogador
      E o formulário está preenchido
    Quando clico em salvar
    Então o jogador é salvo 
      E é exibida a tela de jogadores

  Cenário: Não cadastrar novo jogador
    Dado que é exibida a tela de novo jogador
    Quando clico em cancelar
    Então é exibida a tela de jogadores

  Cenário:Retornar para jogadores
    Dado que é exibida a tela de novo jogador
    Quando clico em voltar
    Então é exibida a tela de jogadores
