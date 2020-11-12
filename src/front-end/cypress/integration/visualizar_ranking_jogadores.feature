#language: pt
Funcionalidade: Visualizar ranking dos Jogadores

  Cenário: Acessar ranking
    Dado que é exibida a tela de partidas (ou tela de cadastros ou tela de partidas visitante)
    Quando clico em rankings
    Então é exibida a tela de ranking	(ou tela de ranking visitante)

  Cenário: Digitar nome do jogador cadastrado
    Dado que é exibida a tela de ranking (ou tela de ranking visitante)
    Quando digito o nome de um jogador cadastrado
    Então é exibido o registro do jogador pesquisado

  Cenário: Digitar nome do jogador não cadastrado
    Dado que é exibida a tela de ranking (ou tela de ranking visitante)
    Quando digito o nome de um jogador não cadastrado
    Então não é exibido o registro do jogador pesquisado
