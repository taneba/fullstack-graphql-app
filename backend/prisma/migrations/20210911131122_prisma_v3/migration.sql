-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `todo_ibfk_1`;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user.email_unique` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user.uid_unique` TO `user_uid_key`;
