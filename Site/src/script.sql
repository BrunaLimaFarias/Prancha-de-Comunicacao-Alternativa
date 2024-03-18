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
	('Uva Thompson', 3.9,  '../img/uva_thompson.jpeg', 'fruta', 'Uva Thompson Perboni Bandeja 500G '),
    	('Abacaxi', 2.99,  '../img/abacaxi.jpg', 'fruta', 'Abacaxi Unidade '),
	('Azeite de Oliva', 39.9,  '../img/azeite_oliva.jpg', 'tempero', 'Azeite de Oliva unidade 500ml '),
	('Berinjela', 3.29,  '../img/berinjela.jpg', 'fruta', 'Berinjela 500g '),
	('Cherimoia', 13.5,  '../img/cherimoia.jpg', 'fruta', 'Cherimoia unidade '),
	('Coco', 4.75,  '../img/coco.jpg', 'fruta', 'Coco unidade '),
	('Cupuaçu', 9.23,  '../img/cupuacu.jpg', 'fruta', 'Cupuacu unidade'),
	('Figo', 9.99,  '../img/figo.jpg', 'fruta', 'Figo 8 unidades'),
	('Physalis', 16.99,  '../img/fisalis.jpg', 'fruta', 'Physalis 100g'),
	('Jabuticaba', 9.9,  '../img/jabuticaba.jpg', 'fruta', 'Jabuticaba 500g'),
	('Jaca', 21.97,  '../img/jaca.jpg', 'fruta', 'Jaca unidade'),
	('Laranja', 15.99,  '../img/laranja.jpg', 'fruta', 'Laranja kg'),
	('Limão', 5.99,  '../img/limao.jpg', 'fruta', 'Limão kg'),
	('Mamão', 15.99,  '../img/mamão.jpg', 'fruta', 'Mamão kg'),
	('Maracujá', 14.99,  '../img/maracuja.jpg', 'fruta', 'Maracujá kg '),
	('Melancia', 3.99,  '../img/melancia.jpg', 'fruta', 'Melancia kg '),
	('Melão', 8.99,  '../img/melao.jpg', 'fruta', 'Melão kg'),
	('Caixa de Ovos 30un', 32.9,  '../img/ovos_caixa_30.jpg', 'alimento', 'Caixa de ovos 30 unidades'),
	('Pequi', 14.69,  '../img/pequi.jpg', 'fruta', 'Pequi unidade '),
	('Pera', 10.99,  '../img/pera.jpg', 'fruta', 'Pera kg'),
	('Romã', 25.98,  '../img/roma.jpg', 'fruta', 'Romã kg'),
	('Tâmara', 22.99,  '../img/tamara.jpg', 'fruta', 'Tâmara 200g'),
	('Tamarindo', 11.29,  '../img/tamarindo.jpg', 'fruta', 'Tamarindo 200g '),
	('Tangerina', 7.71,  '../img/tangerina.jpg', 'fruta', 'Tangerina kg '),
	('Tomate', 10.99,  '../img/tomate.jpg', 'fruta', 'Tomate kg '),
	('Umbu', 14.99,  '../img/umbu.jpeg', 'fruta', 'Umbu kg'),
	('Uva verde', 9.9,  '../img/uva_verde.jpg', 'fruta', 'Uva verde 500g ');

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
