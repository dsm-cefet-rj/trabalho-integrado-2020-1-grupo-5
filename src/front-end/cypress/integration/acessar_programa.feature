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
