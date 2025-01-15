/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'USER';

-- DropForeignKey
ALTER TABLE "AdminSession" DROP CONSTRAINT "AdminSession_adminId_fkey";

-- DropForeignKey
ALTER TABLE "PdfDocument" DROP CONSTRAINT "PdfDocument_authorId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "role" "Role";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "AdminSession";

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_userId_key" ON "Agency"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE INDEX "PdfDocument_authorId_idx" ON "PdfDocument"("authorId");

-- CreateIndex
CREATE INDEX "PdfPage_pdfDocumentId_idx" ON "PdfPage"("pdfDocumentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PdfDocument" ADD CONSTRAINT "PdfDocument_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
