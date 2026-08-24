import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

const SALT_ROUNDS = 10;

export const authService = {
  register: async (email: string, password: string, name?: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = signToken({ userId: user.id });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken({ userId: user.id });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  },

  getById: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError("User not found", 404);
    return { id: user.id, email: user.email, name: user.name };
  },
};
