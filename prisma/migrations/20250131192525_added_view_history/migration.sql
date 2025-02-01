/*
  Warnings:

  - A unique constraint covering the columns `[coverImageKey]` on the table `PdfDocument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pdfKey]` on the table `PdfDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PdfDocument_coverImageKey_key" ON "PdfDocument"("coverImageKey");

-- CreateIndex
CREATE UNIQUE INDEX "PdfDocument_pdfKey_key" ON "PdfDocument"("pdfKey");
