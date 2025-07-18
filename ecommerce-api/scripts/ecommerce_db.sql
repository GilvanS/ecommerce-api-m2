-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_cart_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ecommerce_cart_db`
--

/*!40000 DROP DATABASE IF EXISTS `ecommerce_cart_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ecommerce_cart_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ecommerce_cart_db`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Roupas','https://videos.openai.com/vg-assets/assets%2Ftask_01k0623pcmf6esd07r3y8hf8xk%2F1752550284_img_1.webp?st=2025-07-15T01%3A55%3A01Z&se=2025-07-21T02%3A55%3A01Z&sks=b&skt=2025-07-15T01%3A55%3A01Z&ske=2025-07-21T02%3A55%3A01Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Rv90TSU8eTf1p6c8dXf8kK0%2BRdJQbsqKIZG6fQWDx%2FY%3D&az=oaivgprodscus'),(2,'Calçados','https://videos.openai.com/vg-assets/assets%2Ftask_01k061n8v5emyv4fbjtc169mfb%2F1752549799_img_0.webp?st=2025-07-15T01%3A53%3A51Z&se=2025-07-21T02%3A53%3A51Z&sks=b&skt=2025-07-15T01%3A53%3A51Z&ske=2025-07-21T02%3A53%3A51Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=7GTPGjUzjBOkU28w%2BILaJMrt1q5yZwrrIvijhea9ekE%3D&az=oaivgprodscus'),(3,'Acessórios','https://videos.openai.com/vg-assets/assets%2Ftask_01k0627ny8evpvtvcxyf57eeqw%2F1752550397_img_0.webp?st=2025-07-15T01%3A56%3A09Z&se=2025-07-21T02%3A56%3A09Z&sks=b&skt=2025-07-15T01%3A56%3A09Z&ske=2025-07-21T02%3A56%3A09Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Vc2CtMDdaoi1leaH4rviO7ER7m6hiZb0c8zAmnVM%2FkY%3D&az=oaivgprodscus'),(4,'Eletrônicos','https://videos.openai.com/vg-assets/assets%2Ftask_01k0615masf1m9189k0sr4dh6v%2F1752549242_img_1.webp?st=2025-07-15T01%3A56%3A28Z&se=2025-07-21T02%3A56%3A28Z&sks=b&skt=2025-07-15T01%3A56%3A28Z&ske=2025-07-21T02%3A56%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=a4PB69e%2FQ6CxDwRGgoy6TV99igc4OX2SZhztKwS05mI%3D&az=oaivgprodscus'),(5,'Perfumaria','https://videos.openai.com/vg-assets/assets%2Ftask_01k062bbcse7783s1bnjxevm9b%2F1752550522_img_0.webp?st=2025-07-15T01%3A53%3A51Z&se=2025-07-21T02%3A53%3A51Z&sks=b&skt=2025-07-15T01%3A53%3A51Z&ske=2025-07-21T02%3A53%3A51Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=kJpfS0yNfKlGMbDMX3Wd5QkGe%2BDhOoLv035pPGXmad0%3D&az=oaivgprodscus'),(6,'Eletrodomésticos','https://videos.openai.com/vg-assets/assets%2Ftask_01k062gqftfrbvfxnbg61q7xxw%2F1752550709_img_1.webp?st=2025-07-15T01%3A55%3A08Z&se=2025-07-21T02%3A55%3A08Z&sks=b&skt=2025-07-15T01%3A55%3A08Z&ske=2025-07-21T02%3A55%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=BLB%2FXHCvBjcVcUGMELTeE%2Fg%2BkVbPn7UDHwr%2BsGIK2zw%3D&az=oaivgprodscus'),(7,'Televisores','https://videos.openai.com/vg-assets/assets%2Ftask_01k062mk50e1prf0bhfxxmgyfs%2F1752550821_img_1.webp?st=2025-07-15T01%3A55%3A01Z&se=2025-07-21T02%3A55%3A01Z&sks=b&skt=2025-07-15T01%3A55%3A01Z&ske=2025-07-21T02%3A55%3A01Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=uQVwKIgzmpUpxGfpPcIdoB2Dmia0EsE0pspa3ijkfjA%3D&az=oaivgprodscus'),(8,'Lazer','https://videos.openai.com/vg-assets/assets%2Ftask_01k062r10kfv6stfz7ea1qpq23%2F1752550931_img_1.webp?st=2025-07-15T01%3A55%3A08Z&se=2025-07-21T02%3A55%3A08Z&sks=b&skt=2025-07-15T01%3A55%3A08Z&ske=2025-07-21T02%3A55%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=9%2B3OLaKmhYIIonjdm%2FMs%2BgZHbSNfBGdqhuy9biuXdy0%3D&az=oaivgprodscus'),(9,'Periféricos','https://videos.openai.com/vg-assets/assets%2Ftask_01k061we09fh9stzmka8aej69k%2F1752550034_img_0.webp?st=2025-07-15T01%3A56%3A23Z&se=2025-07-21T02%3A56%3A23Z&sks=b&skt=2025-07-15T01%3A56%3A23Z&ske=2025-07-21T02%3A56%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=4pW1O0TPlfFwhJITunGkh37tWUxlqjwgWuEfLfkUrdE%3D&az=oaivgprodscus');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_product_favorite` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (19,595,13,'2025-07-18 22:23:43');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `shipping_address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `rating` float DEFAULT '0',
  `stock` int NOT NULL DEFAULT '0',
  `imageUrl` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT '1',
  `is_trending` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Notebook Gamer Avançado','RTX 4080, 32GB RAM',12500.00,10500.00,6,12,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mcjjrevradg4tqm2mx63n%2F1752502319_img_0.webp?st=2025-07-14T13%3A04%3A45Z&se=2025-07-20T14%3A04%3A45Z&sks=b&skt=2025-07-14T13%3A04%3A45Z&ske=2025-07-20T14%3A04%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=nmwWbKGVe8XXDzxesEO%2FcKj8PjQlhZpuH7MVfTyZKUM%3D&az=oaivgprodscus',4,1,1,'2025-07-13 07:55:22'),(2,'Mouse Sem Fio Ergonômico','16000 DPI, 8 botões',350.50,NULL,50,41,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mhtcffapr6ezrrhzh780w%2F1752502612_img_1.webp?st=2025-07-14T13%3A06%3A50Z&se=2025-07-20T14%3A06%3A50Z&sks=b&skt=2025-07-14T13%3A06%3A50Z&ske=2025-07-20T14%3A06%3A50Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=kXgSCllREUTxpvWVkz80q2tU1h%2FQOi9wuGPlH919ETk%3D&az=oaivgprodscus',9,1,0,'2025-07-13 07:55:22'),(3,'Tênis de Corrida','Leve e confortável para treinos',499.90,NULL,30,21,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04m21n3fynbpx06rn0rszf2%2F1752502069_img_1.webp?st=2025-07-14T13%3A05%3A25Z&se=2025-07-20T14%3A05%3A25Z&sks=b&skt=2025-07-14T13%3A05%3A25Z&ske=2025-07-20T14%3A05%3A25Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=saG2ehz3QBwIo22itKie3pwc2n7%2B3L7uU7zz%2BsJ8U3M%3D&az=oaivgprodscus',2,0,1,'2025-07-13 07:55:22'),(4,'Camiseta Básica','100% Algodão Pima',89.90,NULL,100,11,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mv3enep3t9aps9djs9v8s%2F1752502867_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Hg%2FPI4zZrXF8A0c2BAikrkSqZUxLg7eN1Cz0tIaeU%2B4%3D&az=oaivgprodscus',1,1,1,'2025-07-13 07:55:22'),(5,'Smart TV','Ótima qualidade de cor e som, Wi-fi 5.0ghz',4500.00,NULL,10,7,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04n0ft8f6tvxvzk9yv810az%2F1752503076_img_0.webp?st=2025-07-14T13%3A05%3A06Z&se=2025-07-20T14%3A05%3A06Z&sks=b&skt=2025-07-14T13%3A05%3A06Z&ske=2025-07-20T14%3A05%3A06Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=YTNN4Z7y0JLKliHxMJyu9mXi0fF9N4Upseqqp%2B%2BTe2I%3D&az=oaivgprodscus',7,1,1,'2025-07-13 10:00:48'),(6,'Parfum I\'Adore','Uma fragrância inesquecível.',450.50,NULL,50,1,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nfr86ep1rfcn8n8gcakn7%2F1752503441_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=83BoNEY2NE44bcv37yAAXOkDAi2ejmJTi10qSsnZcc4%3D&az=oaivgprodscus',5,1,0,'2025-07-13 10:00:48'),(7,'Batedeira','Faça bolos e tortas de ultima geração',499.90,NULL,30,22,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nrz5wechr0gm93xre6nf1%2F1752503748_img_1.webp?st=2025-07-14T13%3A07%3A26Z&se=2025-07-20T14%3A07%3A26Z&sks=b&skt=2025-07-14T13%3A07%3A26Z&ske=2025-07-20T14%3A07%3A26Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=f0RRBoC2k%2BigKPmOFyuAwqvfcSwL3zNPogMNhwB3GbA%3D&az=oaivgprodscus',6,0,1,'2025-07-13 10:00:48'),(8,'Barraca de Camping','Cabe você e toda sua família.',189.90,NULL,100,11,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nn6qffr4rnaj1gwqa5019%2F1752503662_img_0.webp?st=2025-07-14T13%3A04%3A45Z&se=2025-07-20T14%3A04%3A45Z&sks=b&skt=2025-07-14T13%3A04%3A45Z&ske=2025-07-20T14%3A04%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=BPSLydNKerLkiW5%2BA0LJMexLX3USmLQG1MFLwVwguSo%3D&az=oaivgprodscus',8,1,1,'2025-07-13 10:00:48'),(9,'Tablet xIAomi','Ótimo tablet de ultima geração.',784.50,NULL,4,11,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nw4m8ezzb1v03e9d3whtr%2F1752503847_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=YuOmsiRAC02cH2qEfLMnV%2FkF41orfTggsj4VluQ8Cug%3D&az=oaivgprodscus',4,1,0,'2025-07-13 18:59:39'),(10,'Computador IAntel','Maquina super avançada que toda minecraft no ultra.',5875.99,NULL,50,4,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05xrad4eket3ntp1hg83448%2F1752545690_img_1.webp?st=2025-07-15T01%3A01%3A23Z&se=2025-07-21T02%3A01%3A23Z&sks=b&skt=2025-07-15T01%3A01%3A23Z&ske=2025-07-21T02%3A01%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=QOFqQKpxZVRh3%2BkAuUWszbgX%2FnRaFhLghZMynP4EdqQ%3D&az=oaivgprodscus',4,1,0,'2025-07-15 08:14:49'),(11,'Teclado Mecânico','Teclado Gamer anti-ghost',354.99,NULL,51,4,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05y1078fm68whxnkr0cpv6j%2F1752546070_img_0.webp?st=2025-07-15T01%3A01%3A28Z&se=2025-07-21T02%3A01%3A28Z&sks=b&skt=2025-07-15T01%3A01%3A28Z&ske=2025-07-21T02%3A01%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=RKJ7nH8ou9nnlxI0Zg%2FBItb%2BUQaxJJ%2BiKKtEnyewu%2Bs%3D&az=oaivgprodscus',9,1,0,'2025-07-15 08:15:34'),(12,'Alexa Studio','Sua assistente virtual favorita.',478.99,NULL,15,3,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05yf7hpede8bcab7t3gewy9%2F1752546454_img_0.webp?st=2025-07-15T01%3A01%3A27Z&se=2025-07-21T02%3A01%3A27Z&sks=b&skt=2025-07-15T01%3A01%3A27Z&ske=2025-07-21T02%3A01%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=v17pbUYYgp4ZfxykuNJw0igEYGZHSkydW0RTUnJdJE0%3D&az=oaivgprodscus',4,1,0,'2025-07-15 08:16:10'),(13,'Bola de Futebol','Bola profissional para jogar em um gramado profissional.',478.99,250.00,22,5,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05yjtcye769ywmz5xwbkfx8%2F1752546531_img_1.webp?st=2025-07-15T01%3A00%3A08Z&se=2025-07-21T02%3A00%3A08Z&sks=b&skt=2025-07-15T01%3A00%3A08Z&ske=2025-07-21T02%3A00%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=2V%2FyfH4RNjbfYKCVFb4RX%2FaixBBArQocyL4nWsucIW8%3D&az=oaivgprodscus',8,1,0,'2025-07-15 08:17:04'),(14,'Oculos de Sol','Uma ótima proteção ao seus olhos.',353.99,299.99,0,18,'https://videos.openai.com/vg-assets/assets%2Ftask_01k09xrg6be1e8dfypzwsy7qc1%2F1752679890_img_1.webp?st=2025-07-16T14%3A17%3A02Z&se=2025-07-22T15%3A17%3A02Z&sks=b&skt=2025-07-16T14%3A17%3A02Z&ske=2025-07-22T15%3A17%3A02Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=PcUWvWhft8vm1ATgoE2vyCP1dbV4x3%2FLktoFFIH3qNU%3D&az=oaivgprodscus',3,1,1,'2025-07-16 18:33:41');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_case_results`
