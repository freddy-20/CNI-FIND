import bcrypt from "bcryptjs";

export async function verifyPassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(
    password,
    hashedPassword
  );
}
