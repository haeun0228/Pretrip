-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('TOUR', 'FOOD', 'SLEEP') NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `logitude` INTEGER NOT NULL,
    `latitude` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;