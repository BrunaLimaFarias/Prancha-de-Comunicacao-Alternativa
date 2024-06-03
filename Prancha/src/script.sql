DROP DATABASE IF EXISTS prancha_comunicacao;
CREATE DATABASE prancha_comunicacao;
USE prancha_comunicacao;

CREATE TABLE lista_figuras (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    palavra VARCHAR(100) NOT NULL,
    img VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE figura_categoria (
    figura_id INT,
    categoria_id INT,
    PRIMARY KEY (figura_id, categoria_id),
    FOREIGN KEY (figura_id) REFERENCES lista_figuras(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);