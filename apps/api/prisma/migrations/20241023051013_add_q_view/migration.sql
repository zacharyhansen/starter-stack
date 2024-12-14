-- CreateTable
CREATE TABLE "foundation"."q_view" (
    "name" TEXT NOT NULL,
    "root_view" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "q_view_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "foundation"."q_columns" (
    "name" TEXT NOT NULL,
    "q_view_name" TEXT NOT NULL,
    "table_name" TEXT,
    "table_column_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "q_viewName" TEXT NOT NULL,

    CONSTRAINT "q_columns_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "q_columns_name_q_view_name_key" ON "foundation"."q_columns"("name", "q_view_name");

-- AddForeignKey
ALTER TABLE "foundation"."q_columns" ADD CONSTRAINT "q_columns_q_viewName_fkey" FOREIGN KEY ("q_viewName") REFERENCES "foundation"."q_view"("name") ON DELETE CASCADE ON UPDATE CASCADE;
