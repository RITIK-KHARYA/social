/*
  Warnings:

  - Made the column `followerId` on table `Follow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followingId` on table `Follow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Follow" ALTER COLUMN "followerId" SET NOT NULL,
ALTER COLUMN "followingId" SET NOT NULL;
