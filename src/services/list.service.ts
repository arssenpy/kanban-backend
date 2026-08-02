import { prisma } from "../config/prisma";

export const listService = {
  getByBoard: (boardId: string) => {
    return prisma.list.findMany({
      where: { boardId },
      orderBy: { order: "asc" },
    });
  },

  create: (title: string, boardId: string, order: number) => {
    return prisma.list.create({ data: { title, boardId, order } });
  },

  reorder: (payload: { id: string; order: number }[]) => {
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
