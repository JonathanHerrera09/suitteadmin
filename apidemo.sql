# Host: localhost  (Version 5.5.5-10.4.32-MariaDB)
# Date: 2024-05-07 15:12:45
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "banners"
#

INSERT INTO `banners` VALUES (1,'test',NULL,'https://img.freepik.com/vector-gratis/banner-contraccion-alimentos-diseno-plano_23-2149156279.jpg?t=st=1709693704~exp=1709697304~hmac=ebca3c9bd438ced20b8a0ede109e8244fb5e71e803e11ef93c404fea0eb5d468&w=2000',NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "categorys"
#

INSERT INTO `categorys` VALUES (1,'Pizza','https://img.freepik.com/vector-gratis/rebanada-pizza-derretida-icono-dibujos-animados-ilustracion_138676-2672.jpg?t=st=1709692321~exp=1709695921~hmac=3dea63ccdcc2d20d8415ac670c299bb45b3d89a2f14263daf7197d2a2770e4ad&w=1060',NULL,NULL),(2,'Hamburguesa','https://img.freepik.com/vector-gratis/ilustracion-icono-vector-dibujos-animados-sonriente-hamburguesa-linda-alimentos-objeto-icono-concepto-aislado-premium-plano_138676-6377.jpg?t=st=1709692378~exp=1709695978~hmac=4f4651d7b752b15eb133a959fdbcc9e8d911651c5',NULL,NULL),(3,'Entradas','https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-papas-fritas-concepto-icono-comida-rapida-aislado-estilo-dibujos-animados-plana_138676-2923.jpg?t=st=1709692431~exp=1709696031~hmac=b8608cfeb35c5e18bc295bbd5801ea84045720514a32fa9ca8',NULL,NULL),(4,'Bebidas','https://img.freepik.com/vector-gratis/batido-lindo-dibujos-animados-cereza_138676-2978.jpg?t=st=1709693905~exp=1709697505~hmac=6a140fc1d2420f8c034672a78372d90318558f647ae0b58660c27c98ce588825&w=1060',NULL,NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "orders"
#


#
# Structure for table "password_reset_tokens"
#

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "password_reset_tokens"
#


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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "personal_access_tokens"
#

INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'token','00a49d32c04343f488f050edbdca5352bd3106952bff5ba0807063854424474e','[\"*\"]','2024-03-05 02:53:15',NULL,'2024-03-05 02:53:13','2024-03-05 02:53:15'),(2,'App\\Models\\User',1,'token','95db256056f9fef9b9b6f51d745903f41c503320579da6455edbe8ac59d7108f','[\"*\"]','2024-03-05 02:53:25',NULL,'2024-03-05 02:53:14','2024-03-05 02:53:25'),(3,'App\\Models\\User',1,'token','d22aeccbfc6572f55b346b6d7982f633f7f577312a9b840fd4261c1465a0a6da','[\"*\"]','2024-03-05 03:10:47',NULL,'2024-03-05 03:05:51','2024-03-05 03:10:47'),(4,'App\\Models\\User',1,'token','93f7b3f5430efd25f34260d3fb90ea4b4902572373c7c67c2b32cf5a24907bb7','[\"*\"]','2024-03-05 03:10:58',NULL,'2024-03-05 03:10:58','2024-03-05 03:10:58'),(5,'App\\Models\\User',1,'token','aab184667651d6ff7ec9a217e26c8b72ef4822831b708f337fea5ef7e1c71ecd','[\"*\"]','2024-03-05 03:12:52',NULL,'2024-03-05 03:11:28','2024-03-05 03:12:52'),(6,'App\\Models\\User',1,'token','2379a8bffd76e41cc7984120bb0850167d78f1744ebf59c002cf8b2790e9cd5b','[\"*\"]','2024-03-05 03:13:30',NULL,'2024-03-05 03:13:09','2024-03-05 03:13:30'),(7,'App\\Models\\User',1,'token','f2995d0cc35307f227b5e34e849a6626b68a9ac935123db62c0f69eff3582fb1','[\"*\"]',NULL,NULL,'2024-03-05 03:14:13','2024-03-05 03:14:13'),(8,'App\\Models\\User',1,'token','20c619824ecab89e750f89be703717b44d6a599434a06b20a6f823605e4acd26','[\"*\"]','2024-03-05 14:14:27',NULL,'2024-03-05 03:14:49','2024-03-05 14:14:27'),(9,'App\\Models\\User',1,'token','24f97e0b4cbe0ef1e50b0adea6e56ecc03668a9998eed19f32149338119bc8c0','[\"*\"]','2024-03-05 16:00:17',NULL,'2024-03-05 14:45:54','2024-03-05 16:00:17'),(10,'App\\Models\\User',1,'token','3212447a2cf35393294d794fdff05064aeb7e29246218ff14fd5e0940834ef85','[\"*\"]','2024-03-05 16:00:54',NULL,'2024-03-05 16:00:28','2024-03-05 16:00:54'),(11,'App\\Models\\User',1,'token','2f28cea03ab5ed71c60f085d4436c0123bae322bad1c8b0b87adcc092569c28a','[\"*\"]','2024-03-05 16:01:22',NULL,'2024-03-05 16:01:18','2024-03-05 16:01:22'),(12,'App\\Models\\User',1,'token','10841703bb77017c49c2fe4cbf8d5dc9c5a787df51fa031ad12b1efea193bfce','[\"*\"]','2024-03-05 19:08:30',NULL,'2024-03-05 19:01:17','2024-03-05 19:08:30'),(13,'App\\Models\\User',1,'token','cfed8b2c94df0d4417c2cd1d89ef5bb23ad72129aad7d91195e44ba26860b624','[\"*\"]','2024-03-05 19:09:46',NULL,'2024-03-05 19:09:45','2024-03-05 19:09:46'),(14,'App\\Models\\User',1,'token','cee284f57b03a159a6bcef508be5ebf9e1b2d52ad400c560df4b38705d092b18','[\"*\"]','2024-03-05 19:10:36',NULL,'2024-03-05 19:10:35','2024-03-05 19:10:36'),(15,'App\\Models\\User',1,'token','44a936c5142043d9b3b0baad51df5e31e39f48806ea45d00e794e146a5e9ccde','[\"*\"]','2024-03-05 19:15:48',NULL,'2024-03-05 19:15:47','2024-03-05 19:15:48'),(16,'App\\Models\\User',1,'token','b8223c26308716274d18643edec3410f3f9a569b2113b6a6d7450a71e30936c4','[\"*\"]','2024-03-05 19:16:59',NULL,'2024-03-05 19:16:40','2024-03-05 19:16:59'),(17,'App\\Models\\User',1,'token','4f1f9ec7ed5c288bf0a33dc50486a37a2f71b8ca47fbd13d41b1567775ee96b7','[\"*\"]','2024-03-05 19:17:14',NULL,'2024-03-05 19:17:12','2024-03-05 19:17:14'),(18,'App\\Models\\User',1,'token','c475d4e21916e1b63c27f0badef035a620a531a89befa50f3fc17473e7581507','[\"*\"]','2024-03-05 19:18:31',NULL,'2024-03-05 19:17:40','2024-03-05 19:18:31'),(19,'App\\Models\\User',1,'token','88d2ba98a741830752f81f31791585a4b9ba370bfcc34074718db52f8016cb9e','[\"*\"]','2024-03-05 19:23:47',NULL,'2024-03-05 19:19:33','2024-03-05 19:23:47'),(20,'App\\Models\\User',1,'token','ef75949bfb737dce4f1d3a5dd48888c5a2de4d3f95365f7fe96ede6a09302aab','[\"*\"]','2024-03-05 19:27:55',NULL,'2024-03-05 19:27:54','2024-03-05 19:27:55'),(21,'App\\Models\\User',1,'token','e0a7a341297d9e4012eb5dccafa5e65eb66809b1eaec730df3741c54c38254e1','[\"*\"]','2024-03-06 01:23:45',NULL,'2024-03-05 19:28:23','2024-03-06 01:23:45'),(22,'App\\Models\\User',1,'token','60e07998554956b7faf32508a557b3b10b8a032f201e43cb2bcfe8ff94e8f4ab','[\"*\"]','2024-03-07 03:00:43',NULL,'2024-03-06 19:24:22','2024-03-07 03:00:43'),(23,'App\\Models\\User',1,'token','d75b7d4f9bc322b2fd51d4d8d8c5bbdbbcbcb173361f9023d40851a1895c494e','[\"*\"]','2024-03-07 17:32:22',NULL,'2024-03-07 15:18:25','2024-03-07 17:32:22'),(24,'App\\Models\\User',1,'token','ac6a60a689bc176b03364f858a5f193dabfcfcf3c7ac3c3b2735b2bff34ec8d3','[\"*\"]','2024-03-07 17:35:28',NULL,'2024-03-07 17:35:27','2024-03-07 17:35:28'),(25,'App\\Models\\User',1,'token','abee5474475f969975a24eaad4810596b58db706adb431c6ae61acf07db946df','[\"*\"]','2024-03-07 19:55:33',NULL,'2024-03-07 17:38:34','2024-03-07 19:55:33');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "products"
#

INSERT INTO `products` VALUES (1,1,'1','Pizza','pizza peperoni',15000,'pizza.jpg',NULL,NULL),(2,1,'1','Pizza 2','pizza queso',12000,'pizza.jpg',NULL,NULL),(3,1,'1','Pizza 3','pizza carne',16000,'pizza.jpg',NULL,NULL),(4,1,'2','Hamburguesa sencilla','Hamburguesa sencilla',12000,'hamburguer.jpg',NULL,NULL),(5,1,'2','Hamburguesa doble','Hamburguesa doble',15000,'hamburguer.jpg',NULL,NULL),(6,1,'2','Hamburguesa extra queso','Hamburguesa extra queso',16000,'hamburguer.jpg',NULL,NULL),(7,1,'3','Papas a la francesa','Papas a la francesa',5000,'papas.jpg',NULL,NULL),(8,1,'3','Nachos','Nachos',4500,'papas.jpg',NULL,NULL),(9,1,'3','patacones','patacones',3000,'papas.jpg',NULL,NULL),(10,1,'2','sdfsdf','sdfsdf',1111,NULL,'2024-03-07 18:38:51','2024-03-07 18:38:51'),(11,1,'2','sdfsdf','sdfsdf',1111,NULL,'2024-03-07 18:40:54','2024-03-07 18:40:54'),(12,1,'2','sdfsdf','sdfsdf',1111,'BROOX.jpeg','2024-03-07 18:41:45','2024-03-07 18:41:45');

#
# Structure for table "status"
#

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "status"
#

INSERT INTO `status` VALUES (1,'Pendiente'),(2,'Cancelado'),(3,'Pagado'),(4,'Listo');

#
# Structure for table "type_services"
#

DROP TABLE IF EXISTS `type_services`;
CREATE TABLE `type_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "type_services"
#

INSERT INTO `type_services` VALUES (1,'Domicilio',NULL,NULL),(2,'Mesa 1',NULL,NULL),(3,'Mesa 2',NULL,NULL),(4,'Mesa 3',NULL,NULL),(5,'Mesa 4',NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'Jonathan Herrera','ttherrera30@gmail.com',NULL,'admin','$2y$12$erE8EPYLwGCBsLHoa50FWuKjYgtBB6hOr.ijopQ/qo/YoXwdbxvg6',NULL,'2024-03-04 03:05:52','2024-03-04 03:05:52');