--

DROP TABLE IF EXISTS `test_case_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_case_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_run_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration_ms` int DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test_run_id` (`test_run_id`),
  CONSTRAINT `test_case_results_ibfk_1` FOREIGN KEY (`test_run_id`) REFERENCES `test_runs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_case_results`
--

LOCK TABLES `test_case_results` WRITE;
/*!40000 ALTER TABLE `test_case_results` DISABLE KEYS */;
INSERT INTO `test_case_results` VALUES (42,18,'deve retornar 405 para DELETE em /api/orders',2,'passed'),(43,18,'deve retornar 405 para GET em /api/favorites/1',1,'passed'),(44,18,'deve rejeitar login com senha incorreta',62,'passed'),(45,18,'deve retornar 400 se o campo \'city\' estiver faltando',1,'passed'),(46,18,'deve retornar 400 se o campo \'age\' estiver faltando',2,'passed'),(47,18,'deve retornar 405 para PUT em /api/products',2,'passed'),(48,18,'deve retornar 405 para GET em /api/categories',2,'passed'),(49,18,'deve retornar 405 para PUT em /api/users/register',1,'passed'),(50,18,'deve retornar 405 para DELETE em /api/categories',2,'passed'),(51,18,'deve retornar 405 para PUT em /api/orders',2,'passed'),(52,18,'deve retornar 400 se o campo \'name\' estiver faltando',1,'passed'),(53,18,'deve registrar um usuário com dados válidos',57,'passed'),(54,18,'deve impedir o registro com um e-mail inválido',2,'passed'),(55,18,'deve retornar 405 para DELETE em /api/products',1,'passed'),(56,18,'deve retornar 400 se o campo \'password\' estiver faltando',1,'passed'),(57,18,'deve retornar 405 para POST em /api/products/1',1,'passed'),(58,18,'deve retornar 405 para PUT em /api/favorites/1',2,'passed'),(59,18,'deve impedir o registro com um username já existente',105,'passed'),(60,18,'deve retornar 405 para GET em /api/categories/1',2,'passed'),(61,18,'deve autenticar com sucesso com credenciais válidas',62,'passed'),(62,18,'deve retornar 400 quando \'username\' não for enviado',2,'passed'),(63,18,'deve retornar 405 para DELETE em /api/favorites/1',1,'passed'),(64,18,'deve retornar 405 para GET em /api/users/login',1,'passed'),(65,18,'deve retornar 405 para GET em /api/users/register',2,'passed'),(66,18,'deve retornar 405 para DELETE em /api/users/login',1,'passed'),(67,18,'deve permitir redefinição de senha com token válido',2919,'passed'),(68,18,'deve retornar 400 se o campo \'email\' estiver faltando',1,'passed'),(69,18,'deve retornar erro quando o usuário não existe',3,'passed'),(70,18,'deve impedir o registro com uma senha fraca',1,'passed'),(71,18,'deve retornar 400 quando \'password\' não for enviado',2,'passed'),(72,18,'deve retornar 405 para PUT em /api/users/login',2,'passed'),(73,18,'deve retornar uma mensagem genérica ao solicitar recuperação de senha',2,'passed'),(74,18,'deve retornar 400 se o campo \'username\' estiver faltando',2,'passed'),(75,18,'deve rejeitar redefinição de senha com token inválido',2,'passed'),(76,18,'deve retornar 400 se o campo \'state\' estiver faltando',1,'passed'),(77,18,'deve bloquear a conta após 3 tentativas de login falhas',275,'passed'),(78,18,'deve retornar 405 para GET em /api/products/1',2,'passed'),(79,18,'deve prevenir tentativas de SQL injection',2,'passed'),(80,18,'deve retornar 405 para DELETE em /api/users/register',2,'passed'),(81,18,'deve retornar 405 para POST em /api/categories/1',2,'passed'),(82,18,'deve retornar 405 para PUT em /api/categories',2,'passed'),(83,19,'deve retornar 405 para POST em /api/categories/1',5,'failed'),(84,19,'deve retornar 405 para POST em /api/products/1',2,'passed'),(85,19,'deve retornar 405 para DELETE em /api/orders',2,'passed'),(86,19,'deve retornar 405 para DELETE em /api/categories',2,'failed'),(87,19,'deve retornar 405 para DELETE em /api/orders',2,'failed'),(88,19,'deve retornar 405 para GET em /api/favorites/1',1,'passed'),(89,19,'deve rejeitar login com senha incorreta',62,'passed'),(90,19,'deve retornar 400 se o campo \'city\' estiver faltando',1,'passed'),(91,19,'deve retornar 400 se o campo \'age\' estiver faltando',2,'passed'),(92,19,'deve retornar 405 para PUT em /api/products',2,'passed'),(93,19,'deve retornar 405 para GET em /api/categories',2,'passed'),(94,19,'deve registrar um usuário com dados válidos',3,'failed'),(95,19,'deve retornar 405 para PUT em /api/users/register',1,'passed'),(96,19,'deve retornar 405 para GET em /api/users/register',5,'passed'),(97,19,'deve retornar 405 para DELETE em /api/users/register',2,'passed'),(98,19,'deve retornar 405 para DELETE em /api/categories',2,'passed'),(99,19,'deve retornar 405 para PUT em /api/orders',2,'passed'),(100,19,'deve retornar 405 para PUT em /api/categories',3,'failed'),(101,19,'deve retornar 400 se o campo \'name\' estiver faltando',1,'passed'),(102,19,'deve registrar um usuário com dados válidos',57,'passed'),(103,19,'deve impedir o registro com um e-mail inválido',2,'passed'),(104,19,'deve retornar 405 para GET em /api/users/login',3,'passed'),(105,19,'deve retornar 405 para DELETE em /api/products',1,'passed'),(106,19,'deve retornar 400 se o campo \'password\' estiver faltando',1,'passed'),(107,19,'deve retornar 405 para POST em /api/products/1',1,'passed'),(108,19,'deve retornar 405 para PUT em /api/favorites/1',2,'passed'),(109,19,'deve impedir o registro com um username já existente',105,'passed'),(110,19,'deve retornar 405 para GET em /api/categories/1',2,'passed'),(111,19,'deve autenticar com sucesso com credenciais válidas',62,'passed'),(112,19,'deve retornar 405 para DELETE em /api/favorites/1',2,'failed'),(113,19,'deve retornar 405 para PUT em /api/favorites/1',1,'failed'),(114,19,'deve retornar 400 quando \'username\' não for enviado',2,'passed'),(115,19,'deve retornar 405 para DELETE em /api/favorites/1',1,'passed'),(116,19,'deve retornar 405 para GET em /api/categories',4,'failed'),(117,19,'deve retornar 405 para GET em /api/users/login',1,'passed'),(118,19,'deve retornar 405 para PUT em /api/users/register',2,'passed'),(119,19,'deve retornar 405 para GET em /api/users/register',2,'passed'),(120,19,'deve retornar 405 para DELETE em /api/users/login',1,'passed'),(121,19,'deve retornar 405 para PUT em /api/orders',2,'failed'),(122,19,'deve permitir redefinição de senha com token válido',2919,'passed'),(123,19,'deve retornar 405 para GET em /api/categories/1',2,'failed'),(124,19,'deve retornar 400 se o campo \'email\' estiver faltando',1,'passed'),(125,19,'deve retornar erro quando o usuário não existe',3,'passed'),(126,19,'deve impedir o registro com uma senha fraca',1,'passed'),(127,19,'deve retornar 400 quando \'password\' não for enviado',2,'passed'),(128,19,'deve retornar 405 para PUT em /api/users/login',2,'passed'),(129,19,'deve retornar uma mensagem genérica ao solicitar recuperação de senha',2,'passed'),(130,19,'deve retornar 405 para DELETE em /api/users/login',2,'passed'),(131,19,'deve retornar 400 se o campo \'username\' estiver faltando',2,'passed'),(132,19,'deve retornar 405 para PUT em /api/users/login',3,'passed'),(133,19,'deve rejeitar redefinição de senha com token inválido',2,'passed'),(134,19,'deve retornar 400 se o campo \'state\' estiver faltando',1,'passed'),(135,19,'deve retornar 405 para DELETE em /api/products',1,'passed'),(136,19,'deve bloquear a conta após 3 tentativas de login falhas',275,'passed'),(137,19,'deve retornar 405 para GET em /api/products/1',2,'passed'),(138,19,'deve retornar 405 para GET em /api/products/1',2,'passed'),(139,19,'deve prevenir tentativas de SQL injection',2,'passed'),(140,19,'deve retornar 405 para DELETE em /api/users/register',2,'passed'),(141,19,'deve retornar 405 para POST em /api/categories/1',2,'passed'),(142,19,'deve retornar 405 para GET em /api/favorites/1',2,'failed'),(143,19,'deve retornar 405 para PUT em /api/products',2,'passed'),(144,19,'deve retornar 405 para PUT em /api/categories',2,'passed');
/*!40000 ALTER TABLE `test_case_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_runs`
--

DROP TABLE IF EXISTS `test_runs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_runs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_tests` int NOT NULL,
  `passed` int NOT NULL,
  `failed` int NOT NULL,
  `skipped` int NOT NULL,
  `duration_ms` int DEFAULT NULL,
  `run_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_runs`
--

LOCK TABLES `test_runs` WRITE;
/*!40000 ALTER TABLE `test_runs` DISABLE KEYS */;
INSERT INTO `test_runs` VALUES (18,41,41,0,0,3538,'2025-07-18 21:49:24','2025-07-18 21:51:53'),(19,62,51,11,0,3590,'2025-07-18 21:49:24','2025-07-18 21:53:58');
/*!40000 ALTER TABLE `test_runs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `failed_login_attempts` int DEFAULT '0',
  `locked_until` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (595,'Admin Principal','teste@teste.com',99,'Sistema','SP','admin','$2a$10$ScnkkM/kLFxNxDfxbpzda.kd8XhKexA5bwgpZ0OiVh2gxF6CvgCcC','admin',0,NULL,'2025-07-18 21:47:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-18 19:28:39
