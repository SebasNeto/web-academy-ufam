import { compare } from "bcryptjs";

import { prisma } from "../../lib/prisma";
import { LoginDto } from "./auth.types";

const DUMMY_PASSWORD_HASH =
  "$2b$10$AP.bTGLVTw76nmEzFPaXC.HHURbZ6ZgXoNsZecvPGAT9TZv3YmqPC";

export async function checkCredentials(data: LoginDto) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  const passwordMatches = await compare(
    data.senha,
    user?.password ?? DUMMY_PASSWORD_HASH
  );

  return user && passwordMatches ? user : null;
}
