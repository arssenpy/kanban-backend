import { prisma } from "../config/prisma";

export const boardService = {
  getAll: () => {
    return prisma.board.findMany({ orderBy: { createdAt: "asc" } });
  },
  create: (title: string) => {
    return prisma.board.create({ data: { title } });
  },
};
