-- DropForeignKey
ALTER TABLE "DocumentViewCount" DROP CONSTRAINT "DocumentViewCount_documentId_fkey";

-- DropForeignKey
ALTER TABLE "ViewHistory" DROP CONSTRAINT "ViewHistory_documentId_fkey";

-- DropForeignKey
ALTER TABLE "ViewHistory" DROP CONSTRAINT "ViewHistory_userId_fkey";

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentViewCount" ADD CONSTRAINT "DocumentViewCount_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
