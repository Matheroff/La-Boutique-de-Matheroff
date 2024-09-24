create table category (
  id int unsigned primary key auto_increment not null,
  name varchar(50) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  description varchar(250) not null,
  unit_price decimal(10, 2),
  id_category int unsigned not null,
  foreign key(id_category) references category(id)
);

create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(100) not null,
  lastname varchar(100) not null,
  email varchar(255) not null unique,
  password varchar(100) not null,
  phone_number varchar(15),
  adress varchar(255) not null,
  postal_code varchar(10) not null,
  lastname varchar(100) not null,
  city varchar(100) not null
);

create table cart (
  quantity varchar(10) not null,
  total_price decimal(10, 2) not null,
  id_user int unsigned not null,
  id_item int unsigned not null,
  foreign key(id_user) references user(id),
  foreign key(id_item) references item(id)
);

create table user_order (
  item_quantity INT not null,
  total_order decimal(10, 2) not null,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  id_user int unsigned not null,
  id_item int unsigned not null,
  foreign key(id_user) references user(id),
  foreign key(id_item) references item(id)
);
