CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT now(),
    data_conclusao TIMESTAMP,
    concluida BOOLEAN DEFAULT FALSE,
    status VARCHAR(255) DEFAULT 'PENDENTE'
);
