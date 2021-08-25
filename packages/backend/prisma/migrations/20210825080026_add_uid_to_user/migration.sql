/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `uid` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `user.uid_unique` ON `user`(`uid`);
