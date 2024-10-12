/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,user_id,role]` on the table `organization_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `organization_user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('organization_admin', 'underwriter', 'agent', 'read_only');

-- DropIndex
DROP INDEX "auth"."organization_user_organization_id_user_id_key";

-- AlterTable
ALTER TABLE "auth"."organization_user" ADD COLUMN     "role" "public"."role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organization_user_organization_id_user_id_role_key" ON "auth"."organization_user"("organization_id", "user_id", "role");
