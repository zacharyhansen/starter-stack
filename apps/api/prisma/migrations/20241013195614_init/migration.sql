-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "foundation";

-- CreateEnum
CREATE TYPE "auth"."tenant" AS ENUM ('foundation');

-- CreateEnum
CREATE TYPE "auth"."schema" AS ENUM ('foundation');

-- CreateEnum
CREATE TYPE "public"."property_type" AS ENUM ('commercial', 'residential');

-- CreateEnum
CREATE TYPE "public"."building_type" AS ENUM ('condo', 'multi_family', 'single_family');

-- CreateEnum
CREATE TYPE "public"."environment_type" AS ENUM ('production', 'uat');

-- CreateEnum
CREATE TYPE "public"."state_usa" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateTable
CREATE TABLE "auth"."organization" (
    "id" VARCHAR(255) NOT NULL,
    "tenant" "auth"."tenant" NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "clerk_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."environment" (
    "schema" "auth"."schema" NOT NULL,
    "tenant" "auth"."tenant" NOT NULL,
    "organization_id" TEXT NOT NULL,
    "environment_type" "public"."environment_type" NOT NULL DEFAULT 'uat',

    CONSTRAINT "environment_pkey" PRIMARY KEY ("schema")
);

-- CreateTable
CREATE TABLE "foundation"."environment_user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role_slug" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "environment_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."user" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "address_line_2" TEXT,
    "city" VARCHAR(255),
    "zip_code" VARCHAR(255),
    "state" "public"."state_usa",
    "county" TEXT,
    "clerk_id" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" TEXT,
    "phone" VARCHAR(255),
    "ssn" VARCHAR(9),
    "date_of_birth" DATE,
    "credit_score" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."deal_status" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "deal_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."opportunity" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT,
    "active_deal_id" UUID,
    "assignee_id" UUID,
    "creator_id" UUID NOT NULL,
    "borrower_user_id" UUID,
    "borrower_business_id" UUID,
    "agent_id" UUID,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."deal" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "source" TEXT,
    "assignee_id" UUID,
    "creator_id" UUID NOT NULL,
    "winnability" INTEGER,
    "appetite" INTEGER,
    "ssbs_score" INTEGER,
    "loan_amount" DECIMAL(14,3),
    "interest_rate" DECIMAL(7,6),
    "loan_processing_fee" DECIMAL(10,3),
    "status_id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "userId" UUID,

    CONSTRAINT "deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."task_status" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."task_priority" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."task" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status_id" INTEGER NOT NULL,
    "assignee_id" UUID,
    "creator_id" UUID NOT NULL,
    "deal_id" UUID NOT NULL,
    "priority_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."property" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "address_line_2" TEXT,
    "city" VARCHAR(255),
    "zip_code" VARCHAR(255),
    "state" "public"."state_usa",
    "county" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "year_built" INTEGER,
    "area_sq_km" DOUBLE PRECISION,
    "type" "public"."property_type",
    "amenities" TEXT[],
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_census_at" TIMESTAMP(3),
    "building_type" "public"."building_type",
    "deal_id" UUID NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."deal_user" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "deal_id" UUID NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "deal_user_pkey" PRIMARY KEY ("deal_id","user_id")
);

-- CreateTable
CREATE TABLE "foundation"."business" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "address_line_2" TEXT,
    "city" VARCHAR(255),
    "zip_code" VARCHAR(255),
    "state" "public"."state_usa",
    "county" TEXT,
    "email" VARCHAR(255),
    "name_display" TEXT,
    "name_legal" TEXT,
    "duns" VARCHAR(9),
    "dba" VARCHAR(255),
    "tin" VARCHAR(9),
    "phone" TEXT,
    "business_type" TEXT,
    "industry" TEXT,
    "date_business_began" DATE,
    "revenue_average" DOUBLE PRECISION,
    "debt" DOUBLE PRECISION,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."business_user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_title" TEXT,
    "owernship" DOUBLE PRECISION,
    "income_average_monthly" DOUBLE PRECISION,
    "expense_average_monthly" DOUBLE PRECISION,

    CONSTRAINT "business_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation"."role" (
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("slug")
);


-- CreateIndex
CREATE UNIQUE INDEX "organization_external_id_key" ON "auth"."organization"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clerk_id_key" ON "auth"."organization"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_tenant_id_key" ON "auth"."organization"("tenant", "id");

-- CreateIndex
CREATE UNIQUE INDEX "environment_tenant_organization_id_environment_type_key" ON "auth"."environment"("tenant", "organization_id", "environment_type");

-- CreateIndex
CREATE UNIQUE INDEX "role_label_key" ON "foundation"."role"("label");

-- CreateIndex
CREATE UNIQUE INDEX "environment_user_user_id_key" ON "foundation"."environment_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_external_id_key" ON "auth"."user"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_clerk_id_key" ON "auth"."user"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "auth"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_external_id_key" ON "foundation"."deal_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_label_key" ON "foundation"."deal_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_external_id_key" ON "foundation"."opportunity"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_active_deal_id_key" ON "foundation"."opportunity"("active_deal_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_external_id_key" ON "foundation"."deal"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_external_id_key" ON "foundation"."task_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_label_key" ON "foundation"."task_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_external_id_key" ON "foundation"."task_priority"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_label_key" ON "foundation"."task_priority"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_external_id_key" ON "foundation"."task"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_external_id_key" ON "foundation"."property"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_user_id_key" ON "foundation"."deal_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_external_id_key" ON "foundation"."business"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_duns_key" ON "foundation"."business"("duns");

-- CreateIndex
CREATE UNIQUE INDEX "business_dba_key" ON "foundation"."business"("dba");

-- CreateIndex
CREATE UNIQUE INDEX "business_tin_key" ON "foundation"."business"("tin");

-- CreateIndex
CREATE UNIQUE INDEX "business_user_business_id_user_id_key" ON "foundation"."business_user"("business_id", "user_id");

-- AddForeignKey
ALTER TABLE "auth"."environment" ADD CONSTRAINT "environment_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "auth"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_active_deal_id_fkey" FOREIGN KEY ("active_deal_id") REFERENCES "foundation"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_borrower_business_id_fkey" FOREIGN KEY ("borrower_business_id") REFERENCES "foundation"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_borrower_user_id_fkey" FOREIGN KEY ("borrower_user_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."opportunity" ADD CONSTRAINT "opportunity_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal" ADD CONSTRAINT "deal_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal" ADD CONSTRAINT "deal_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal" ADD CONSTRAINT "deal_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "foundation"."opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal" ADD CONSTRAINT "deal_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "foundation"."deal_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."task" ADD CONSTRAINT "task_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."task" ADD CONSTRAINT "task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."task" ADD CONSTRAINT "task_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "foundation"."deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."task" ADD CONSTRAINT "task_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "foundation"."task_priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."task" ADD CONSTRAINT "task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "foundation"."task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."property" ADD CONSTRAINT "property_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "foundation"."deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal_user" ADD CONSTRAINT "deal_user_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "foundation"."deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."deal_user" ADD CONSTRAINT "deal_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundation"."business_user" ADD CONSTRAINT "business_user_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "foundation"."business"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foundation"."business_user" ADD CONSTRAINT "business_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."organization" DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "foundation"."environment_user" ADD CONSTRAINT "environment_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foundation"."environment_user" ADD CONSTRAINT "environment_user_role_slug_fkey" FOREIGN KEY ("role_slug") REFERENCES "foundation"."role"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
