# ExpApi - WACAD013

Projeto consolidado com os cinco exercícios do módulo:

1. cookie para troca de idioma;
2. CRUD de usuários com Prisma e bcrypt;
3. autenticação por sessão e middlewares `isAuth` e `isAdmin`;
4. carrinho em sessão e conclusão de compra no banco;
5. documentação OpenAPI com Swagger UI.

## Execução

```bash
npm install
cp .env.example .env
docker compose up -d
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

A API fica em `http://localhost:4455/v1` e o Swagger em
`http://localhost:4455/api`.

## Administrador de teste

- email: `admin@expapi.com`
- senha: `admin123`

O Insomnia ou navegador deve conservar o cookie `connect.sid` retornado pelo
login para acessar rotas autenticadas.

## Fluxo de teste

1. `PUT /v1/auth` para fazer login.
2. `POST /v1/produto` para criar produtos como administrador.
3. `POST /v1/auth` para cadastrar um cliente e depois fazer login como ele.
4. `POST /v1/compra/carrinho` para adicionar produtos.
5. `POST /v1/compra` para concluir a compra.
