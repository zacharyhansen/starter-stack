-- AlterEnum
ALTER TYPE "public"."role" ADD VALUE 'borrower';

-- AlterTable
ALTER TABLE "example_prod"."deal" ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "example_prod"."opportunity" ADD COLUMN     "agent_id" UUID;

-- AlterTable
ALTER TABLE "example_uat"."deal" ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "example_uat"."opportunity" ADD COLUMN     "agent_id" UUID;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
