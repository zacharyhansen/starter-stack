/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,user_id,role]` on the table `organization_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `deal_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `deal_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `organization_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal_status` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `deal_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `label` to the `deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `deal_status` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `deal_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('organization_admin', 'underwriter', 'agent', 'read_only', 'borrower');

-- DropIndex
DROP INDEX "auth"."organization_user_organization_id_user_id_key";

-- AlterTable
ALTER TABLE "auth"."organization_user" ADD COLUMN     "role" "public"."role" NOT NULL;

-- AlterTable
ALTER TABLE "example_prod"."deal" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "example_prod"."deal_status" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "example_prod"."deal_user" DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "example_prod"."opportunity" ADD COLUMN     "agent_id" UUID;

-- AlterTable
ALTER TABLE "example_uat"."deal" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "example_uat"."deal_status" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "example_uat"."deal_user" DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "example_uat"."opportunity" ADD COLUMN     "agent_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "organization_user_organization_id_user_id_role_key" ON "auth"."organization_user"("organization_id", "user_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_label_key" ON "example_prod"."deal_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "deal_user_id_key" ON "example_prod"."deal_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_label_key" ON "example_uat"."deal_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "deal_user_id_key" ON "example_uat"."deal_user"("id");

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
