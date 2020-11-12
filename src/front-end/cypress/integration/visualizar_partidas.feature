#language: pt
Funcionalidade: Visualizar partidas
 
  Cenário: Visualizar uma partida
    Dado que é exibida a tela de partidas (ou tela de partidas visitante)
    Quando clico em uma partida
    Então a tela de visualizar partidas é exibida

  Cenário: Retornar para tela de partidas.
    Dado que é exibida a tela de visualizar partida
    Quando clico em voltar
    Então é exibida a tela de partidas (ou tela de partidas visitante)
