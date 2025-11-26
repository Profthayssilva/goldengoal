import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export function generateResetToken() {
  return randomUUID() + randomUUID();
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}
