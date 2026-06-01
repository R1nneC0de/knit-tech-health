-- AlterTable: add sequential orderNumber starting from 2026
ALTER TABLE "InquiryOrder" ADD COLUMN "orderNumber" SERIAL NOT NULL;

-- CreateIndex: unique constraint
CREATE UNIQUE INDEX "InquiryOrder_orderNumber_key" ON "InquiryOrder"("orderNumber");

-- Shift any existing rows so their numbers start at 2026
UPDATE "InquiryOrder" SET "orderNumber" = "orderNumber" + 2025;

-- Advance the sequence so the next inserted row gets max+1 (>= 2026)
SELECT setval('"InquiryOrder_orderNumber_seq"', COALESCE((SELECT MAX("orderNumber") FROM "InquiryOrder"), 2025), true);
