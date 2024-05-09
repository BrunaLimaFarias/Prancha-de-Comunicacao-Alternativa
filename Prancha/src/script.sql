DROP DATABASE IF EXISTS prancha_comunicacao;
CREATE DATABASE prancha_comunicacao;
USE prancha_comunicacao;

CREATE TABLE lista_figuras (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    img TEXT NOT NULL,
    categoria VARCHAR(30) NOT NULL
);

INSERT INTO lista_figuras(titulo, img, categoria) VALUES
	('apontador', '../img/apontador.jpg', 'objeto'),
    ('arbusto', '../img/arbusto.jpg', 'planta');

/*
SELECT p.titulo, p.preco, p.img, p.quantidade
FROM produtos p
INNER JOIN carrinho c ON c.produtos = p.id
GROUP BY p.id;


CREATE TABLE carrinho (
	id_carrinho INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_produto INT NOT NULL,
	quantidade INT,
	FOREIGN KEY (id_produto) REFERENCES produtos(id)
);
*/
