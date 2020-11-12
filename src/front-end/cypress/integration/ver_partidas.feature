#language: pt
Funcionalidade: Ver partidas
 
Cenário: Buscar uma partida em uma data que há partidas.
	Dado que é exibida a tela de partidas (ou tela de partidas visitante)
	Quando clico no ícone da data 
		E busco uma partida 
	Então a tela de partidas é exibida (ou tela de partidas visitante)
 
Cenário: Buscar uma partida em uma data que não há partidas
	Dado que é exibida a tela de partidas (ou tela de partidas visitante)
	Quando clico no ícone da data 
		E busco uma partida
	Então a tela de partidas é exibida (ou tela de partidas visitante)
