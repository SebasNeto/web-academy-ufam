# Trabalho final - Containers

Projeto configurado a partir dos arquivos de https://github.com/matiusX/tp-final-webacademy.

## Execução

Na pasta do projeto:

```bash
docker compose up -d --build
docker compose ps
```

## Endereços

- Frontend: http://localhost:8000
- Backend: http://localhost:4444/api
- PHPMyAdmin: http://localhost:8080
- MySQL: localhost:3306

## Credenciais

- Servidor do PHPMyAdmin: `mysql`
- Banco: `livraria`
- Usuário: `root`
- Senha: `senhasegura`

## Persistência

O volume `webacademy_livros_mysql_data` armazena os dados do MySQL. O volume `webacademy_livros_backend_logs` armazena os arquivos de `/app/log`.

Para recriar os contêineres preservando os dados e os logs:

```bash
docker compose down
docker compose up -d
```

Não utilizei`docker compose down -v`, pois essa opção remove os volumes.

Para visualizar a inicialização:

```bash
docker compose logs -f
```
