-- Crie um banco de dados para o projeto, se ainda não existir
CREATE DATABASE IF NOT EXISTS ecommerce_cart_db;

-- Use o banco de dados recém-criado
USE ecommerce_cart_db;

-- Tabela de Usuários com Perfil Completo
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de Produtos (sem alterações)
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `imageUrl` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de Pedidos (Nova)
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `shipping_address` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- Tabela de Itens do Pedido (Nova)
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;


-- Inserindo alguns produtos de exemplo para teste
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `imageUrl`) VALUES
(1, 'Notebook Gamer Avançado', 'RTX 4080, 32GB RAM', 12500.00, 10, 'https://placehold.co/600x400/4f46e5/white?text=Notebook'),
(2, 'Mouse Sem Fio Ergonômico', '16000 DPI, 8 botões', 350.50, 50, 'https://placehold.co/600x400/10b981/white?text=Mouse'),
(3, 'Teclado Mecânico RGB', 'Switches blue, customizável', 499.90, 30, 'https://placehold.co/600x400/f59e0b/white?text=Teclado'),
(4, 'Monitor Ultrawide 34"', 'Curvo, 4K, 144Hz', 3200.00, 15, 'https://placehold.co/600x400/ef4444/white?text=Monitor');

