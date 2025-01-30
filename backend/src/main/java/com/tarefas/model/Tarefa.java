package com.tarefas.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "tarefas")
public class Tarefa extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tarefas_id_seq")
    @SequenceGenerator(name = "tarefas_id_seq", sequenceName = "tarefas_id_seq", allocationSize = 1)
    public Long id;

    public String titulo;
    public String descricao;
    public LocalDateTime dataCriacao;
    public LocalDateTime dataConclusao;
    public Boolean concluida;

    @Enumerated(EnumType.STRING)
    public StatusTarefa status;

    public Tarefa() {
    }

    public void setStatus(StatusTarefa status) {
        this.status = status;
    }

    public StatusTarefa getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = StatusTarefa.fromString(status);
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public Boolean getConcluida() {
        return concluida;
    }

    public void setConcluida(Boolean concluida) {
        this.concluida = concluida;
    }

}
