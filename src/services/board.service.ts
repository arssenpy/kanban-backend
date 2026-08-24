import { prisma } from "../config/prisma";

export const boardService = {
  getAllForUser: (userId: string) => {
    return prisma.board.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  },
  create: (title: string, userId: string) => {
    return prisma.board.create({ data: { title, userId } });
  },
};
