# 📝 Nest Task API

API desenvolvida com **NestJS**, utilizando **TypeORM**, **PostgreSQL** e boas práticas de arquitetura para gerenciamento de usuários (**Users**), quadros (**Boards**) e tarefas (**Tasks**), incluindo paginação, filtros e autenticação.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) • Framework Node.js com TypeScript
- [TypeORM](https://typeorm.io/) • ORM para integração com banco de dados
- [PostgreSQL](https://www.postgresql.org/) • Banco de dados relacional
- [Swagger](https://swagger.io/) • Documentação de API automática
- [Class Validator](https://github.com/typestack/class-validator) • Validações nas rotas
- [Jest](https://jestjs.io/) • Testes unitários

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nest-task.git

# Acesse a pasta
cd nest-task

# Instale as dependências
npm install
```

---

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nesttask
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

---

## 🐘 Configuração do Banco de Dados

Se desejar usar Docker para PostgreSQL:

```bash
docker run --name postgres-nest -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=nesttask -p 5432:5432 -d postgres
```

---

## 🔥 Rodando o Projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

---

## 🚀 Como Utilizar a API

Para interagir com os endpoints protegidos, você primeiro precisa se autenticar.

### 1. Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Token). O fluxo é o seguinte:

1.  **Crie um usuário**: Envie uma requisição `POST` para `/users`.
2.  **Faça o login**: Envie uma requisição `POST` para `/auth` com o email e a senha do usuário criado.
3.  **Receba o token**: A resposta conterá um `accessToken`.
4.  **Use o token**: Para acessar rotas protegidas, inclua o token no cabeçalho `Authorization` de suas requisições, no formato `Bearer {seu_token}`.

### 2. Endpoints

#### 🧑‍💼 Auth

- `POST /auth` - Realiza o login e retorna um `accessToken`.

  **Exemplo de body:**

  ```json
  {
    "email": "seu_email@example.com",
    "password": "sua_senha"
  }
  ```

#### 🧑‍💼 Users

- `POST /users` — Criar um usuário.

  **Exemplo de body:**

  ```json
  {
    "name": "Seu Nome",
    "email": "seu_email@example.com",
    "password": "sua_senha_com_mais_de_6_caracteres"
  }
  ```

- `GET /users` — Listar todos os usuários (Requer autenticação).
- `GET /users/:id` — Buscar um usuário pelo ID (Requer autenticação).
- `PATCH /users/:id` — Atualizar um usuário (Requer autenticação).
- `DELETE /users/:id` — Deletar um usuário (Requer autenticação).

#### 🗂️ Boards

Todos os endpoints de Boards requerem autenticação.

- `POST /boards` — Criar um board.

  **Exemplo de body:**

  ```json
  {
    "title": "Meu Novo Quadro",
    "description": "Descrição do meu quadro.",
    "userId": "uuid-do-usuario"
  }
  ```

- `GET /boards` — Listar todos os boards.
- `GET /boards/:id` — Buscar um board específico.
- `PATCH /boards/:id` — Atualizar um board.
- `DELETE /boards/:id` — Deletar um board.

#### ✅ Tasks

Todos os endpoints de Tasks requerem autenticação.

- `POST /tasks` — Criar uma task.

  **Exemplo de body:**

  ```json
  {
    "title": "Minha Nova Tarefa",
    "description": "Descrição da tarefa.",
    "boardId": "uuid-do-board",
    "status": "A fazer",
    "order": 1
  }
  ```

- `GET /tasks?boardId=uuid&page=1&limit=10` — Listar tasks com paginação.
- `GET /tasks/:id` — Buscar uma task específica.
- `PATCH /tasks/:id` — Atualizar uma task.
- `DELETE /tasks/:id` — Deletar uma task.

---

## 🧪 Rodando Testes 🚧

```bash
npm run test
```

---

## 🔗 Documentação Swagger 🚧

Após rodar o projeto, acesse:

```
http://localhost:3000/api
```

---

## 📂 Estrutura de Pastas

```
src
├── app           # Configurações e módulo principal da aplicação
├── auth          # Módulo de autenticação (guards, strategies, dtos)
├── board         # Módulo de quadros (controller, service, entities, dtos)
├── common        # Módulos comuns (pipes, interceptors, dtos)
├── task          # Módulo de tarefas (controller, service, entities, dtos)
├── user          # Módulo de usuários (controller, service, entities, dtos)
└── main.ts       # Arquivo de inicialização da aplicação
```

---

## ✅ Funcionalidades

- ✅ CRUD completo de User
- ✅ CRUD completo de Boards
- ✅ CRUD completo de Tasks
- ✅ Relacionamento entre Users → Boards → Tasks
- ✅ Delete em cascata (quando deleta um usuário, apaga seus boards e tasks)
- ✅ Validação de dados com class-validator
- 🚧 Paginação em Tasks
- ✅ Documentação Swagger
- ✅ Suporte a UUID
- ✅ Autenticação e autorização com JWT
- 🚧 Upload de Arquivos com o Express Multer
- 🚧 Testes unitários e e2e
- 🚧 Deploy

---

## 🧑‍💻 Autor

Desenvolvido por **Lemoswayne** 🚀

- GitHub: [@Lemoswayne](https://github.com/Lemoswayne)
- LinkedIn: [joaopedroxavierlemos](https://linkedin.com/in/joaopedroxavierlemos)
