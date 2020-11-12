#language: pt
Funcionalidade: Cadastrar novos adms

  Cenário: Cadastrar novo adm
    Dado que é exibida a tela de novo adm
    Quando o formulário está preenchido
      E clico em salvar
    Então é salvo o adm
      E é exibida a tela de adms
      E o novo adm é notificado da senha

  Cenário: Não cadastrar novo adm
    Dado que é exibida a tela de novo adm
    Quando clico em cancelar
    Então é exibido a tela de adms

  Cenário: Retornar para adms
    Dado que é exibida a tela de novo adm
    Quando clico em voltar
    Então é exibido a tela de adms
