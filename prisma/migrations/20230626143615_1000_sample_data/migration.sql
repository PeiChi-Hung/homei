-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "sold_price" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "post_code" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
