import { sendEmail } from "./sendEmail";

export async function sendResetPasswordEmail(to: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  const html = `
    <p>Você solicitou a redefinição de senha.</p>
    <p>Clique no link abaixo para continuar:</p>
    <p><a href="${url}">${url}</a></p>
    <p>Se você não solicitou, ignore este e-mail.</p>
  `;

  await sendEmail(to, "Redefinição de senha", html);
}
