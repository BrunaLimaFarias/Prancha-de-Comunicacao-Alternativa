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
	('Agito', './img/Agito.jpg'),
    ('ajudar', './img/ajudar.jpg');


