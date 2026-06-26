/*
  Warnings:

  - You are about to drop the `autores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `autorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `edicoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `editoras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `livros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `autorias` DROP FOREIGN KEY `autorias_cod_livro_fkey`;

-- DropForeignKey
ALTER TABLE `autorias` DROP FOREIGN KEY `autorias_id_autor_fkey`;

-- DropForeignKey
ALTER TABLE `edicoes` DROP FOREIGN KEY `edicoes_cod_livro_fkey`;

-- DropForeignKey
ALTER TABLE `edicoes` DROP FOREIGN KEY `edicoes_id_editora_fkey`;

-- DropTable
DROP TABLE `autores`;

-- DropTable
DROP TABLE `autorias`;

-- DropTable
DROP TABLE `edicoes`;

-- DropTable
DROP TABLE `editoras`;

-- DropTable
DROP TABLE `livros`;

-- CreateTable
CREATE TABLE `categoria` (
    `IdCat` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(50) NULL,

    PRIMARY KEY (`IdCat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `CPF` VARCHAR(14) NOT NULL,
    `nomeCompleto` VARCHAR(100) NULL,
    `dataNascimento` DATE NULL,
    `email` VARCHAR(100) NULL,
    `celular` VARCHAR(20) NULL,

    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `IdEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `CEP` VARCHAR(10) NULL,
    `rua` VARCHAR(100) NULL,
    `cidade` VARCHAR(50) NULL,
    `CPFClientes` VARCHAR(14) NULL,

    INDEX `CPFClientes`(`CPFClientes`),
    PRIMARY KEY (`IdEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategoria` (
    `IdSub` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `IdCat` INTEGER NULL,

    INDEX `IdCat`(`IdCat`),
    PRIMARY KEY (`IdSub`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `IdProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `fabricante` VARCHAR(50) NULL,
    `produto` VARCHAR(50) NULL,
    `quantidadeDisponivel` INTEGER NULL,
    `precoBase` DECIMAL(10, 2) NULL,
    `IdSub` INTEGER NULL,

    INDEX `IdSub`(`IdSub`),
    PRIMARY KEY (`IdProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `numerosdeserie` (
    `IdProduto` INTEGER NOT NULL,
    `numeroSerie` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`IdProduto`, `numeroSerie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra` (
    `IdCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `formaPagamento` VARCHAR(50) NULL,
    `totalCalculado` DECIMAL(10, 2) NULL,
    `desconto` DECIMAL(10, 2) NULL,
    `dataHoraCompra` DATETIME(3) NULL,
    `CPFClientes` VARCHAR(14) NULL,
    `IdEndereco` INTEGER NULL,

    INDEX `CPFClientes`(`CPFClientes`),
    INDEX `fk_compra_endereco`(`IdEndereco`),
    PRIMARY KEY (`IdCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemcompra` (
    `IdCompra` INTEGER NOT NULL,
    `IdProduto` INTEGER NOT NULL,

    INDEX `IdProduto`(`IdProduto`),
    PRIMARY KEY (`IdCompra`, `IdProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_CPFClientes_fkey` FOREIGN KEY (`CPFClientes`) REFERENCES `clientes`(`CPF`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategoria` ADD CONSTRAINT `subcategoria_IdCat_fkey` FOREIGN KEY (`IdCat`) REFERENCES `categoria`(`IdCat`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_IdSub_fkey` FOREIGN KEY (`IdSub`) REFERENCES `subcategoria`(`IdSub`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `numerosdeserie` ADD CONSTRAINT `numerosdeserie_IdProduto_fkey` FOREIGN KEY (`IdProduto`) REFERENCES `produtos`(`IdProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_CPFClientes_fkey` FOREIGN KEY (`CPFClientes`) REFERENCES `clientes`(`CPF`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_IdEndereco_fkey` FOREIGN KEY (`IdEndereco`) REFERENCES `enderecos`(`IdEndereco`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemcompra` ADD CONSTRAINT `itemcompra_IdCompra_fkey` FOREIGN KEY (`IdCompra`) REFERENCES `compra`(`IdCompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemcompra` ADD CONSTRAINT `itemcompra_IdProduto_fkey` FOREIGN KEY (`IdProduto`) REFERENCES `produtos`(`IdProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;
