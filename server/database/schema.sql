CREATE TABLE item (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  unit_price DECIMAL(10, 2),
  id_category INT unsigned NOT NULL,
  id_theme INT unsigned NOT NULL,
  image TEXT NOT NULL,
  FOREIGN KEY(id_category) REFERENCES category(id),
  FOREIGN KEY(id_theme) REFERENCES theme(id)
);

CREATE TABLE category (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE theme (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15),
  adress VARCHAR(255),
  postal_code VARCHAR(10),
  city VARCHAR(100),
  pseudo VARCHAR(100),
  is_admin BOOLEAN DEFAULT false
);

CREATE TABLE cart (
  quantity VARCHAR(10) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  id_user INT unsigned NOT NULL,
  id_item INT unsigned NOT NULL,
  FOREIGN KEY(id_user) REFERENCES user(id),
  FOREIGN KEY(id_item) REFERENCES item(id)
);

CREATE TABLE favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_item INT,
  FOREIGN KEY (id_user) REFERENCES user(id),
  FOREIGN KEY (id_item) REFERENCES item(id)
);


CREATE TABLE order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_quantity INT NOT NULL,
  total_order DECIMAL(10, 2) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  statut ENUM("En attente de validation", "Validée", "Livrée") NOT NULL,
  confirmation_date DEFAULT CURRENT_TIMESTAMP ,
  id_user INT unsigned NOT NULL,
  FOREIGN KEY(id_user) REFERENCES user(id)
);

CREATE TABLE user_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_item INT unsigned NOT NULL,
  id_order INT unsigned NOT NULL,
  FOREIGN KEY(id_item) REFERENCES item(id)
  FOREIGN KEY(id_order) REFERENCES order(id)
);