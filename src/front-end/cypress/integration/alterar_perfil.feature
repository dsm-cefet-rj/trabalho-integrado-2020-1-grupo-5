#language: pt
Funcionalidade: Alterar perfil

  Cenário: Acessar perfil
    Dado que é exibida a tela de partidas (ou a tela de ranking ou a tela de cadastros)
    Quando clico no perfil
    Então é exibida a tela de perfil

  Cenário: Alterar dados do perfil
    Dado que é exibida a tela de perfil
      E alterei algum dado do formulário
    Quando clico em salvar
    Então é exibido a tela de perfil

  Cenário: Não alterar dados do perfil
    Dado que é exibida a tela de perfil
    Quando clico em cancelar
    Então é exibido a tela de perfil

  Cenário: Retornar para a tela anterior
    Dado que é exibida a tela de perfil
    Quando clico em voltar
    Então é exibido a tela de partidas (ou a tela de ranking ou a tela de cadastros)
