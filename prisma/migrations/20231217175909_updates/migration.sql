/*
  Warnings:

  - You are about to drop the column `userId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `name` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_userId_fkey`;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `userId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
