#language: pt
Funcionalidade: Alterar adms

  Cenário: Adicionar adm
    Dado é exibida a tela de adms
    Quando clico em novo adm
    Então é exibida a tela de novo adm

  Cenário: Excluir adm
    Dado que é exibida a tela de adms
    Quando clico em excluir adm
      E confirmo a exclusão
    Então o adm é excluído


  Cenário: Retornar para cadastros
    Dado que é exibida a tela de adms
    Quando clico em voltar
    Então é exibida a tela de cadastros
