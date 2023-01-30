/*
  Warnings:

  - You are about to drop the column `result` on the `Logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "result",
ADD COLUMN     "sourse" TEXT;
