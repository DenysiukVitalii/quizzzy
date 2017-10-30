SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE users ( 
    id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    username VARCHAR(20) NOT NULL, 
    password CHAR(60) NOT NULL, 
    role VARCHAR(20) NOT NULL, 
        PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
    UNIQUE INDEX `username_UNIQUE` (`username` ASC)
);
select * from users;

ALTER TABLE users CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE users DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


create table disciplines (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name varchar(60) NOT NULL,
    unique(id),
    unique(name)
);
insert into disciplines (name) values
('Human mood'),
('Different questions');
select * from disciplines; 

create table topics (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    id_discipline INT NOT NULL,
    name varchar(60) NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES disciplines(id),
    unique(id),
    unique(name)
);

insert into topics (id_discipline, name) values
(1, 'In meeting'),
(1, 'In room'),
(2, 'In street');
select * from topics;
select topics.id, disciplines.name as 'discipline', topics.name as 'topic'
from topics
join disciplines on topics.id_discipline = disciplines.id;

create table questions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    question longtext NOT NULL,
    id_topic INT NOT NULL,
    FOREIGN KEY (id_topic) REFERENCES topics(id),
    unique(id)
);

insert into questions (id_topic, question) values 
(1,'How are you?'),
(3,'Do you speak English?');

select * from questions;
delete from questions;

create table answers (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    id_question INT NOT NULL,
    answer longtext NOT NULL,
    isTrue INT NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id),
    unique(id)
);

insert into answers (id_question, answer, isTrue) values
(1, 'Good', 1),
(1, 'Bad', 0),
(1, 'I\'m fine', 0),
(2, 'Yes, I do', 1),
(2, 'No, I don\'t', 0);
truncate answers;
truncate questions;

select question, disciplines.name 
from questions
join disciplines 
on disciplines.id = (select id_discipline from topics
			where questions.id_topic = topics.id);