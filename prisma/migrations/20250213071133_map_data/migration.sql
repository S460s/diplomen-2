-- CreateTable
CREATE TABLE "MapData" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "MapData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MapData_mapId_key" ON "MapData"("mapId");

-- AddForeignKey
ALTER TABLE "MapData" ADD CONSTRAINT "MapData_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
