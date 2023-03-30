/*
  Warnings:

  - A unique constraint covering the columns `[id,url]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_id_url_key" ON "Link"("id", "url");
