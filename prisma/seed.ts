import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/hash";

async function main() {
  const adminEmail = "admin@goldengoal.com";

  const exists = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!exists) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        role: "admin",
        hashedPassword: hashPassword("adminfut7goldengoal"),
      },
    });
    console.log("Administrador criado.");
  } else {
    console.log("Administrador já existe.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => console.error(e));
