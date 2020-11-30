#language: pt
Funcionalidade: Sair do programa
 
  Cenário: Sair do perfil de adm
    Dado que é exibida a tela de perfil
    Quando clico em sair
    Então é exibido a tela inicial

  Cenário: Sair do perfil de visitante
    Dado que é exibida a tela de partidas visitante (ou a tela de ranking visitante)
    Quando clico em sair
    Então é exibido a tela inicial
