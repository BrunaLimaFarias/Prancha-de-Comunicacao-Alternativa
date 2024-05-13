DROP DATABASE IF EXISTS prancha_comunicacao;
CREATE DATABASE prancha_comunicacao;
USE prancha_comunicacao;

CREATE TABLE lista_figuras (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    img TEXT NOT NULL
    /*categoria VARCHAR(30) NOT NULL*/
);


INSERT INTO lista_figuras(titulo, img) VALUES
	('Agito', './img/figuras/Agito.jpg'),
    ('ajudar', './img/figuras/ajudar.jpg'),
    ('bata', './img/figuras/bala.jpg'),
    ('banco', './img/figuras/banco.jpg'),
    ('beber', './img/figuras/beber.jpg'),
    ('beijar', './img/figuras/beijar.jpg'),
    ('beliscar', './img/figuras/beliscar.jpg'),
    ('bengala cor', './img/figuras/bengala cor.jpg'),


