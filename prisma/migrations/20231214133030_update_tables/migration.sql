-- AlterTable
ALTER TABLE `articles` ADD COLUMN `categoryId` INTEGER NULL,
    ADD COLUMN `is_public` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `type` ENUM('Article', 'Category') NOT NULL DEFAULT 'Category';

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `is_public` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
