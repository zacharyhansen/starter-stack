-- CreateEnum
CREATE TYPE "auth"."tenant" AS ENUM ('example_uat', 'example_prod');

-- CreateEnum
CREATE TYPE "public"."property_type" AS ENUM ('commercial', 'residential');

-- CreateEnum
CREATE TYPE "public"."building_type" AS ENUM ('condo', 'multi_family', 'single_family');

-- CreateEnum
CREATE TYPE "public"."environment_type" AS ENUM ('production', 'uat');

-- CreateEnum
CREATE TYPE "public"."state_usa" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateTable
CREATE TABLE "auth"."business" (
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
CREATE TABLE "auth"."business_user" (
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
CREATE TABLE "auth"."organization" (
    "id" VARCHAR(255) NOT NULL,
    "tenant" "auth"."tenant" NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "clerk_id" VARCHAR(255) NOT NULL,
    "environment_type" "public"."environment_type" NOT NULL DEFAULT 'uat',

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."organization_business" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" VARCHAR(255) NOT NULL,
    "business_id" UUID NOT NULL,

    CONSTRAINT "organization_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."organization_user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "organization_user_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "example_prod"."deal_status" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "deal_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."opportunity" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT,
    "active_deal_id" UUID,
    "assignee_id" UUID,
    "creator_id" UUID,
    "borrower_user_id" UUID,
    "borrower_business_id" UUID,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."deal" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "source" TEXT,
    "assignee_id" UUID,
    "creator_id" UUID,
    "winnability" INTEGER,
    "appetite" INTEGER,
    "ssbs_score" INTEGER,
    "loan_amount" DECIMAL(14,3),
    "interest_rate" DECIMAL(7,6),
    "loan_processing_fee" DECIMAL(10,3),
    "status_id" UUID NOT NULL,

    CONSTRAINT "deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."task_status" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."task_priority" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."task" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status_id" INTEGER NOT NULL,
    "assignee_id" UUID,
    "creator_id" UUID,
    "deal_id" UUID NOT NULL,
    "priority_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_prod"."property" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "example_prod"."deal_user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "deal_id" UUID NOT NULL,

    CONSTRAINT "deal_user_pkey" PRIMARY KEY ("deal_id","user_id")
);

-- CreateTable
CREATE TABLE "example_uat"."deal_status" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "deal_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."opportunity" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT,
    "active_deal_id" UUID,
    "assignee_id" UUID,
    "creator_id" UUID,
    "borrower_user_id" UUID,
    "borrower_business_id" UUID,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."deal" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "source" TEXT,
    "assignee_id" UUID,
    "creator_id" UUID,
    "winnability" INTEGER,
    "appetite" INTEGER,
    "ssbs_score" INTEGER,
    "loan_amount" DECIMAL(14,3),
    "interest_rate" DECIMAL(7,6),
    "loan_processing_fee" DECIMAL(10,3),
    "status_id" UUID NOT NULL,

    CONSTRAINT "deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."task_status" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."task_priority" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "task_priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."task" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status_id" INTEGER NOT NULL,
    "assignee_id" UUID,
    "creator_id" UUID,
    "deal_id" UUID NOT NULL,
    "priority_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example_uat"."property" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "example_uat"."deal_user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "deal_id" UUID NOT NULL,

    CONSTRAINT "deal_user_pkey" PRIMARY KEY ("deal_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_external_id_key" ON "auth"."business"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_duns_key" ON "auth"."business"("duns");

-- CreateIndex
CREATE UNIQUE INDEX "business_dba_key" ON "auth"."business"("dba");

-- CreateIndex
CREATE UNIQUE INDEX "business_tin_key" ON "auth"."business"("tin");

-- CreateIndex
CREATE UNIQUE INDEX "business_user_business_id_user_id_key" ON "auth"."business_user"("business_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_tenant_key" ON "auth"."organization"("tenant");

-- CreateIndex
CREATE UNIQUE INDEX "organization_external_id_key" ON "auth"."organization"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clerk_id_key" ON "auth"."organization"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_business_organization_id_business_id_key" ON "auth"."organization_business"("organization_id", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_user_organization_id_user_id_key" ON "auth"."organization_user"("organization_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_external_id_key" ON "auth"."user"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_clerk_id_key" ON "auth"."user"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "auth"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_external_id_key" ON "example_prod"."deal_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_external_id_key" ON "example_prod"."opportunity"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_active_deal_id_key" ON "example_prod"."opportunity"("active_deal_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_external_id_key" ON "example_prod"."deal"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_external_id_key" ON "example_prod"."task_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_label_key" ON "example_prod"."task_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_external_id_key" ON "example_prod"."task_priority"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_label_key" ON "example_prod"."task_priority"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_external_id_key" ON "example_prod"."task"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_title_key" ON "example_prod"."task"("title");

-- CreateIndex
CREATE UNIQUE INDEX "task_description_key" ON "example_prod"."task"("description");

-- CreateIndex
CREATE UNIQUE INDEX "property_external_id_key" ON "example_prod"."property"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_user_id_key" ON "example_prod"."deal_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_status_external_id_key" ON "example_uat"."deal_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_external_id_key" ON "example_uat"."opportunity"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_active_deal_id_key" ON "example_uat"."opportunity"("active_deal_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_external_id_key" ON "example_uat"."deal"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_external_id_key" ON "example_uat"."task_status"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_label_key" ON "example_uat"."task_status"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_external_id_key" ON "example_uat"."task_priority"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_priority_label_key" ON "example_uat"."task_priority"("label");

-- CreateIndex
CREATE UNIQUE INDEX "task_external_id_key" ON "example_uat"."task"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_title_key" ON "example_uat"."task"("title");

-- CreateIndex
CREATE UNIQUE INDEX "task_description_key" ON "example_uat"."task"("description");

-- CreateIndex
CREATE UNIQUE INDEX "property_external_id_key" ON "example_uat"."property"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_user_id_key" ON "example_uat"."deal_user"("id");

-- AddForeignKey
ALTER TABLE "auth"."business_user" ADD CONSTRAINT "business_user_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "auth"."business"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."business_user" ADD CONSTRAINT "business_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."organization_business" ADD CONSTRAINT "organization_business_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "auth"."business"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."organization_business" ADD CONSTRAINT "organization_business_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "auth"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."organization_user" ADD CONSTRAINT "organization_user_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "auth"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."organization_user" ADD CONSTRAINT "organization_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_active_deal_id_fkey" FOREIGN KEY ("active_deal_id") REFERENCES "example_prod"."deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_borrower_user_id_fkey" FOREIGN KEY ("borrower_user_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."opportunity" ADD CONSTRAINT "opportunity_borrower_business_id_fkey" FOREIGN KEY ("borrower_business_id") REFERENCES "auth"."business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal" ADD CONSTRAINT "deal_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal" ADD CONSTRAINT "deal_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal" ADD CONSTRAINT "deal_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "example_prod"."deal_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal" ADD CONSTRAINT "deal_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "example_prod"."opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."task" ADD CONSTRAINT "task_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."task" ADD CONSTRAINT "task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."task" ADD CONSTRAINT "task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "example_prod"."task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."task" ADD CONSTRAINT "task_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "example_prod"."task_priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."task" ADD CONSTRAINT "task_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_prod"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."property" ADD CONSTRAINT "property_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_prod"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal_user" ADD CONSTRAINT "deal_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_prod"."deal_user" ADD CONSTRAINT "deal_user_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_prod"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_active_deal_id_fkey" FOREIGN KEY ("active_deal_id") REFERENCES "example_uat"."deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_borrower_user_id_fkey" FOREIGN KEY ("borrower_user_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."opportunity" ADD CONSTRAINT "opportunity_borrower_business_id_fkey" FOREIGN KEY ("borrower_business_id") REFERENCES "auth"."business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal" ADD CONSTRAINT "deal_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal" ADD CONSTRAINT "deal_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal" ADD CONSTRAINT "deal_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "example_uat"."deal_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal" ADD CONSTRAINT "deal_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "example_uat"."opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."task" ADD CONSTRAINT "task_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."task" ADD CONSTRAINT "task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."task" ADD CONSTRAINT "task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "example_uat"."task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."task" ADD CONSTRAINT "task_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "example_uat"."task_priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."task" ADD CONSTRAINT "task_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_uat"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."property" ADD CONSTRAINT "property_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_uat"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal_user" ADD CONSTRAINT "deal_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example_uat"."deal_user" ADD CONSTRAINT "deal_user_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "example_uat"."deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
