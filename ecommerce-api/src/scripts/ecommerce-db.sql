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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (37,2,1,'2025-07-16 10:15:41'),(38,2,5,'2025-07-16 10:20:45'),(39,2,6,'2025-07-16 10:20:46');
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
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,4,1,89.90),(2,1,3,1,499.90),(3,1,2,1,350.50),(4,1,1,1,12500.00),(5,2,1,4,12500.00),(6,3,2,1,350.50),(7,3,3,1,499.90),(8,4,1,3,12500.00),(9,4,2,1,350.50),(10,4,7,1,499.90),(11,5,9,1,784.50),(12,6,9,2,784.50),(13,7,1,1,12500.00),(14,7,2,1,350.50),(15,7,3,1,499.90),(16,7,4,1,89.90),(17,7,8,1,189.90),(18,7,7,1,499.90),(19,7,6,1,450.50),(20,7,5,1,4500.00),(21,7,9,1,784.50),(22,8,1,2,12500.00),(23,9,2,2,350.50),(24,10,2,3,350.50),(25,11,1,4,12500.00);
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
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,13440.30,'boleto','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-13 02:04:12'),(2,2,50000.00,'pix','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-13 02:30:54'),(3,2,850.40,'boleto','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-13 03:30:35'),(4,2,38350.40,'pix','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-13 12:58:13'),(5,3,784.50,'pix','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-13 20:49:29'),(6,2,1569.00,'boleto','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-14 01:39:03'),(7,2,19865.10,'pix','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-14 15:14:16'),(8,2,25000.00,'pix','{\"cpf\":\"42230022873\",\"address\":\"Jose testinho\",\"number\":\"123\",\"complement\":\"\",\"cep\":\"16012535\",\"city\":\"Araçatuba\"}','2025-07-14 17:15:59'),(9,2,701.00,'pix','{\"cpf\":\"42230022873\",\"address\":\"Rua dos testes\",\"number\":\"123\",\"complement\":\"\",\"cep\":\"16012535\",\"city\":\"Araçatuba\"}','2025-07-15 12:27:09'),(10,2,1051.50,'pix','{\"cpf\":\"42230022873\",\"address\":\"manoel rodrigues gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"araçatuba\"}','2025-07-16 00:51:42'),(11,2,50000.00,'pix','{\"cpf\":\"42230022873\",\"address\":\"Manoel Rodrigues Gomes\",\"number\":\"373\",\"complement\":\"\",\"cep\":\"16012533\",\"city\":\"Araçatuba\"}','2025-07-16 09:47:42');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
  `stock` int NOT NULL DEFAULT '0',
  `imageUrl` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT '1',
  `is_trending` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Notebook Gamer Avançado','RTX 4080, 32GB RAM',12500.00,6,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mcjjrevradg4tqm2mx63n%2F1752502319_img_0.webp?st=2025-07-14T13%3A04%3A45Z&se=2025-07-20T14%3A04%3A45Z&sks=b&skt=2025-07-14T13%3A04%3A45Z&ske=2025-07-20T14%3A04%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=nmwWbKGVe8XXDzxesEO%2FcKj8PjQlhZpuH7MVfTyZKUM%3D&az=oaivgprodscus',4,1,1,'2025-07-13 01:55:22'),(2,'Mouse Sem Fio Ergonômico','16000 DPI, 8 botões',350.50,50,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mhtcffapr6ezrrhzh780w%2F1752502612_img_1.webp?st=2025-07-14T13%3A06%3A50Z&se=2025-07-20T14%3A06%3A50Z&sks=b&skt=2025-07-14T13%3A06%3A50Z&ske=2025-07-20T14%3A06%3A50Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=kXgSCllREUTxpvWVkz80q2tU1h%2FQOi9wuGPlH919ETk%3D&az=oaivgprodscus',4,1,0,'2025-07-13 01:55:22'),(3,'Tênis de Corrida','Leve e confortável para treinos',499.90,30,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04m21n3fynbpx06rn0rszf2%2F1752502069_img_1.webp?st=2025-07-14T13%3A05%3A25Z&se=2025-07-20T14%3A05%3A25Z&sks=b&skt=2025-07-14T13%3A05%3A25Z&ske=2025-07-20T14%3A05%3A25Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=saG2ehz3QBwIo22itKie3pwc2n7%2B3L7uU7zz%2BsJ8U3M%3D&az=oaivgprodscus',2,0,1,'2025-07-13 01:55:22'),(4,'Camiseta Básica','100% Algodão Pima',89.90,100,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04mv3enep3t9aps9djs9v8s%2F1752502867_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Hg%2FPI4zZrXF8A0c2BAikrkSqZUxLg7eN1Cz0tIaeU%2B4%3D&az=oaivgprodscus',1,1,1,'2025-07-13 01:55:22'),(5,'Smart TV','Ótima qualidade de cor e som, Wi-fi 5.0ghz',4500.00,10,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04n0ft8f6tvxvzk9yv810az%2F1752503076_img_0.webp?st=2025-07-14T13%3A05%3A06Z&se=2025-07-20T14%3A05%3A06Z&sks=b&skt=2025-07-14T13%3A05%3A06Z&ske=2025-07-20T14%3A05%3A06Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=YTNN4Z7y0JLKliHxMJyu9mXi0fF9N4Upseqqp%2B%2BTe2I%3D&az=oaivgprodscus',7,1,1,'2025-07-13 04:00:48'),(6,'Parfum I\'Adore','Uma fragrância inesquecível.',450.50,50,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nfr86ep1rfcn8n8gcakn7%2F1752503441_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=83BoNEY2NE44bcv37yAAXOkDAi2ejmJTi10qSsnZcc4%3D&az=oaivgprodscus',5,1,0,'2025-07-13 04:00:48'),(7,'Batedeira','Faça bolos e tortas de ultima geração',499.90,30,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nrz5wechr0gm93xre6nf1%2F1752503748_img_1.webp?st=2025-07-14T13%3A07%3A26Z&se=2025-07-20T14%3A07%3A26Z&sks=b&skt=2025-07-14T13%3A07%3A26Z&ske=2025-07-20T14%3A07%3A26Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=f0RRBoC2k%2BigKPmOFyuAwqvfcSwL3zNPogMNhwB3GbA%3D&az=oaivgprodscus',2,0,1,'2025-07-13 04:00:48'),(8,'Barraca de Camping','Cabe você e toda sua família.',189.90,100,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nn6qffr4rnaj1gwqa5019%2F1752503662_img_0.webp?st=2025-07-14T13%3A04%3A45Z&se=2025-07-20T14%3A04%3A45Z&sks=b&skt=2025-07-14T13%3A04%3A45Z&ske=2025-07-20T14%3A04%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=BPSLydNKerLkiW5%2BA0LJMexLX3USmLQG1MFLwVwguSo%3D&az=oaivgprodscus',1,1,1,'2025-07-13 04:00:48'),(9,'Tablet xIAomi','Ótimo tablet de ultima geração.',784.50,4,'https://videos.openai.com/vg-assets/assets%2Ftask_01k04nw4m8ezzb1v03e9d3whtr%2F1752503847_img_1.webp?st=2025-07-14T13%3A05%3A36Z&se=2025-07-20T14%3A05%3A36Z&sks=b&skt=2025-07-14T13%3A05%3A36Z&ske=2025-07-20T14%3A05%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=YuOmsiRAC02cH2qEfLMnV%2FkF41orfTggsj4VluQ8Cug%3D&az=oaivgprodscus',4,1,0,'2025-07-13 12:59:39'),(10,'Computador IAntel','Maquina super avançada que toda minecraft no ultra.',5875.99,50,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05xrad4eket3ntp1hg83448%2F1752545690_img_1.webp?st=2025-07-15T01%3A01%3A23Z&se=2025-07-21T02%3A01%3A23Z&sks=b&skt=2025-07-15T01%3A01%3A23Z&ske=2025-07-21T02%3A01%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=QOFqQKpxZVRh3%2BkAuUWszbgX%2FnRaFhLghZMynP4EdqQ%3D&az=oaivgprodscus',4,1,0,'2025-07-15 02:14:49'),(11,'Teclado Mecânico','Teclado Gamer anti-ghost',354.99,51,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05y1078fm68whxnkr0cpv6j%2F1752546070_img_0.webp?st=2025-07-15T01%3A01%3A28Z&se=2025-07-21T02%3A01%3A28Z&sks=b&skt=2025-07-15T01%3A01%3A28Z&ske=2025-07-21T02%3A01%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=RKJ7nH8ou9nnlxI0Zg%2FBItb%2BUQaxJJ%2BiKKtEnyewu%2Bs%3D&az=oaivgprodscus',4,1,0,'2025-07-15 02:15:34'),(12,'Alexa Studio','Sua assistente virtual favorita.',478.99,15,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05yf7hpede8bcab7t3gewy9%2F1752546454_img_0.webp?st=2025-07-15T01%3A01%3A27Z&se=2025-07-21T02%3A01%3A27Z&sks=b&skt=2025-07-15T01%3A01%3A27Z&ske=2025-07-21T02%3A01%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=v17pbUYYgp4ZfxykuNJw0igEYGZHSkydW0RTUnJdJE0%3D&az=oaivgprodscus',4,1,0,'2025-07-15 02:16:10'),(13,'Bola de Futebol','Bola profissional para jogar em um gramado profissional.',378.99,22,'https://videos.openai.com/vg-assets/assets%2Ftask_01k05yjtcye769ywmz5xwbkfx8%2F1752546531_img_1.webp?st=2025-07-15T01%3A00%3A08Z&se=2025-07-21T02%3A00%3A08Z&sks=b&skt=2025-07-15T01%3A00%3A08Z&ske=2025-07-21T02%3A00%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=2V%2FyfH4RNjbfYKCVFb4RX%2FaixBBArQocyL4nWsucIW8%3D&az=oaivgprodscus',8,1,0,'2025-07-15 02:17:04');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
  `age` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin',33,'Araçatuba','São Paulo','admin','$2a$10$FaXZcMetK5N50FsZDOBMQOv842ZrVcPYJupfQgJLgFSeaIMVmAmEW','admin','2025-07-13 02:02:34'),(3,'Christopher C. Santos',33,'Araçatuba','SP','closedman','$2a$10$EK9/z0fA3IAI4Wug03GNtec6ps2tGoeLidXoJoS0E1i.jDfB4C2aO','admin','2025-07-13 20:48:20'),(4,'Chris',33,'Araçatuba','SP','chris2','$2a$10$9bCFAtxvpYN2gSXQJB6WIOg8Aad5Cw8Bjpo2y1DinFgdCCvWFJlQ.','customer','2025-07-13 21:26:01');
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

-- Dump completed on 2025-07-16  7:33:04
