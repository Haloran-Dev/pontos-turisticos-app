Aplicação web para cadastro e listagem de pontos turísticos do país, desenvolvida com ASP.NET Core e React.

## Tecnologias

# Backend

- ASP.NET Core
- Entity Framework Core
- SQL Server Express

# Frontend

- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

# Infraestrutura

- Docker e Docker Compose
- Nginx 

### Rodando com Docker (recomendado)

# Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Clone o repositório
```bash
git clone 
cd pontos-turisticos-app
```

Crie o arquivo `.env` na raiz do projeto, com a variavel da senha do banco (A senha deve ter letras maiúsculas, minúsculas, números e símbolos)
```
SA_PASSWORD=SuaSenhaForte@123
```

Suba os containers**
```bash
docker compose up --build
```

Acesse a aplicação
O banco de dados e as tabelas são criados automaticamente na primeira execução.

### Rodando localmente

# Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

# API

1. Configure a connection string em `Backend/appsettings.json`
```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost\\SQLEXPRESS;Database=PontosTuristicos;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Rode o backend
```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run
```

O backend estará disponível em `http://localhost:3000`

# Frontend

Crie o arquivo `client/.env`
```
VITE_BASE_API_URL=http://localhost:3000/api
```

Rode o frontend
```bash
cd client
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`
