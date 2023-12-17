/*
  Warnings:

  - Made the column `categoryId` on table `articles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_categoryId_fkey`;

-- AlterTable
ALTER TABLE `articles` MODIFY `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
