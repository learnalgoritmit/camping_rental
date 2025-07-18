CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`title_en` text NOT NULL,
	`title_he` text NOT NULL,
	`description_en` text NOT NULL,
	`description_he` text NOT NULL,
	`price` integer NOT NULL,
	`image_url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_key_unique` ON `products` (`key`);