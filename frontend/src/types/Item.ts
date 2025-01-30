// export type Item = {
//   id: number;
//   titulo: string;
//   descricao: string;
//   concluida: boolean;
//   dataConclusao?: string | null;
// };


export type Item = {
    id: number;
    titulo: string;
    descricao: string;
    dataCriacao: string;
    dataConclusao?: string | null;
    concluida: boolean;
    status: "PENDENTE" | "CONCLUIDA"; // Status vem como string
};
