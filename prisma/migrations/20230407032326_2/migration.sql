/*
  Warnings:

  - Changed the type of `expiredAt` on the `Otp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Otp` DROP COLUMN `expiredAt`,
    ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;
