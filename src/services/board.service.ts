import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

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
  remove: async (boardId: string, userId: string) => {
    const board = await prisma.board.findFirst({
      where: { id: boardId, userId },
    });
    if (!board) throw new AppError("Board not found", 404);

    await prisma.board.delete({ where: { id: boardId } });
  },
};
