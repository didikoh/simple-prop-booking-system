CREATE TABLE `agents` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` ENUM('active','inactive') NOT NULL DEFAULT 'active' COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_agent_email` (`email`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `agent_unit_permissions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`agent_id` INT NOT NULL,
	`unit_id` INT NOT NULL,
	`access` ENUM('view','book') NOT NULL DEFAULT 'book' COLLATE 'utf8mb4_0900_ai_ci',
	`is_allowed` TINYINT NOT NULL DEFAULT '1',
	`start_at` TIMESTAMP NULL DEFAULT NULL,
	`end_at` TIMESTAMP NULL DEFAULT NULL,
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_aup` (`agent_id`, `unit_id`, `access`) USING BTREE,
	INDEX `idx_aup_agent` (`agent_id`) USING BTREE,
	INDEX `idx_aup_unit` (`unit_id`) USING BTREE,
	CONSTRAINT `fk_aup_agent` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_aup_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `bookings` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`unit_id` INT NOT NULL,
	`buyer_id` INT NOT NULL,
	`agent_id` INT NOT NULL,
	`status` ENUM('reserved','paid','cancelled') NOT NULL DEFAULT 'reserved' COLLATE 'utf8mb4_0900_ai_ci',
	`amount` DECIMAL(12,2) NULL DEFAULT NULL,
	`reserved_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`paid_at` TIMESTAMP NULL DEFAULT NULL,
	`cancelled_at` TIMESTAMP NULL DEFAULT NULL,
	`expires_at` TIMESTAMP NULL DEFAULT NULL,
	`is_active` TINYINT(1) NOT NULL DEFAULT '1',
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_active_booking_per_unit` (`unit_id`, `is_active`) USING BTREE,
	INDEX `idx_bookings_unit` (`unit_id`) USING BTREE,
	INDEX `idx_bookings_buyer` (`buyer_id`) USING BTREE,
	INDEX `idx_bookings_status` (`status`) USING BTREE,
	INDEX `idx_bookings_agent` (`agent_id`) USING BTREE,
	CONSTRAINT `fk_bookings_agent` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT `fk_bookings_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT `fk_bookings_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `buyers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_buyer_email` (`email`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `developers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`website` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_developer_name` (`name`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

CREATE TABLE `levels` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`project_id` INT NOT NULL,
	`level_number` INT NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_project_level` (`project_id`, `level_number`) USING BTREE,
	INDEX `idx_levels_project` (`project_id`) USING BTREE,
	CONSTRAINT `fk_levels_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=51
;

CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`developer_id` INT NULL DEFAULT NULL,
	`estimate_complete_year` YEAR NULL DEFAULT NULL,
	`address` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_project_name` (`name`) USING BTREE,
	INDEX `fk_projects_developer` (`developer_id`) USING BTREE,
	CONSTRAINT `fk_projects_developer` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

CREATE TABLE `units` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`level_id` INT NOT NULL,
	`unit_number` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`size_sqft` INT NULL DEFAULT NULL,
	`price` DECIMAL(12,2) NULL DEFAULT NULL,
	`status` ENUM('available','locked','blocked','sold') NOT NULL DEFAULT 'available' COLLATE 'utf8mb4_0900_ai_ci',
	`buyer_id` INT NULL DEFAULT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `uq_level_unit` (`level_id`, `unit_number`) USING BTREE,
	INDEX `idx_units_level` (`level_id`) USING BTREE,
	INDEX `idx_units_status` (`status`) USING BTREE,
	INDEX `idx_units_buyer` (`buyer_id`) USING BTREE,
	CONSTRAINT `fk_units_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT `fk_units_level` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=201
;
