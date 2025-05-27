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

## 🧪 Rodando Testes

```bash
npm run test
```

---

## 🔗 Documentação Swagger

Após rodar o projeto, acesse:

```
http://localhost:3000/api
```

---

## 📜 Endpoints Principais

### 🧑‍💼 Users

- `POST /users` — Criar um usuário
- `GET /users` — Listar todos os usuários
- `GET /users/:id` — Buscar um usuário
- `PATCH /users/:id` — Atualizar um usuário
- `DELETE /users/:id` — Deletar um usuário (deleta também boards e tasks relacionados)

### 🗂️ Boards

- `POST /boards` — Criar um board
- `GET /boards` — Listar todos os boards
- `GET /boards/:id` — Buscar um board específico
- `PATCH /boards/:id` — Atualizar um board
- `DELETE /boards/:id` — Deletar um board (deleta também tasks relacionadas)

### ✅ Tasks

- `POST /tasks` — Criar uma task
- `GET /tasks?boardId=uuid&page=1&limit=10` — Listar tasks com paginação
- `GET /tasks/:id` — Buscar uma task específica
- `PATCH /tasks/:id` — Atualizar uma task
- `DELETE /tasks/:id` — Deletar uma task

---

## 📂 Estrutura de Pastas

```
src
├── app.module.ts
├── common        # DTOs, filtros, interceptors, pipes
├── board         # Módulo de boards
├── task          # Módulo de tasks
└── user          # Módulo de usuários
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
- 🚧 Documentação Swagger
- ✅ Suporte a UUID
- 🚧 Autenticação e autorização com JWT

---

## 💡 Melhorias Futuras

- [ ] Implementar autenticação e autorização
- [ ] Adicionar filtros avançados (status, prioridade, etc.)
- [ ] Implementar os testes unitários e e2e
- [ ] CI/CD com GitHub Actions
- [ ] Deploy

---

## 🧑‍💻 Autor

Desenvolvido por **Lemoswayne** 🚀

- GitHub: [@Lemoswayne](https://github.com/Lemoswayne)
- LinkedIn: [joaopedroxavierlemos](https://linkedin.com/in/joaopedroxavierlemos)
