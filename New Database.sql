CREATE DATABASE IF NOT EXISTS Data_App2;

USE Data_App2;

CREATE TABLE userinfo(
id VARCHAR(100),
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(100) NOT NULL,
 PRIMARY KEY (id)
);
