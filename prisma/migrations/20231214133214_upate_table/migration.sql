/*
  Warnings:

  - You are about to alter the column `type` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `type` ENUM('Article', 'Project') NOT NULL DEFAULT 'Project';
