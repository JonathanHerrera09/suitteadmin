# Host: localhost  (Version 5.5.5-10.4.32-MariaDB)
# Date: 2024-05-07 15:12:32
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "banners"
#

DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "banners"
#

INSERT INTO `banners` VALUES (5,'Banner principal alitas',NULL,'demo_CRAZY WINGS.png','2024-03-27 01:51:26','2024-03-27 01:51:26');

#
# Structure for table "categorys"
#

DROP TABLE IF EXISTS `categorys`;
CREATE TABLE `categorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "categorys"
#

INSERT INTO `categorys` VALUES (1,'Alitas','demo_alitas-de-pollo.png',NULL,'2024-03-27 02:02:18'),(2,'Hamburguesa','demo_hamburguesa.png',NULL,NULL),(3,'Entradas','demo_papas-fritas.png',NULL,'2024-03-27 02:02:56'),(4,'Bebidas','demo_jugos.png',NULL,'2024-03-27 02:03:04');

#
# Structure for table "config"
#

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `color_nav` varchar(255) DEFAULT NULL,
  `color_cart` varchar(255) DEFAULT NULL,
  `color_btn_p` varchar(255) DEFAULT NULL,
  `color_btn_n` varchar(255) DEFAULT NULL,
  `schedules` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `msgfinish` varchar(255) DEFAULT NULL,
  `color_footer` varchar(255) DEFAULT NULL,
  `color_card` varchar(255) DEFAULT NULL,
  `color_text_title` varchar(255) DEFAULT NULL,
  `color_bag_title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "config"
#

INSERT INTO `config` VALUES (1,'Crazy wings','demo_demo_crazylogo.png','#b5b5b5','#ff0000','#8f8f8f','#ff0000','Lunes - Sábado: 9:00 a. m. - 5:00 p. m. Domingo: 11:00 a. m. - 3:00 p. m.','Poblado Campestre Cali, Candelaria, Valle del Cauca Colombia','crazywings.jj@gmail.com','3124734154','Cena con nosotros o pide para llevar','Cena con nosotros o pide para llevar','#bababa','#ffffff','#f5f5f5','#ff0000',NULL,'2024-03-27 02:08:20');

#
# Structure for table "failed_jobs"
#

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "failed_jobs"
#


#
# Structure for table "migrations"
#

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "migrations"
#

INSERT INTO `migrations` VALUES (16,'2014_10_12_000000_create_users_table',1),(17,'2014_10_12_100000_create_password_reset_tokens_table',1),(18,'2019_08_19_000000_create_failed_jobs_table',1),(19,'2019_12_14_000001_create_personal_access_tokens_table',1),(20,'2024_01_10_002734_create_products_table',1);

#
# Structure for table "orders"
#

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `nbh` varchar(255) DEFAULT NULL,
  `paymeth` varchar(255) DEFAULT NULL,
  `typeService` varchar(255) DEFAULT NULL,
  `products` text DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "orders"
#

