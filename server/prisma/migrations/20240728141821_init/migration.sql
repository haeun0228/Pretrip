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

--- Create Review Table
CREATE TABLE 'Review' (
    'id' VARCHAR(191) NOT NULL,
    'location_id' VARCHAR(191) NOT NULL,
    'user_name' VARCHAR(191) NOT NULL,
    'rating' TINYINT NOT NULL CHECK,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE CASCADE
    CONSTRAINT `rating_check` CHECK (rating BETWEEN 1 AND 5)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;