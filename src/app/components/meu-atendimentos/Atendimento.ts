export interface Atendimento {
    id: number;
    profissional: {
      nome: string;
      especialidade: string;
    };
    dataAtendimento: string;
    descricao: string;
    status_atendimentos: string;
}