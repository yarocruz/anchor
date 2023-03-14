/*
  Warnings:

  - You are about to drop the `_LinkToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LinkToTag" DROP CONSTRAINT "_LinkToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_LinkToTag" DROP CONSTRAINT "_LinkToTag_B_fkey";

-- DropTable
DROP TABLE "_LinkToTag";