INSERT INTO `orders` VALUES (1,'3','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":3,\"priority\":2,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','traerlo rapido',16000,1,'2024-03-07 15:17:52','2024-05-03 15:23:11'),(2,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":3,\"priority\":1,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":4,\"priority\":2,\"category\":\"2\",\"name\":\"Hamburguesa sencilla\",\"description\":\"Hamburguesa sencilla\",\"price\":12000,\"img\":\"hamburguer.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','traerlo rapido',28000,1,'2024-03-07 15:25:40','2024-03-14 17:11:21'),(3,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":3,\"priority\":1,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":4,\"priority\":2,\"category\":\"2\",\"name\":\"Hamburguesa sencilla\",\"description\":\"Hamburguesa sencilla\",\"price\":12000,\"img\":\"hamburguer.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','traerlo rapido',28000,1,'2024-03-07 15:31:09','2024-03-07 15:39:45'),(4,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":3,\"priority\":1,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"stock\":0,\"created_at\":null,\"updated_at\":null,\"quantity\":2}]','traerlo rapido',32000,1,'2024-03-07 15:39:05','2024-03-07 20:57:44'),(5,'3',NULL,NULL,NULL,NULL,'3','[{\"id\":8,\"priority\":1,\"category\":\"3\",\"name\":\"Nachos\",\"description\":\"Nachos\",\"price\":4500,\"img\":\"papas.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":6,\"priority\":2,\"category\":\"2\",\"name\":\"Hamburguesa extra queso\",\"description\":\"Hamburguesa extra queso\",\"price\":16000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','cdsfsdf',20500,1,'2024-03-07 21:08:36','2024-03-18 03:42:17'),(6,'3',NULL,NULL,NULL,NULL,'3','[{\"id\":4,\"priority\":1,\"category\":\"2\",\"name\":\"Hamburguesa sencilla\",\"description\":\"Hamburguesa sencilla\",\"price\":12000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":3,\"priority\":2,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":1,\"priority\":2,\"category\":\"1\",\"name\":\"Pizza\",\"description\":\"pizza peperoni\",\"price\":15000,\"img\":\"pizza.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','d',43000,1,'2024-03-07 21:09:17','2024-03-18 03:42:06'),(7,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":4,\"priority\":1,\"category\":\"2\",\"name\":\"Hamburguesa sencilla\",\"description\":\"Hamburguesa sencilla\",\"price\":12000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":8,\"priority\":2,\"category\":\"3\",\"name\":\"Nachos\",\"description\":\"Nachos\",\"price\":4500,\"img\":\"papas.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','rapidoooo',16500,1,'2024-03-12 02:41:01','2024-03-12 02:41:54'),(8,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":4,\"priority\":2,\"category\":\"2\",\"name\":\"Hamburguesa sencilla\",\"description\":\"Hamburguesa sencilla\",\"price\":12000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1},{\"id\":8,\"priority\":2,\"category\":\"3\",\"name\":\"Nachos\",\"description\":\"Nachos\",\"price\":4500,\"img\":\"papas.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','rapidoooo',16500,1,'2024-03-12 13:59:59','2024-03-12 14:00:34'),(9,'Jonathan herrera','3126774392','calle 8a #00-00','manzanres sector1','nequi','1','[{\"id\":7,\"priority\":2,\"category\":\"3\",\"name\":\"Papas a la francesa\",\"description\":\"Papas a la francesa\",\"price\":5000,\"img\":\"papas.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','sin salsas',5000,1,'2024-03-30 20:10:10','2024-03-30 20:10:57'),(10,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":5,\"priority\":1,\"category\":\"2\",\"name\":\"Hamburguesa doble\",\"description\":\"Hamburguesa doble\",\"price\":15000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','a',15000,1,'2024-04-01 18:32:00','2024-04-01 18:32:00'),(11,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":5,\"priority\":1,\"category\":\"2\",\"name\":\"Hamburguesa doble\",\"description\":\"Hamburguesa doble\",\"price\":15000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','a',15000,1,'2024-04-01 18:35:04','2024-04-01 18:35:04'),(12,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":6,\"priority\":1,\"category\":\"2\",\"name\":\"Hamburguesa extra queso\",\"description\":\"Hamburguesa extra queso\",\"price\":16000,\"img\":\"hamburguer.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','sss',16000,1,'2024-04-01 18:43:36','2024-04-01 18:43:36'),(13,'Jonathan herrera','3126774392','cra 8va','manzanres sector1','nequi','1','[{\"id\":3,\"priority\":1,\"category\":\"1\",\"name\":\"Pizza 3\",\"description\":\"pizza carne\",\"price\":16000,\"img\":\"pizza.jpg\",\"created_at\":null,\"updated_at\":null,\"quantity\":1}]','s',16000,1,'2024-04-02 21:43:31','2024-04-02 21:43:31');

#
# Structure for table "password_reset_tokens"
#

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "password_reset_tokens"
#


#
# Structure for table "paymenth"
#

DROP TABLE IF EXISTS `paymenth`;
CREATE TABLE `paymenth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "paymenth"
#

INSERT INTO `paymenth` VALUES (1,'Contra Entrega','Recuerda decirnos con cuanto cancelas'),(2,'Transferencias','Envia tu soporte de pago para poder enviar tu pedido');

#
# Structure for table "personal_access_tokens"
#

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "personal_access_tokens"
#

INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'token','00a49d32c04343f488f050edbdca5352bd3106952bff5ba0807063854424474e','[\"*\"]','2024-03-05 02:53:15',NULL,'2024-03-05 02:53:13','2024-03-05 02:53:15'),(2,'App\\Models\\User',1,'token','95db256056f9fef9b9b6f51d745903f41c503320579da6455edbe8ac59d7108f','[\"*\"]','2024-03-05 02:53:25',NULL,'2024-03-05 02:53:14','2024-03-05 02:53:25'),(3,'App\\Models\\User',1,'token','d22aeccbfc6572f55b346b6d7982f633f7f577312a9b840fd4261c1465a0a6da','[\"*\"]','2024-03-05 03:10:47',NULL,'2024-03-05 03:05:51','2024-03-05 03:10:47'),(4,'App\\Models\\User',1,'token','93f7b3f5430efd25f34260d3fb90ea4b4902572373c7c67c2b32cf5a24907bb7','[\"*\"]','2024-03-05 03:10:58',NULL,'2024-03-05 03:10:58','2024-03-05 03:10:58'),(5,'App\\Models\\User',1,'token','aab184667651d6ff7ec9a217e26c8b72ef4822831b708f337fea5ef7e1c71ecd','[\"*\"]','2024-03-05 03:12:52',NULL,'2024-03-05 03:11:28','2024-03-05 03:12:52'),(6,'App\\Models\\User',1,'token','2379a8bffd76e41cc7984120bb0850167d78f1744ebf59c002cf8b2790e9cd5b','[\"*\"]','2024-03-05 03:13:30',NULL,'2024-03-05 03:13:09','2024-03-05 03:13:30'),(7,'App\\Models\\User',1,'token','f2995d0cc35307f227b5e34e849a6626b68a9ac935123db62c0f69eff3582fb1','[\"*\"]',NULL,NULL,'2024-03-05 03:14:13','2024-03-05 03:14:13'),(8,'App\\Models\\User',1,'token','20c619824ecab89e750f89be703717b44d6a599434a06b20a6f823605e4acd26','[\"*\"]','2024-03-05 14:14:27',NULL,'2024-03-05 03:14:49','2024-03-05 14:14:27'),(9,'App\\Models\\User',1,'token','24f97e0b4cbe0ef1e50b0adea6e56ecc03668a9998eed19f32149338119bc8c0','[\"*\"]','2024-03-05 16:00:17',NULL,'2024-03-05 14:45:54','2024-03-05 16:00:17'),(10,'App\\Models\\User',1,'token','3212447a2cf35393294d794fdff05064aeb7e29246218ff14fd5e0940834ef85','[\"*\"]','2024-03-05 16:00:54',NULL,'2024-03-05 16:00:28','2024-03-05 16:00:54'),(11,'App\\Models\\User',1,'token','2f28cea03ab5ed71c60f085d4436c0123bae322bad1c8b0b87adcc092569c28a','[\"*\"]','2024-03-05 16:01:22',NULL,'2024-03-05 16:01:18','2024-03-05 16:01:22'),(12,'App\\Models\\User',1,'token','10841703bb77017c49c2fe4cbf8d5dc9c5a787df51fa031ad12b1efea193bfce','[\"*\"]','2024-03-05 19:08:30',NULL,'2024-03-05 19:01:17','2024-03-05 19:08:30'),(13,'App\\Models\\User',1,'token','cfed8b2c94df0d4417c2cd1d89ef5bb23ad72129aad7d91195e44ba26860b624','[\"*\"]','2024-03-05 19:09:46',NULL,'2024-03-05 19:09:45','2024-03-05 19:09:46'),(14,'App\\Models\\User',1,'token','cee284f57b03a159a6bcef508be5ebf9e1b2d52ad400c560df4b38705d092b18','[\"*\"]','2024-03-05 19:10:36',NULL,'2024-03-05 19:10:35','2024-03-05 19:10:36'),(15,'App\\Models\\User',1,'token','44a936c5142043d9b3b0baad51df5e31e39f48806ea45d00e794e146a5e9ccde','[\"*\"]','2024-03-05 19:15:48',NULL,'2024-03-05 19:15:47','2024-03-05 19:15:48'),(16,'App\\Models\\User',1,'token','b8223c26308716274d18643edec3410f3f9a569b2113b6a6d7450a71e30936c4','[\"*\"]','2024-03-05 19:16:59',NULL,'2024-03-05 19:16:40','2024-03-05 19:16:59'),(17,'App\\Models\\User',1,'token','4f1f9ec7ed5c288bf0a33dc50486a37a2f71b8ca47fbd13d41b1567775ee96b7','[\"*\"]','2024-03-05 19:17:14',NULL,'2024-03-05 19:17:12','2024-03-05 19:17:14'),(18,'App\\Models\\User',1,'token','c475d4e21916e1b63c27f0badef035a620a531a89befa50f3fc17473e7581507','[\"*\"]','2024-03-05 19:18:31',NULL,'2024-03-05 19:17:40','2024-03-05 19:18:31'),(19,'App\\Models\\User',1,'token','88d2ba98a741830752f81f31791585a4b9ba370bfcc34074718db52f8016cb9e','[\"*\"]','2024-03-05 19:23:47',NULL,'2024-03-05 19:19:33','2024-03-05 19:23:47'),(20,'App\\Models\\User',1,'token','ef75949bfb737dce4f1d3a5dd48888c5a2de4d3f95365f7fe96ede6a09302aab','[\"*\"]','2024-03-05 19:27:55',NULL,'2024-03-05 19:27:54','2024-03-05 19:27:55'),(21,'App\\Models\\User',1,'token','e0a7a341297d9e4012eb5dccafa5e65eb66809b1eaec730df3741c54c38254e1','[\"*\"]','2024-03-06 01:23:45',NULL,'2024-03-05 19:28:23','2024-03-06 01:23:45'),(22,'App\\Models\\User',1,'token','60e07998554956b7faf32508a557b3b10b8a032f201e43cb2bcfe8ff94e8f4ab','[\"*\"]','2024-03-07 03:00:43',NULL,'2024-03-06 19:24:22','2024-03-07 03:00:43'),(23,'App\\Models\\User',1,'token','d75b7d4f9bc322b2fd51d4d8d8c5bbdbbcbcb173361f9023d40851a1895c494e','[\"*\"]','2024-03-07 17:32:22',NULL,'2024-03-07 15:18:25','2024-03-07 17:32:22'),(24,'App\\Models\\User',1,'token','ac6a60a689bc176b03364f858a5f193dabfcfcf3c7ac3c3b2735b2bff34ec8d3','[\"*\"]','2024-03-07 17:35:28',NULL,'2024-03-07 17:35:27','2024-03-07 17:35:28'),(25,'App\\Models\\User',1,'token','abee5474475f969975a24eaad4810596b58db706adb431c6ae61acf07db946df','[\"*\"]','2024-03-07 19:55:33',NULL,'2024-03-07 17:38:34','2024-03-07 19:55:33'),(26,'App\\Models\\User',1,'token','f3320e7299498f0d87b428176d322f24cc7902dfe1f887132c337035abe37aef','[\"*\"]','2024-03-07 20:13:30',NULL,'2024-03-07 19:57:58','2024-03-07 20:13:30'),(27,'App\\Models\\User',1,'token','15d67c71c5d4c726e96e33d191da63bb010d4788f79506baf4726eb2be3a0fd7','[\"*\"]','2024-03-07 20:17:12',NULL,'2024-03-07 20:13:42','2024-03-07 20:17:12'),(28,'App\\Models\\User',1,'token','0ebd2231697155883dbae209b8e69c6ca92fd508a31c7d1841195203cd6d6c87','[\"*\"]','2024-03-07 20:18:56',NULL,'2024-03-07 20:18:11','2024-03-07 20:18:56'),(29,'App\\Models\\User',1,'token','ed0477812679702275684dfe3c6bcf5b8b8d8d496e2b4ddffe917eef10015127','[\"*\"]','2024-03-07 20:21:41',NULL,'2024-03-07 20:19:06','2024-03-07 20:21:41'),(30,'App\\Models\\User',1,'token','ab67be524066db02f631a7614f00885d17c2ee557610c0073a36959f78017d37','[\"*\"]','2024-03-07 20:40:32',NULL,'2024-03-07 20:22:54','2024-03-07 20:40:32'),(31,'App\\Models\\User',1,'token','d14f3061bc3fdba17ed928f9db6d004908e0f90b93a3e545c93c13f7246da91a','[\"*\"]','2024-03-07 20:50:15',NULL,'2024-03-07 20:40:44','2024-03-07 20:50:15'),(32,'App\\Models\\User',1,'token','222e1a60bb42f0a5bca285760045afa4c083931348470e4b71a4449353471022','[\"*\"]','2024-03-08 20:00:33',NULL,'2024-03-07 20:50:31','2024-03-08 20:00:33'),(33,'App\\Models\\User',1,'token','2ebd5c6ed352d06be7e4040f466c67116239b2e0c38cb1029b985369cc9205ce','[\"*\"]',NULL,NULL,'2024-03-08 21:42:53','2024-03-08 21:42:53'),(34,'App\\Models\\User',1,'token','e8bc6161537aaac5297b54ca1be86d56af5d85d831fb0897736b7118a019fb21','[\"*\"]',NULL,NULL,'2024-03-08 21:45:31','2024-03-08 21:45:31'),(35,'App\\Models\\User',1,'token','68396d6615728b0529c3a1ba32f3c64cffd29edcd9b9e560c0432efd64b25204','[\"*\"]',NULL,NULL,'2024-03-08 21:55:10','2024-03-08 21:55:10'),(36,'App\\Models\\User',1,'token','2fb4f68d73f33af979c5ac5cc08e8fba9033d6e8d20f86f6aefbea45d8d6262d','[\"*\"]',NULL,NULL,'2024-03-12 02:38:45','2024-03-12 02:38:45'),(37,'App\\Models\\User',1,'token','7d327ef8c4355831c0d1ef51697f1cf2faff9c4d56d204b333435b810cd4eb1b','[\"*\"]',NULL,NULL,'2024-03-12 02:38:46','2024-03-12 02:38:46'),(38,'App\\Models\\User',1,'token','96c49826ad2de800bd1e3ae6b2d09aba52a930f07a07c61eef82e76b10d3bffe','[\"*\"]',NULL,NULL,'2024-03-12 13:58:39','2024-03-12 13:58:39'),(39,'App\\Models\\User',1,'token','93541bb8555d6bff2d5168a65ae965fd65e4a5a36825960c829684276b427714','[\"*\"]',NULL,NULL,'2024-03-12 13:58:40','2024-03-12 13:58:40'),(40,'App\\Models\\User',1,'token','cb945dc49dbb6994cd1a52484de8cde2c0b92fd9e108d7b86d8afae87f506ab8','[\"*\"]',NULL,NULL,'2024-03-18 03:41:43','2024-03-18 03:41:43'),(41,'App\\Models\\User',1,'token','b689b9a0b262953eb1395bdfed13db4cf82e76f15a659f2b18d714c316952120','[\"*\"]',NULL,NULL,'2024-03-18 03:41:43','2024-03-18 03:41:43'),(42,'App\\Models\\User',1,'token','f639106ca9429403ef758f86f3a4a71c094b6a636f559c8b0b26d12d9bd783d4','[\"*\"]',NULL,NULL,'2024-03-29 22:51:07','2024-03-29 22:51:07'),(43,'App\\Models\\User',1,'token','fb0dfab825b78826abc72e8afdf08f74e6fa7401deb8c962bdcc17d8b2e3825e','[\"*\"]',NULL,NULL,'2024-03-29 22:55:17','2024-03-29 22:55:17'),(44,'App\\Models\\User',1,'token','a0f39c0a1392a6d41f73ae56ba3c3fee9c5831e29ce866c41cc3f977ce48ad5d','[\"*\"]',NULL,NULL,'2024-04-01 19:36:15','2024-04-01 19:36:15'),(45,'App\\Models\\User',1,'token','1f21cf46517cb35f83f6b968334e33aea4b10713e6a5c818c414993a53535373','[\"*\"]',NULL,NULL,'2024-04-02 21:40:43','2024-04-02 21:40:43'),(46,'App\\Models\\User',1,'token','bd81d8b5cc0c983bfcc0b7dd072c848e74fbe187846304186c1201da5c86ac0b','[\"*\"]',NULL,NULL,'2024-04-02 21:40:44','2024-04-02 21:40:44'),(47,'App\\Models\\User',1,'token','992d24c8976664387868636a15ea8f59f3f670c7acf6cc00d4f58aca262af767','[\"*\"]',NULL,NULL,'2024-04-02 21:41:01','2024-04-02 21:41:01'),(48,'App\\Models\\User',1,'token','cb1c7c4cb350127bd9a3447ae4af26f1b8a72ec0d185ff3d9c79022de8954720','[\"*\"]',NULL,NULL,'2024-04-16 18:33:03','2024-04-16 18:33:03'),(49,'App\\Models\\User',1,'token','3a586f01c1a8fcb506b3eb9ca83665670363642b8358316735bffdff9dc66bd8','[\"*\"]',NULL,NULL,'2024-04-30 01:54:08','2024-04-30 01:54:08'),(50,'App\\Models\\User',1,'token','f5f2cc5e2c77027a3357599f5b2ecb0cc2d560dd9f8cb65b0c2f8d4f88382af3','[\"*\"]',NULL,NULL,'2024-05-01 21:11:10','2024-05-01 21:11:10'),(51,'App\\Models\\User',1,'token','1b4ea5d05e9a15f72992064152b88e04d74e5edce355fd88d4b79c39d8affbea','[\"*\"]',NULL,NULL,'2024-05-02 17:46:26','2024-05-02 17:46:26'),(52,'App\\Models\\User',1,'token','a11d9361b1872cbb4af927335727f533608c800aaa7733e11f80cf887186b352','[\"*\"]',NULL,NULL,'2024-05-03 15:19:40','2024-05-03 15:19:40');

#
# Structure for table "products"
#

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `priority` int(11) DEFAULT 1,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "products"
#

INSERT INTO `products` VALUES (2,1,'1','Pizza 2','pizza queso',12000,'pizza.jpg',NULL,NULL),(3,1,'1','Pizza 3','pizza carne',16000,'pizza.jpg',NULL,NULL),(4,1,'2','Hamburguesa sencilla','Hamburguesa sencilla',12000,'hamburguer.jpg',NULL,NULL),(5,1,'2','Hamburguesa doble','Hamburguesa doble',15000,'hamburguer.jpg',NULL,NULL),(6,1,'2','Hamburguesa extra queso','Hamburguesa extra queso',16000,'hamburguer.jpg',NULL,NULL),(7,1,'3','Papas a la francesa','Papas a la francesa',5000,'papas.jpg',NULL,NULL),(8,1,'3','Nachos','Nachos',4500,'papas.jpg',NULL,NULL),(13,1,'2','sdsds','sdfdsdfsdf',15020,'demo_salchipapa.png','2024-03-08 02:25:00','2024-03-27 02:06:53');

#
# Structure for table "status"
#

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "status"
#

INSERT INTO `status` VALUES (1,'Pendiente'),(2,'Cancelado'),(3,'Pagado'),(4,'Listo'),(5,'Entregado');

#
# Structure for table "type_services"
#

DROP TABLE IF EXISTS `type_services`;
CREATE TABLE `type_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "type_services"
#

INSERT INTO `type_services` VALUES (1,'Domicilio',NULL,NULL,NULL),(2,'Mesa 1',NULL,NULL,NULL),(3,'Mesa 2',NULL,NULL,NULL),(4,'Mesa 3',NULL,NULL,NULL),(5,'Mesa 4',NULL,NULL,NULL),(6,'mesa 5',NULL,'2024-03-08 02:57:05','2024-03-08 02:57:05');

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'Jonathan Herrera','ttherrera30@gmail.com',NULL,'admin','$2y$12$erE8EPYLwGCBsLHoa50FWuKjYgtBB6hOr.ijopQ/qo/YoXwdbxvg6',NULL,'2024-03-04 03:05:52','2024-03-04 03:05:52');
