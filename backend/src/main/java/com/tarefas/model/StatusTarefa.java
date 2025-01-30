package com.tarefas.model;

public enum StatusTarefa {
    PENDENTE, CONCLUIDA;

    public static StatusTarefa fromString(String status) {
        return StatusTarefa.valueOf(status.toUpperCase()); // Aceita "pendente" e "concluida" em qualquer formato
    }
}
