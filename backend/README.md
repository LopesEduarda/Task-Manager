# Testes do Backend - Task Manager

## 📊 Visão Geral
Este documento detalha os testes automatizados do backend da aplicação **Task Manager**, implementados utilizando **JUnit** e **RestAssured** para validar o funcionamento da API RESTful.

Os testes são executados dentro do ambiente **QuarkusTest**, garantindo que os endpoints funcionem conforme esperado.

---

## 🔍 Como Rodar os Testes

Os testes devem ser executados dentro do container Docker do backend.

### **1️⃣ Subir os containers**
```sh
docker-compose up -d --build
```

### **2️⃣ Acessar o container do backend**
```sh
docker exec -it quarkus_dev /bin/sh
```

### **3️⃣ Executar os testes**
```sh
mvn test
```

Para rodar um teste específico:
```sh
mvn -Dtest=TarefaResourceTest test
```

---

## 🔮 Descrição dos Testes

A classe `TarefaResourceTest.java` contém os seguintes testes:

### 1️⃣ **Criar uma Nova Tarefa**
**Método:** `testCriarTarefa`

- Envia um **POST** para `/tarefas` com uma nova tarefa.
- Verifica se o status da resposta é `201 CREATED`.
- Extrai o ID da nova tarefa criada e o armazena para testes futuros.
- **Erro esperado:** Nenhum.

### 2️⃣ **Listar Todas as Tarefas**
**Método:** `testListarTarefas`

- Envia um **GET** para `/tarefas`.
- Verifica se o status da resposta é `200 OK`.
- Verifica que a lista de tarefas retornadas **não está vazia**.

### 3️⃣ **Buscar uma Tarefa por ID**
**Método:** `testBuscarTarefaPorId`

- Envia um **GET** para `/tarefas/{id}`.
- Verifica se o status da resposta é `200 OK`.
- Valida que os dados retornados correspondem à tarefa criada.

### 4️⃣ **Atualizar uma Tarefa Existente**
**Método:** `testAtualizarTarefa`

- Envia um **PUT** para `/tarefas/{id}` com novos valores.
- Verifica se o status da resposta é `200 OK`.
- Confirma que os dados foram atualizados corretamente.

### 5️⃣ **Marcar uma Tarefa como Pendente**
**Método:** `testMarcarTarefaComoPendente`

- Altera uma tarefa concluída de volta para **pendente**.
- Verifica que o campo `status` é atualizado corretamente.

### 6️⃣ **Deletar uma Tarefa**
**Método:** `testDeletarTarefa`

- Envia um **DELETE** para `/tarefas/{id}`.
- Verifica se o status da resposta é `200 OK`.
- Confirma que a resposta retorna "Tarefa excluída com sucesso!".

### 7️⃣ **Verificar que a Tarefa Foi Deletada**
**Método:** `testTarefaNaoEncontradaAposDelecao`

- Tenta buscar a tarefa deletada enviando um **GET** para `/tarefas/{id}`.
- Verifica se o status da resposta é `404 NOT FOUND`.

### 8️⃣ **Criar uma Tarefa Sem Título (Erro Esperado)**
**Método:** `testCriarTarefaSemTitulo`

- Envia um **POST** para `/tarefas` sem o campo `titulo`.
- Verifica se o status da resposta é `400 BAD REQUEST`.
- Confirma que a resposta retorna "Erro: O título da tarefa é obrigatório.".

### 9️⃣ **Criar uma Tarefa Sem Descrição (Erro Esperado)**
**Método:** `testCriarTarefaSemDescricao`

- Envia um **POST** para `/tarefas` sem o campo `descricao`.
- Verifica se o status da resposta é `400 BAD REQUEST`.
- Confirma que a resposta retorna "Erro: A descrição da tarefa é obrigatória.".

### 🔟 **Listagem de Tarefas Ordenada por Data de Criação**
**Método:** `testListagemOrdenadaPorDataCriacao`

- Envia um **GET** para `/tarefas`.
- Verifica se o status da resposta é `200 OK`.
- Confirma que a lista está ordenada pela **data de criação** (tarefas mais recentes primeiro).

---

## 🎉 Conclusão
Este conjunto de testes garante que a API **Task Manager** funciona corretamente para criar, atualizar, listar e deletar tarefas, além de validar erros esperados. 
