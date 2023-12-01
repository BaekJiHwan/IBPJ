DROP DATABASE ibpj;
CREATE DATABASE ibpj;
USE ibpj;




CREATE TABLE comments(
	id			    INTEGER PRIMARY KEY auto_increment,
    postID			INTEGER,
    user			VARCHAR(20),
    content			LONGTEXT,
    DATE			text,
    author			INTEGER,
);



SELECT * FROM ibpj.comments;



set SQL_SAFE_UPDATES = 0;


AlTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0000';
FLUSH privileges;