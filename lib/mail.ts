// lib/mail.ts

import { Resend } from "resend";
import nodemailer from "nodemailer";

// ============================
// 🔹 Resend (prioritário)
// ============================
const resendKey = process.env.RESEND_API_KEY;
export const resend = resendKey ? new Resend(resendKey) : null;

export async function sendResetEmail(email: string, link: string) {
  const html = `
    <p>Olá!</p>
    <p>Clique no link abaixo para redefinir sua senha:</p>
    <a href="${link}" target="_blank">${link}</a>
    <p>Este link expira em 30 minutos.</p>
  `;

  // 1) Se RESEND está configurado → envia por Resend
  if (resend) {
    try {
      await resend.emails.send({
        from: "no-reply@goldengoal.com",
        to: email,
        subject: "Recuperação de senha",
        html,
      });
      return;
    } catch (err) {
      console.error("[mail] ERRO ao enviar via Resend, tentando SMTP:", err);
    }
  }

  // 2) Se não tiver Resend, tenta SMTP
  await sendMail({
    to: email,
    subject: "Recuperação de senha",
    html,
  });
}

// ============================
// 🔹 SMTP (fallback)
// ============================
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || "no-reply@goldengoal.com";

let mailer: nodemailer.Transporter | null = null;

if (smtpHost && smtpUser && smtpPass) {
  mailer = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
} else {
  console.warn(
    "[mail] SMTP NÃO configurado. Configure SMTP_HOST, SMTP_USER, SMTP_PASS no .env"
  );
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!mailer) {
    console.warn(
      "[mail] Tentativa de enviar email SEM SMTP configurado:",
      options
    );
    return;
  }

  try {
    await mailer.sendMail({
      from: smtpFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    console.error("[mail] Erro ao enviar via SMTP:", err);
  }
}
