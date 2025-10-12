-- CreateTable
CREATE TABLE "public"."Report" (
    "id" TEXT NOT NULL,
    "authodId" TEXT NOT NULL,
    "part" INTEGER NOT NULL,
    "sheets" INTEGER NOT NULL,
    "repoType" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "tags" TEXT[],
    "conversations" JSONB NOT NULL,
    "bookmark" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_authodId_fkey" FOREIGN KEY ("authodId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
