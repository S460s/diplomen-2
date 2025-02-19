-- DropForeignKey
ALTER TABLE "MapData" DROP CONSTRAINT "MapData_mapId_fkey";

-- DropForeignKey
ALTER TABLE "MapLike" DROP CONSTRAINT "MapLike_mapId_fkey";

-- DropForeignKey
ALTER TABLE "MapLike" DROP CONSTRAINT "MapLike_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_mapId_fkey";

-- AddForeignKey
ALTER TABLE "MapLike" ADD CONSTRAINT "MapLike_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapLike" ADD CONSTRAINT "MapLike_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapData" ADD CONSTRAINT "MapData_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
