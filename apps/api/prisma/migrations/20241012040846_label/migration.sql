/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `deal_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `deal_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "example_prod"."deal" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "example_prod"."deal_status" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "example_uat"."deal" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "example_uat"."deal_status" ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_label_key" ON "example_prod"."deal_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_label_key" ON "example_uat"."deal_status"("label");
