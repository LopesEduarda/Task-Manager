package com.tarefas.resource;

import com.tarefas.model.StatusTarefa;
import com.tarefas.model.Tarefa;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.List;

@Path("/tarefas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TarefaResource {

    @GET
    public List<Tarefa> listar() {
        return Tarefa.list("ORDER BY dataCriacao DESC");
    }

    @GET
    @Path("/{id}")
    public Response buscarTarefaPorId(@PathParam("id") Long id) {
        Tarefa tarefa = Tarefa.findById(id);
        if (tarefa == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(tarefa).build();
    }

    @POST
    @Transactional
    public Response adicionar(Tarefa tarefa) {
        if (tarefa.getTitulo() == null || tarefa.getTitulo().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Erro: O título da tarefa é obrigatório.")
                    .build();
        }

        if (tarefa.getDescricao() == null || tarefa.getDescricao().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Erro: A descrição da tarefa é obrigatória.")
                    .build();
        }

        tarefa.setDataCriacao(LocalDateTime.now());

        if (tarefa.getConcluida() != null && tarefa.getConcluida()) {
            tarefa.setStatus(StatusTarefa.CONCLUIDA);
            tarefa.setDataConclusao(LocalDateTime.now());
        } else {
            tarefa.setStatus(StatusTarefa.PENDENTE);
        }

        tarefa.persist();
        return Response.status(Response.Status.CREATED).entity(tarefa).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Tarefa tarefaAtualizada) {
        Tarefa tarefa = Tarefa.findById(id);

        if (tarefa == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Tarefa não encontrada").build();
        }

        if (tarefaAtualizada.getTitulo() != null && tarefaAtualizada.getTitulo().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Erro: O título da tarefa não pode estar vazio.")
                    .build();
        }

        if (tarefaAtualizada.getDescricao() != null && tarefaAtualizada.getDescricao().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Erro: A descrição da tarefa não pode estar vazia.")
                    .build();
        }

        if (tarefaAtualizada.getTitulo() != null) {
            tarefa.setTitulo(tarefaAtualizada.getTitulo());
        }
        if (tarefaAtualizada.getDescricao() != null) {
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
        }

        if (tarefaAtualizada.getConcluida() != null) {
            tarefa.setConcluida(tarefaAtualizada.getConcluida());

            if (tarefaAtualizada.getConcluida()) {
                tarefa.setStatus(StatusTarefa.CONCLUIDA);
                tarefa.setDataConclusao(LocalDateTime.now());
            } else {
                tarefa.setStatus(StatusTarefa.PENDENTE);
                tarefa.setDataConclusao(null);
            }
        }

        return Response.ok(tarefa).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deletar(@PathParam("id") Long id) {
        Tarefa tarefa = Tarefa.findById(id);
        if (tarefa == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Tarefa não encontrada!").build();
        }

        tarefa.delete();
        return Response.ok("Tarefa excluída com sucesso!").build();
    }
}