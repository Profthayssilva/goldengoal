import { sendMail } from "@/lib/mail";

export async function sendResetPasswordEmail(to: string, token: string) {
  const url = `${process.env.APP_URL}/reset/${token}`;

  const html = `
    <p>Você solicitou a redefinição de senha.</p>
    <p>Clique no link abaixo para continuar:</p>
    <p><a href="${url}">${url}</a></p>
    <p>Se você não solicitou, ignore este e-mail.</p>
  `;

  await sendMail({
    to,
    subject: "Redefinição de senha",
    html,
  });
}
