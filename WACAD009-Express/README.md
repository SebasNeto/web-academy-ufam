# WACAD009 - Express

## Estrutura

- `Express`: Exercício I em JavaScript.
- `ExpTS`: Exercício II em TypeScript.

## Exercício I

```bash
cd Express
npm install
npm start
```

A aplicação disponível em http://localhost:3333.

Para executar sem o nodemon:

```bash
npm run start:prod
```

## Exercício II

```bash
cd ExpTS
npm install
npm run sass:build
```

Inicialize o JSON Server:

```bash
npm run start:db
```

Inicialize a aplicação:

```bash
npm start
```

A aplicação disponível em http://localhost:3333 e o JSON Server em http://localhost:3355.

TCompilar e iniciar a versão de produção:

```bash
npm run build
npm run start:prod
```

## Rotas do Exercício II

- `/`: página inicial.
- `/lorem/4`: gera a quantidade de parágrafos indicada na URL.
- `/hb1`, `/hb2` e `/hb3`: recursos básicos do Handlebars.
- `/hb4`: helper Handlebars para tecnologias baseadas em Node.js.
- `/produto`: CRUD de produtos.
- `/product`: rota alternativa para o mesmo CRUD.
