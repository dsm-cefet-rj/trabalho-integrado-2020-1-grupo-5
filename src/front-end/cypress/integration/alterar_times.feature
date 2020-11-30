#language: pt
Funcionalidade: Alterar times

  Cenário: Editar time
    Dado que é exibida a tela de times
    Quando clico em editar time
    Então é exibida a tela de novo time

  Cenário: Excluir time
    Dado que é exibida a tela de times
    Quando clico em excluir time
      E confirmo a exclusão
    Então o time é excluído

  Cenário: Adicionar time
    Dado que é exibida a tela de times
    Quando clico em novo time
    Então é exibida a tela de novo time
