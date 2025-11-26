export type Pagamento = {
  id: string;
  descricao: string;
  valor: number;
  status: "pendente" | "pago" | "vencido";
  vencimento: string;
  pagoEm?: string | null;

  alunoId: string;
  responsavelId: string;

  aluno?: {
    id: string;
    nome: string;
    serie: string;
  };

  responsavel?: {
    id: string;
    nome: string;
    email: string;
  };

  asaasClienteId?: string | null;
  asaasCobrancaId?: string | null;

  createdAt?: string;
  updatedAt?: string;
};
