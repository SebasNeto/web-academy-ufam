-- CreateTable
CREATE TABLE `autores` (
    `id_autor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(150) NOT NULL,
    `data_nascimento` DATETIME(3) NULL,
    `pais_nascimento` VARCHAR(100) NULL,
    `nota_biografica` TEXT NULL,

    PRIMARY KEY (`id_autor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livros` (
    `cod_livro` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `idioma_original` VARCHAR(80) NULL,
    `ano_primeira_publicacao` INTEGER NULL,

    PRIMARY KEY (`cod_livro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `editoras` (
    `id_editora` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_fantasia` VARCHAR(150) NOT NULL,
    `endereco` VARCHAR(255) NULL,
    `telefone` VARCHAR(30) NULL,

    PRIMARY KEY (`id_editora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edicoes` (
    `isbn` VARCHAR(20) NOT NULL,
    `ano_edicao` INTEGER NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `num_paginas` INTEGER NOT NULL,
    `qtd_estoque` INTEGER NOT NULL,
    `cod_livro` INTEGER NOT NULL,
    `id_editora` INTEGER NOT NULL,

    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `autorias` (
    `id_autoria` INTEGER NOT NULL AUTO_INCREMENT,
    `ordem_autoria` INTEGER NULL,
    `observacao_credito` VARCHAR(255) NULL,
    `id_autor` INTEGER NOT NULL,
    `cod_livro` INTEGER NOT NULL,

    UNIQUE INDEX `autorias_id_autor_cod_livro_key`(`id_autor`, `cod_livro`),
    PRIMARY KEY (`id_autoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `edicoes` ADD CONSTRAINT `edicoes_cod_livro_fkey` FOREIGN KEY (`cod_livro`) REFERENCES `livros`(`cod_livro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `edicoes` ADD CONSTRAINT `edicoes_id_editora_fkey` FOREIGN KEY (`id_editora`) REFERENCES `editoras`(`id_editora`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autorias` ADD CONSTRAINT `autorias_id_autor_fkey` FOREIGN KEY (`id_autor`) REFERENCES `autores`(`id_autor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autorias` ADD CONSTRAINT `autorias_cod_livro_fkey` FOREIGN KEY (`cod_livro`) REFERENCES `livros`(`cod_livro`) ON DELETE RESTRICT ON UPDATE CASCADE;
