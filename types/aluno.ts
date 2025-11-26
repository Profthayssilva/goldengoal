export type Aluno = {
  id: string;
  nome: string;
  nascimento: string | null;
  serie: string;
  responsavelId: string;
  responsavel?: {
    id: string;
    nome: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
