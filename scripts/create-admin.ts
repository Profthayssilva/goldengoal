/**
 * Script para criar o usuário ADMIN
 * Rodar com:
 *
 *   npx ts-node scripts/create-admin.ts
 *
 */

import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@goldengoal.com";
  const senha = "adminfut7goldengoal";

  console.log("🔐 Gerando hash da senha...");
  const hashed = await bcrypt.hash(senha, 12);

  console.log("👤 Verificando se administrador já existe...");
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("⚠️ Administrador já existe. Nada será alterado.");
    console.log(existing);
    return;
  }

  console.log("🆕 Criando administrador...");
  const user = await prisma.user.create({
    data: {
      email,
      name: "Administrador",
      role: "admin",
      hashedPassword: hashed,
    },
  });

  console.log("✅ Administrador criado com sucesso:");
  console.log(user);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
