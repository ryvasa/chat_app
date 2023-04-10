/*
  Warnings:

  - You are about to drop the column `contact_id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `member` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_contact_id_fkey`;

-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_user_id_fkey`;

-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `contact_id`,
    DROP COLUMN `group_name`,
    DROP COLUMN `member`,
    DROP COLUMN `user_id`;

-- CreateTable
CREATE TABLE `GroupChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `chat_id` VARCHAR(191) NOT NULL,
    `member` JSON NULL,
    `group_name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GroupChat_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `chat_id` VARCHAR(191) NOT NULL,
    `contact_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PrivateChat_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupChat` ADD CONSTRAINT `GroupChat_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `Chat`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateChat` ADD CONSTRAINT `PrivateChat_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `Chat`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateChat` ADD CONSTRAINT `PrivateChat_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateChat` ADD CONSTRAINT `PrivateChat_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `Contact`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
