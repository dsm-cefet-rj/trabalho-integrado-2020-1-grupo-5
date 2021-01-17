### Como usar o Ansible para configurar o sistema e a aplicação automaticamente

1. [Instalar Ansible](https://docs.ansible.com/ansible/latest/installation_guide/index.html)

1. **Comando para rodar o playbook:**
```
 sudo ansible-playbook -c local -i localhost, ansible.yml
```

**Etapas que serão feitas automaticamente:**
* Instalação e atualização dos pacotes necessários para a aplicação
* Verificação da instalação de cada pacote
* Clonar repositório do GitHub
* Etapas de Build e conexão entre back-end e front-end

**Objetivo**  
Facilitar a instalação e implementação da aplicação, permitindo com que os contribuidores não precisem gastar tempo com essa etapa, e sim, com a própria tarefa a ser realizada.
