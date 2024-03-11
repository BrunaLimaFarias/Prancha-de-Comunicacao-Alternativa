DROP DATABASE IF EXISTS tcc_framework;
CREATE DATABASE tcc_framework;
USE tcc_framework;

CREATE TABLE produtos (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    preco FLOAT NOT NULL,
    img TEXT NOT NULL,
    tipo VARCHAR(25) NOT NULL,
    descricao VARCHAR(60)
);

CREATE TABLE carrinho (
	id_carrinho INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_produto INT NOT NULL,
	quantidade INT,
	FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

INSERT INTO produtos(titulo, preco, img, tipo, descricao) VALUES
	('Uva Thompson', 3.9,  '../img/uva_thompson.jpeg', 'fruta', 'Uva Thompson Perboni Bandeja 500G ');




/*
SELECT p.titulo, p.preco, p.img, p.quantidade
FROM produtos p
INNER JOIN carrinho c ON c.produtos = p.id
GROUP BY p.id;

CREATE TABLE adm (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    senha DECIMAL(10, 0) NOT NULL
);
*/