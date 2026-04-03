# Projeto Node - API de Videos

API REST simples para cadastro e gerenciamento de videos usando:

- Node.js
- Fastify
- PostgreSQL (driver `postgres`)

## Funcionalidades

- Criar video
- Listar videos (com filtro por titulo)
- Atualizar video por ID
- Remover video por ID

## Requisitos

- Node.js 18+
- PostgreSQL em execucao local (ou remoto com acesso liberado)

## Instalacao

```bash
npm install
```

## Configuracao de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
PGHOST=localhost
PGDATABASE=nome_do_banco
PGUSER=seu_usuario
PGPASSWORD=sua_senha
PORT=3333
```

> `PORT` e opcional. Se nao for definido, a API sobe na porta `3333`.

## Banco de dados

A API (`database-postgres.js`) espera uma tabela `videos` com as colunas:

- `id` (UUID)
- `title` (TEXT)
- `description` (TEXT)
- `duration` (INTEGER)

Use este SQL para criar a tabela:

```sql
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL
);
```

### Observacao sobre `create-table.js`

O script atual `create-table.js` nao esta alinhado com o codigo da API (ele cria `duration_seconds` e nao cria `id`).

Se quiser manter o script, ajuste-o para o mesmo schema acima antes de executar.

## Executando o projeto

Modo desenvolvimento (com watch):

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

A API ficara disponivel em:

- `http://localhost:3333`

## Endpoints

### Criar video

- Metodo: `POST`
- Rota: `/videos`

Body:

```json
{
  "title": "video Node",
  "description": "Esse e o primeiro video",
  "duration": 180
}
```

Resposta esperada: `201 Created`

### Listar videos

- Metodo: `GET`
- Rota: `/videos`
- Query opcional: `search`

Exemplo:

- `/videos`
- `/videos?search=node`

Resposta: lista de videos

### Atualizar video

- Metodo: `PUT`
- Rota: `/videos/:id`

Body:

```json
{
  "title": "video atualizado",
  "description": "descricao atualizada",
  "duration": 200
}
```

Resposta esperada: `204 No Content`

### Deletar video

- Metodo: `DELETE`
- Rota: `/videos/:id`

Resposta esperada: `204 No Content`

## Testando rapidamente

Voce pode usar o arquivo `routes.http` com a extensao REST Client do VS Code para disparar as requisicoes.

## Estrutura basica

- `server.js`: definicao das rotas e inicializacao do Fastify
- `database-postgres.js`: implementacao do repositorio no PostgreSQL
- `database-memory.js`: implementacao em memoria (nao utilizada por padrao)
- `banco-dados.js`: conexao com banco usando variaveis de ambiente
- `create-table.js`: script para criacao de tabela (precisa ajuste de schema)
