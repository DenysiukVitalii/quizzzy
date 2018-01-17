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
    date date NOT NULL DEFAULT '2018-01-01',
    creator VARCHAR(20) NOT NULL DEFAULT 'noname',
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

create table tests (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name varchar(60) NOT NULL UNIQUE,
    id_discipline INT NOT NULL,
    id_topic INT NOT NULL,
    amount_tasks INT NOT NULL,
    timer INT NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES disciplines(id),
    FOREIGN KEY (id_topic) REFERENCES topics(id)
);

select disciplines.name as 'discipline', 
	   topics.name as 'topic', 
       disciplines.id as 'id_discipline', 
       topics.id as 'id_topic',
	   tests.name as 'test_name', 
       tests.amount_tasks, 
       tests.timer from tests
join disciplines on tests.id_discipline = disciplines.id
join topics on tests.id_topic = topics.id;

insert into tests (name, id_discipline, id_topic, amount_tasks, timer) values
('Test1', 1, 1, 1, 10);

select * from tests;
delete from tests;
create table test_tasks (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_test INT NOT NULL,
    id_question INT NOT NULL,
    FOREIGN KEY (id_test) REFERENCES tests(id),
    FOREIGN KEY (id_question) REFERENCES questions(id)
);

insert into test_tasks (id_test, id_question) values
(1, 5),
(1, 6);

delete  from test_tasks;
select * from test_tasks
where id_test = 1;


create table statistic (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(20) NOT NULL,
    id_test INT NOT NULL,
    result INT NOT NULL,
    date date NOT NULL,
    FOREIGN KEY (id_test) REFERENCES tests(id)
);


select statistic.id_test, 
       statistic.result,
       statistic.date,
       tests.name,
       tests.id_discipline,
       tests.id_topic,
       disciplines.name as 'discipline',
       topics.name as 'topic'
       from statistic
join tests on statistic.id_test = tests.id
join disciplines on tests.id_discipline = disciplines.id
join topics on tests.id_topic = topics.id
where statistic.username = 'student';

insert into statistic (username, id_test, result, date) values
('student', 16, 76, '2017-01-15');