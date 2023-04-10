-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `contact_id` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `member` JSON NULL;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `Contact`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
