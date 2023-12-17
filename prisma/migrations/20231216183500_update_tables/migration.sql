/*
  Warnings:

  - Made the column `github` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `github` VARCHAR(191) NOT NULL DEFAULT '#';
