export type Responsavel = {
  id: string;
  nome: string;
  email: string;
  telefone?: string | null;
  cpf?: string | null;
  endereco?: string | null;

  alunos?: {
    id: string;
    nome: string;
    serie: string;
  }[];

  createdAt?: string;
  updatedAt?: string;
};
