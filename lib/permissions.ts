export type Role =
  | "ADMIN"
  | "GESTOR"
  | "FINANCEIRO"
  | "PROFESSOR"
  | "RESPONSAVEL";

export const permissions: Record<Role, string[]> = {
  ADMIN: [
    "users.view",
    "users.manage",
    "finance.view",
    "finance.manage",
    "alunos.view",
    "alunos.manage",
    "responsaveis.view",
    "responsaveis.manage",
    "mensagens.view",
    "mensagens.manage",
    "dash.view",
  ],

  GESTOR: [
    "dash.view",
    "alunos.view",
    "responsaveis.view",
    "finance.view",
  ],

  FINANCEIRO: [
    "finance.view",
    "finance.manage",
    "responsaveis.view",
  ],

  PROFESSOR: [
    "alunos.view",
  ],

  RESPONSAVEL: [
    // acesso ao app do responsável (futuro)
  ],
};
