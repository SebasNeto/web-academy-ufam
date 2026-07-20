import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

import { UserTypes } from "../src/resources/userType/userType.constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "admin" },
      { id: UserTypes.CLIENT, label: "client" },
    ],
    skipDuplicates: true,
  });

  await prisma.user.upsert({
    where: { email: "admin@expapi.com" },
    update: {
      userTypeId: UserTypes.ADMIN,
      name: "Administrador ExpApi",
    },
    create: {
      userTypeId: UserTypes.ADMIN,
      name: "Administrador ExpApi",
      email: "admin@expapi.com",
      password: await hash("admin123", 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
