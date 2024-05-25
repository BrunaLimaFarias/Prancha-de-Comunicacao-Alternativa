DROP DATABASE IF EXISTS prancha_comunicacao;
CREATE DATABASE prancha_comunicacao;
USE prancha_comunicacao;

CREATE TABLE lista_figuras (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    img VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE figura_categoria (
    figura_id INT,
    categoria_id INT,
    PRIMARY KEY (figura_id, categoria_id),
    FOREIGN KEY (figura_id) REFERENCES lista_figuras(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

/*
INSERT INTO lista_figuras(titulo, img) VALUES
	('ajudar', './img/figuras/ajudar.jpg'),
    ('bala', './img/figuras//bala.jpg'),
    ('banco', './img/figuras/banco.jpg'),
    ('beber', './img/figuras/beber.jpg'),
    ('beijar', './img/figuras/beijar.jpg'),
    ('beliscar', './img/figuras/beliscar.jpg'),
    ('bengala cor', './img/figuras/bengala cor.jpg');
*/