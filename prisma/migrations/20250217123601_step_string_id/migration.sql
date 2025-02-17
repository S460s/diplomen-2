/*
  Warnings:

  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Step" DROP CONSTRAINT "Step_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Step_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Step_id_seq";
