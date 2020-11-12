#language: pt
Funcionalidade: Alterar partidas
 
  Cenário: Modificar dados da partida
    Dado que é exibida a tela de partidas
    Quando clico em modificar dados da partida
    Então a tela de nova partida é exibida

  Cenário: Excluir uma partida
    Dado que é exibida a tela de partidas
    Quando clico em excluir uma partida
      E confirmo a exclusão
    Então a partida é excluída

  Cenário: Acessar nova partida
    Dado que é exibida a tela de partidas
    Quando clico em nova partida
    Então a tela de nova partida é exibida

  Cenário: Preencher os dropdowns
    Dado que é exibida a tela de nova partida
    Quando clico no menu dropdowns
    Então aparecem os dados correspondentes disponíveis no banco de dados

  Cenário: Adicionar jogador que participou da partida
    Dado que que é exibida a tela de nova partida
    Quando clico no ícone de adicionar 
    Então o novo jogador pode ser adicionado

  Cenário: Preencher o formulário
    Dado que é exibida a tela de nova partida
    Quando o formulário foi preenchido
      E clico em salvar
    Então a partida é salva no banco de dados
      E é exibida a tela de partidas


  Cenário: Não alterar partidas
    Dado que é exibida a tela de nova partida
    Quando clico em cancelar
    Então é exibida a tela de partidas
