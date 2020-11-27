#language: pt
Funcionalidade: Visualizar ranking dos Jogadores

  Cenário: Acessar ranking
    Dado que é exibida qualquer tela
    Quando clico no menu sanduiche
      E clico no botão Ranking
    Então é exibida a tela de ranking

  Cenário: Digitar nome do jogador cadastrado
    Dado que é exibida a tela de ranking
    Quando digito o nome de um jogador cadastrado
    Então é exibido o registro do jogador pesquisado

  Cenário: Digitar nome do jogador não cadastrado
    Dado que é exibida a tela de ranking
    Quando digito o nome de um jogador não cadastrado
    Então não é exibido o registro do jogador pesquisado
