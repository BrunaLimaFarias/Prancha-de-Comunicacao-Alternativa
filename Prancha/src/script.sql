DROP DATABASE IF EXISTS prancha_comunicacao;
CREATE DATABASE prancha_comunicacao;
USE prancha_comunicacao;

CREATE TABLE lista_figuras (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    img TEXT NOT NULL,
    categoria VARCHAR(20)
);

INSERT INTO lista_figuras(titulo, img) VALUES
    ('banco', './img/figuras/banco.jpg'),
    ('beber', './img/figuras/beber.jpg'),
    ('beijar', './img/figuras/beijar.jpg'),
    ('beliscar', './img/figuras/beliscar.jpg'),
    ('bengala cor', './img/figuras/bengala cor.jpg');
    
INSERT INTO lista_figuras(titulo, img, categoria) VALUES
    ('ajudar', './img/figuras/ajudar.jpg', 'Verbo'),
    ('bala', './img/figuras//bala.jpg', 'Objeto');

