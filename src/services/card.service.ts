import { prisma } from "../config/prisma";

export const cardService = {
  getByList: (listId: string) => {
    return prisma.card.findMany({
      where: { listId },
      orderBy: { order: "asc" },
    });
  },
  create: (title: string, listId: string, order: number) => {
    return prisma.card.create({ data: { title, listId, order } });
  },

  reorder: (payload: { id: string; listId: string; order: number }[]) => {
    return prisma.$transaction(
      payload.map((item) =>
        prisma.card.update({
          where: { id: item.id },
          data: { order: item.order, listId: item.listId },
        }),
      ),
    );
  },
};
