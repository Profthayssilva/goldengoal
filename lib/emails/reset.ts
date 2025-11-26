export function resetPasswordEmail(link: string) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 24px">
    <h2 style="color:#111">Redefinição de senha</h2>
    <p>Você solicitou a redefinição de senha da sua conta.</p>
    <p>Clique no botão abaixo para criar uma nova senha:</p>

    <p style="margin-top: 24px">
      <a href="${link}" 
         style="background:#facc15; padding:12px 20px; border-radius:8px;
                text-decoration:none; color:#111; font-weight:bold;">
        Redefinir senha
      </a>
    </p>

    <p style="margin-top: 32px; font-size: 12px; color:#666">
      Se você não reconhece esta ação, basta ignorar este email.
    </p>
  </div>
  `;
}
