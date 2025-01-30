# Task Manager

## 📌 Descrição
Este projeto é uma aplicação web para gerenciamento de tarefas, permitindo criar, listar, editar e excluir tarefas. As tarefas possuem os seguintes campos:
- **Título**
- **Descrição**
- **Data de criação**
- **Data de conclusão**
- **Status** (pendente ou concluída)

A listagem de tarefas é ordenada pela data de criação, mostrando primeiro as tarefas mais recentes.

## 🚀 Tecnologias Utilizadas
- **Backend**: Java com [Quarkus](https://quarkus.io/)
- **Banco de Dados**: JPA/Hibernate (ORM)
- **Frontend**: React com TypeScript
- **API**: RESTful
- **Testes**: Testes automatizados no backend com JUnit
- **Containerização**: Docker e Docker Compose

## 🛠️ Como Executar o Projeto
### 🔧 Pré-requisitos
Certifique-se de ter instalados em sua máquina:
- [Docker](https://www.docker.com/) e Docker Compose

### 🛋️ Clonando o Repositório
```bash
git clone https://github.com/LopesEduarda/Task-Manager.git
cd task-manager
```

### 🐫 Subindo a Aplicação com Docker
1. Para subir a aplicação, execute:
```bash
docker-compose up --build
```
2. A aplicação estará acessível nos seguintes endereços:
   - **Backend**: `http://localhost:8081`
   - **Frontend**: `http://localhost:3000`

---

## 🔍 Rodando os Testes no Backend
Os testes são executados dentro do container Docker do backend.

### **1️⃣ Subir os containers**
Se os containers ainda não estiverem rodando, suba a aplicação com:
```sh
docker-compose up -d --build
```

### **2️⃣ Acessar o container do backend**
Para executar os testes dentro do container, primeiro acesse o terminal do backend:
```sh
docker ps  # Para encontrar o container
docker exec -it quarkus_dev /bin/sh
```

### **3️⃣ Rodar os testes**
Dentro do container, vá até a raiz do projeto e execute:
```sh
mvn test
```

### **4️⃣ Verificar os resultados**
Se os testes forem bem-sucedidos, você verá a seguinte saída:
```sh
[INFO] Tests run: 10, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```



## 📌 Endpoints da API
Os endpoints da API ficam acessíveis através da porta `8081`.

### 📌 Criar uma tarefa
`POST http://localhost:8081/tarefas`
```json
{
  "titulo": "Nova Tarefa",
  "descricao": "Descrição da tarefa",
  "status": "PENDENTE"
}
```

### 📌 Listar todas as tarefas
`GET http://localhost:8081/tarefas`

### 📌 Atualizar uma tarefa
`PUT http://localhost:8081/tarefas/{id}`
```json
{
  "titulo": "Tarefa Atualizada",
  "descricao": "Nova descrição",
  "status": "CONCLUIDA"
}
```

### 📌 Deletar uma tarefa
`DELETE http://localhost:8081/tarefas/{id}`

---



## 💎 Rodando o Frontend (React com TypeScript)
O frontend foi desenvolvido em **React com TypeScript** .

### **2️⃣ Desenvolvimento local **
Para rodar o frontend diretamente no seu ambiente local, siga estes passos:

1. Acesse a pasta do frontend:
```sh
cd frontend
```
2. Instale as dependências:
```sh
npm install
```
3. Inicie o servidor de desenvolvimento:
```sh
npm start
```
Isso abrirá automaticamente o navegador em `http://localhost:3000`.





