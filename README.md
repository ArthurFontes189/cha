# Chá de Panela - Sistema de Presentes

## Instalação

1. Instale o Node.js (https://nodejs.org/)

2. Abra o terminal na pasta do projeto e execute:
```bash
npm install
```

## Executar o Servidor

```bash
npm start
```

O servidor estará rodando em: http://localhost:3000

## Acessar o Site

- **Página Principal**: http://localhost:3000/index.html
- **Administração**: http://localhost:3000/admin.html (senha: casamento2025)

## Banco de Dados

O sistema usa SQLite. O arquivo do banco será criado automaticamente como `cha-panela.db`

## API Endpoints

- GET `/api/products` - Lista todos os produtos
- GET `/api/products/availability` - Disponibilidade dos produtos
- POST `/api/selections` - Registrar presente
- GET `/api/selections` - Listar seleções (admin)
- DELETE `/api/selections/:id` - Remover seleção (admin)
- GET `/api/stats` - Estatísticas (admin)
