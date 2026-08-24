import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

export const listService = {
  getByBoard: async (boardId: string, userId: string) => {
    const board = await prisma.board.findFirst({
      where: { id: boardId, userId },
    });
    if (!board) throw new AppError("Board not found", 404);

    return prisma.list.findMany({
      where: { boardId },
      orderBy: { order: "asc" },
    });
  },

  create: async (
    title: string,
    boardId: string,
    order: number,
    userId: string,
  ) => {
    const board = await prisma.board.findFirst({
      where: { id: boardId, userId },
    });
    if (!board) throw new AppError("Board not found", 404);

    return prisma.list.create({ data: { title, boardId, order } });
  },

  reorder: async (payload: { id: string; order: number }[], userId: string) => {
    const listIds = Array.from(new Set(payload.map((item) => item.id)));

    const validLists = await prisma.list.findMany({
      where: {
        id: { in: listIds },
        board: { userId },
      },
    });

    if (validLists.length !== listIds.length) {
      throw new AppError("Forbidden: Access denied to one or more lists", 403);
    }

    return prisma.$transaction(
      payload.map((item) =>
        prisma.list.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );
  },
};
