create table category (
  id int unsigned primary key auto_increment not null,
  name varchar(50) not null
);

create table theme (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  description varchar(250) not null,
  unit_price decimal(10, 2),
  id_category int unsigned not null,
  id_theme int unsigned not null,
  image text not null,
  foreign key(id_category) references category(id),
  foreign key(id_theme) references theme(id)
);

create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(100),
  lastname varchar(100),
  email varchar(255) not null unique,
  password varchar(100) not null,
  phone_number varchar(15),
  adress varchar(255),
  postal_code varchar(10),
  city varchar(100),
  pseudo varchar(100),
  is_admin boolean default false
);

create table cart (
  quantity varchar(10) not null,
  total_price decimal(10, 2) not null,
  id_user int unsigned not null,
  id_item int unsigned not null,
  foreign key(id_user) references user(id),
  foreign key(id_item) references item(id)
);

create table favorite (
  id int auto_increment primary key,
  id_user int,
  id_item int,
  foreign key (id_user) references user(id),
  foreign key (id_item) references item(id)
);


create table order (
  id int auto_increment primary key,
  item_quantity int not null,
  total_order decimal(10, 2) not null,
  order_date timestanp default current_timestanp not null,
  statut enum("En attente de validation", "Validée", "Livrée") not null,
  id_user int unsigned not null,
  foreign key(id_user) references user(id)
);

create table user_order (
  id int auto_increment primary key,
  id_item int unsigned not null,
  id_order int unsigned not null,
  foreign key(id_item) references item(id)
  foreign key(id_order) references order(id)
);
