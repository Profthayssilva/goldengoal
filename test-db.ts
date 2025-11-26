import { prisma } from "./lib/prisma.js";


async function main() {
  const result = await prisma.$queryRaw`SELECT 1 AS test`;
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
