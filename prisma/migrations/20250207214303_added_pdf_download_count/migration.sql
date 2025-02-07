/*
  Warnings:

  - A unique constraint covering the columns `[userId,documentId]` on the table `ViewHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "DocumentDownloadCount" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DocumentDownloadCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentDownloadCount_documentId_key" ON "DocumentDownloadCount"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "ViewHistory_userId_documentId_key" ON "ViewHistory"("userId", "documentId");

-- AddForeignKey
ALTER TABLE "DocumentDownloadCount" ADD CONSTRAINT "DocumentDownloadCount_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
