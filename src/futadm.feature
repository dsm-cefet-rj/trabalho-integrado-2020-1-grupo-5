#language: pt
 
Funcionalidade: Acessar o programa
 
Cenário: Exibir tela inicial
	Quando o programa é iniciado 
	Então a tela inicial é exibida
 
Cenário: Fazer login como visitante
Dado que a tela inicial é exibida
	Quando clico no botão entrar como visitante
	Então a tela de partidas visitante é exibida 
 
Cenário: Fazer login como administrador
Dado que a tela inicial é exibida
	Quando clico no botão entrar como adm
E informo meu login e senha
Então a tela de partidas é exibida 
 
Funcionalidade: Ver partidas
 
Cenário: Buscar uma partida em uma data que há partidas.
	Dado que é exibida a tela de partidas (ou tela de partidas visitante)
		E busco uma partida 
	Quando clico no ícone da data 
	Então a tela de partidas é exibida (ou tela de partidas visitante)
 
Cenário: Buscar uma partida em uma data que não há partidas
	Dado que é exibida a tela de partidas (ou tela de partidas visitante)
		E busco uma partida
	Quando clico no ícone da data 
	Então a tela de partidas é exibida (ou tela de partidas visitante)
 
 
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
		E o formulário foi preenchido
	Quando clico em salvar
	Então a partida é salva no banco de dados
		E é exibida a tela de partidas
 
 
Cenário: Não alterar partidas
	Dado que é exibida a tela de nova partida
	Quando clico em cancelar
	Então é exibida a tela de partidas
 
Funcionalidade: Visualizar partidas
 
Cenário: Visualizar uma partida
	Dado que é exibida a tela de partidas (ou tela de partidas visitante)
	Quando clico em uma partida
	Então a tela de visualizar partidas é exibida
 
Cenário: Retornar para tela de partidas.
	Dado que é exibida a tela de visualizar partida
	Quando clico em voltar
	Então é exibida a tela de partidas (ou tela de partidas visitante)
 
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

Funcionalidade: Visualizar cadastros
 
Cenário: Acessar cadastros
	Dado que é exibida a tela de partidas (ou tela de ranking)
	Quando clico em cadastros
	Então é exibida a tela de cadastros
 
Cenário: Acessar jogadores
	Dado que é exibida a tela de cadastros
	Quando clico em jogadores
	Então é exibida a tela de jogadores
 
Cenário: Acessar times
	Dado que é exibida a tela de cadastros
	Quando clico em times
	Então é exibida a tela de times
 
Cenário: Acessar adms
	Dado que é exibida a tela de cadastros
	Quando clico em adms
	Então é exibida a tela de adms
 
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
 
Funcionalidade: Cadastrar novos jogadores

Cenário: Cadastrar novo jogador
	Dado que é exibida a tela de novo jogador
		E o formulário está preenchido
	Quando clico em salvar
	Então o jogador é salvo 
		E é exibida a tela de jogadores
 
Cenário: Não cadastrar novo jogador
	Dado que é exibida a tela de novo jogador
	Quando clico em cancelar
	Então é exibida a tela de jogadores
 
Cenário:Retornar para jogadores
	Dado que é exibida a tela de novo jogador
	Quando clico em voltar
	Então é exibida a tela de jogadores
 
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

Cenário: Retornar para cadastros
	Dado que é exibida a tela de times
	Quando clico em voltar
	Então é exibida a tela de cadastros
 
Funcionalidade: Cadastrar novos times
 
Cenário: Adicionar imagem de ícone do time
	Dado que é exibida a tela de novo time
	Quando clico em adicionar imagem
	Então é salva a imagem como icone do time

Cenário: Cadastrar novo time
	Dado que é exibida a tela de novo time
		E formulário preenchido
E imagem salva
Quando clico em salvar
Então é salvo o time
	E é exibida a tela de times
 
Cenário: Não cadastrar novo time
	Dado que é exibida a tela de novo time
	Quando clico em cancelar
	Então é exibido a tela de times
 
Cenário:Retornar para times
	Dado que é exibida a tela de novo time
	Quando clico em voltar
	Então é exibido a tela de times
 
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
 
Funcionalidade: Cadastrar novos adms

Cenário: Cadastrar novo adm
	Dado que é exibida a tela de novo adm
		E formulário preenchido
Quando clico em salvar
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
 

Funcionalidade: Sair do programa
 
Cenário: Sair do perfil de adm
	Dado que é exibida a tela de perfil
	Quando clico em sair
	Então é exibido a tela inicial 
 
Cenário: Sair do perfil de visitante
	Dado que é exibida a tela de partidas visitante (ou a tela de ranking visitante)
	Quando clico em sair
	Então é exibido a tela inicial 