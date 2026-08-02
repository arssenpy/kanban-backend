/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `List` table. All the data in the column will be lost.
  - Added the required column `order` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "position",
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "position",
ADD COLUMN     "order" INTEGER NOT NULL;
