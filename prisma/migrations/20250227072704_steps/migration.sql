/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,stepId]` on the table `StepCompleted` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StepCompleted_ownerId_stepId_key" ON "StepCompleted"("ownerId", "stepId");
