CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEn` varchar(500) NOT NULL,
	`titleEs` varchar(500) NOT NULL,
	`titleVal` varchar(500) NOT NULL,
	`imageKey` varchar(1000) NOT NULL,
	`imageUrl` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`visible` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
