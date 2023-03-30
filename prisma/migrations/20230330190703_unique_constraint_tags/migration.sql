/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_name_key" ON "Tag"("id", "name");
