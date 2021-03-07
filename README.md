# NLW4_Node.js

## Sobre o projeto
- O projeto desenvolvido é um aplicação backend em node.js que cadastra usuários no banco de dados, cadastra pesquisas, envia e-mails para esses usuários com a pesquisa cadastrada
- Calcula o NPS (Net Promoter Score) que o usuário respondeu na pesquisa

## Para testar a api no seu dispositivo
- Precisa ter node instalado (https://nodejs.org/en/)
- Clonar esse projeto
- Digitar ``` yarn install ``` no terminal na pasta api

## Rotas da aplicação 
para métodos POST, os dados são enviados para API por JSON
- ``` localhost:3333/users ```: método POST
  -  Rota para criação um usuário com nome e email
- ``` localhost:3333/surveys ```: método POST
  -  Rota para criação de uma pesquisa com título e descrição
- ``` localhost:3333/surveys ```: método GET
  - Rota para listar todas as pesquisas criadas
- ``` localhost:3333/sendMail ```: método POST
  - Rota para enviar e-mail para usuário com uma pesquisa, passando um e-mail e o id da pesquisa no JSON
- ``` localhost:3333/nps/<survey_id> ```: método GET
  - Rota para calcular o NPS de uma pesquisa cadastrada  
