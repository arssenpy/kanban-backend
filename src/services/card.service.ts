import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

export const cardService = {
  getByList: async (listId: string, userId: string) => {
    const list = await prisma.list.findFirst({
      where: { id: listId, board: { userId } },
    });
    if (!list) throw new AppError("List not found or access denied", 404);

    return prisma.card.findMany({
      where: { listId },
      orderBy: { order: "asc" },
    });
  },

  create: async (
    title: string,
    listId: string,
    order: number,
    userId: string,
  ) => {
    const list = await prisma.list.findFirst({
      where: { id: listId, board: { userId } },
    });
    if (!list) throw new AppError("List not found or access denied", 404);

    return prisma.card.create({ data: { title, listId, order } });
  },

  reorder: async (
    payload: { id: string; listId: string; order: number }[],
    userId: string,
  ) => {
    const targetListIds = Array.from(
      new Set(payload.map((item) => item.listId)),
    );

    const validLists = await prisma.list.findMany({
      where: {
        id: { in: targetListIds },
        board: { userId },
      },
    });

    if (validLists.length !== targetListIds.length) {
      throw new AppError(
        "Forbidden: Access denied to one of the target lists",
        403,
      );
    }

    return prisma.$transaction(
      payload.map((item) =>
        prisma.card.update({
          where: { id: item.id },
          data: { order: item.order, listId: item.listId },
        }),
      ),
    );
  },

  remove: async (cardId: string, userId: string) => {
    const card = await prisma.card.findFirst({
      where: { id: cardId },
      include: { list: { include: { board: true } } },
    });

    if (!card || card.list.board.userId !== userId) {
      throw new AppError("Card not found", 404);
    }

    await prisma.card.delete({ where: { id: cardId } });
  },
};
