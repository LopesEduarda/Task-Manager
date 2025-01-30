package com.tarefas.resource;

import com.tarefas.model.Tarefa;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.*;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TarefaResourceTest {

        private static Long tarefaId;

        // Criar uma nova tarefa
        @Test
        @Order(1)
        public void testCriarTarefa() {
                String novaTarefaJson = """
                                    {
                                        "titulo": "Estudar Quarkus",
                                        "descricao": "Aprender Quarkus com Panache",
                                        "concluida": false
                                    }
                                """;

                tarefaId = RestAssured.given()
                                .contentType(ContentType.JSON)
                                .body(novaTarefaJson)
                                .when().post("/tarefas")
                                .then()
                                .statusCode(Response.Status.CREATED.getStatusCode())
                                .extract().jsonPath().getLong("id");

                System.out.println("✅ Tarefa criada com ID: " + tarefaId);
                assertNotNull(tarefaId, "Erro: O ID da tarefa não pode ser null!");
        }

        // Listar todas as tarefas
        @Test
        @Order(2)
        public void testListarTarefas() {
                List<Tarefa> tarefas = RestAssured.given()
                                .when().get("/tarefas")
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .extract().body().jsonPath().getList(".", Tarefa.class);

                assertNotNull(tarefas);
                assertFalse(tarefas.isEmpty());
        }

        // Buscar tarefa por ID
        @Test
        @Order(3)
        public void testBuscarTarefaPorId() {
                RestAssured.given()
                                .when().get("/tarefas/" + tarefaId)
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .body("id", equalTo(tarefaId.intValue()))
                                .body("titulo", equalTo("Estudar Quarkus"))
                                .body("status", equalTo("PENDENTE"));
        }

        // Atualizar uma tarefa existente
        @Test
        @Order(4)
        public void testAtualizarTarefa() {
                String payloadAtualizacao = """
                                    {
                                        "titulo": "Estudar Quarkus Avançado",
                                        "descricao": "Criar API REST com Quarkus",
                                        "concluida": true
                                    }
                                """;

                RestAssured.given()
                                .contentType(ContentType.JSON)
                                .body(payloadAtualizacao)
                                .when().put("/tarefas/" + tarefaId)
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .body("titulo", equalTo("Estudar Quarkus Avançado"))
                                .body("descricao", equalTo("Criar API REST com Quarkus"))
                                .body("status", equalTo("CONCLUIDA"))
                                .body("dataConclusao", notNullValue());
        }

        // Alterar tarefa para PENDENTE novamente
        @Test
        @Order(5)
        public void testMarcarTarefaComoPendente() {
                String payloadAtualizacao = """
                                    {
                                        "concluida": false
                                    }
                                """;

                RestAssured.given()
                                .contentType(ContentType.JSON)
                                .body(payloadAtualizacao)
                                .when().put("/tarefas/" + tarefaId)
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .body("status", equalTo("PENDENTE"))
                                .body("dataConclusao", nullValue());
        }

        // Deletar uma tarefa existente
        @Test
        @Order(6)
        public void testDeletarTarefa() {
                RestAssured.given()
                                .when().delete("/tarefas/" + tarefaId)
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .body(equalTo("Tarefa excluída com sucesso!"));
        }

        // Verificar que a tarefa foi deletada corretamente
        @Test
        @Order(7)
        public void testTarefaNaoEncontradaAposDelecao() {
                RestAssured.given()
                                .when().get("/tarefas/" + tarefaId)
                                .then()
                                .statusCode(Response.Status.NOT_FOUND.getStatusCode());
        }

        @Test
        @Order(8)
        public void testCriarTarefaSemTitulo() {
                String tarefaSemTituloJson = """
                                    {
                                        "descricao": "Tarefa sem título",
                                        "concluida": false
                                    }
                                """;

                RestAssured.given()
                                .contentType(ContentType.JSON)
                                .body(tarefaSemTituloJson)
                                .when().post("/tarefas")
                                .then()
                                .statusCode(Response.Status.BAD_REQUEST.getStatusCode())
                                .body(equalTo("Erro: O título da tarefa é obrigatório."));
        }

        @Test
        @Order(9)
        public void testCriarTarefaSemDescricao() {
                String tarefaSemDescricaoJson = """
                                    {
                                        "titulo": "Estudar Quarkus",
                                        "concluida": false
                                    }
                                """;

                RestAssured.given()
                                .contentType(ContentType.JSON)
                                .body(tarefaSemDescricaoJson)
                                .when().post("/tarefas")
                                .then()
                                .statusCode(Response.Status.BAD_REQUEST.getStatusCode())
                                .body(equalTo("Erro: A descrição da tarefa é obrigatória."));
        }

        @Test
        @Order(10)
        public void testListagemOrdenadaPorDataCriacao() {
                List<Tarefa> tarefas = RestAssured.given()
                                .when().get("/tarefas")
                                .then()
                                .statusCode(Response.Status.OK.getStatusCode())
                                .extract().body().jsonPath().getList(".", Tarefa.class);

                assertNotNull(tarefas);
                assertFalse(tarefas.isEmpty());

                // Validar que as tarefas estão ordenadas corretamente (mais recentes primeiro)
                for (int i = 0; i < tarefas.size() - 1; i++) {
                        assertTrue(
                                        tarefas.get(i).getDataCriacao().isAfter(tarefas.get(i + 1).getDataCriacao())
                                                        || tarefas.get(i).getDataCriacao()
                                                                        .isEqual(tarefas.get(i + 1).getDataCriacao()));
                }
        }

}
