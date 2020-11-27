#language: pt
Funcionalidade: Alterar adms

  Cenário: Adicionar adm
    Given é exibida a tela de adms
    When clico em novo adm
    Then é exibida a tela de novo adm

  Cenário: Excluir adm
    Given que é exibida a tela de adms
    When clico em excluir adm
      E confirmo a exclusão
    Then o adm é excluído

  Cenário: Retornar para cadastros
    Given que é exibida a tela de adms
    When clico em voltar
    Then é exibida a tela de cadastros
