#language: pt
Funcionalidade: Ver partidas
 
Cenário: Buscar uma partida em uma data que há partidas
	Dado que é exibida a tela de partidas
	Quando clico no ícone da data 
		E busco uma partida 
	Então a tela de partidas é exibida
 
Cenário: Buscar uma partida em uma data que não há partidas
	Dado que é exibida a tela de partidas
	Quando clico no ícone da data 
		E busco uma partida que não existe
	Então a tela de partidas é exibida
