-- CreateTable
CREATE TABLE "StepCompleted" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "StepCompleted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepCompleted_stepId_key" ON "StepCompleted"("stepId");

-- AddForeignKey
ALTER TABLE "StepCompleted" ADD CONSTRAINT "StepCompleted_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCompleted" ADD CONSTRAINT "StepCompleted_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCompleted" ADD CONSTRAINT "StepCompleted_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
