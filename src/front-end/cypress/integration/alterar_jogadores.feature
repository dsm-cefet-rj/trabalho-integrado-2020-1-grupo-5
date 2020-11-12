#language: pt
Funcionalidade: Alterar jogadores
	
  Cenário: Editar um jogador
    Dado que é exibida a tela de jogadores
    Quando clico em editar jogador
    Então é exibida a tela de novo jogador

  Cenário: Excluir um jogador
    Dado que é exibida a tela de jogadores
    Quando clico em excluir jogador
      E confirmo a exclusão
    Então jogador é excluído

  Cenário: Adicionar um jogador
    Dado que é exibida a tela de jogadores
    Quando clico em novo jogador
    Então é exibida a tela de novo jogador

  Cenário: Retornar para cadastros
    Dado que é exibida a tela de jogadores
    Quando clico em voltar
    Então é exibida a tela de cadastros
