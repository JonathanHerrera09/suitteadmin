# Host: localhost  (Version 5.5.5-10.4.32-MariaDB)
# Date: 2024-05-07 15:12:22
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "accounts"
#

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `bd_account` varchar(255) DEFAULT NULL,
  `kitchen` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "accounts"
#

INSERT INTO `accounts` VALUES (1,'Jonathan','apiprueba','demo',NULL,NULL),(2,'David','apidemo','apidemo',NULL,NULL);
