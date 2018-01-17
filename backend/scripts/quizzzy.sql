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
(1, 'Topic3'),
(1, 'Topic4'),
(1, 'In meeting'),
(1, 'In room'),
(2, 'In street');

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

insert into questions (id_topic, question, date, creator) values 
(1,'Question2', '2018-01-17', 'teacher'),
(1,'Question3', '2018-01-17', 'teacher'),
(1,'Question4', '2018-01-17', 'teacher'),
(1,'Question5', '2018-01-17', 'teacher'),
(1,'Question6', '2018-01-17', 'teacher'),
(1,'How are you?', '2018-01-17', 'teacher'),
(3,'Do you speak English?', '2018-01-17', 'teacher');

select * from questions;
truncate questions;

create table answers (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    id_question INT NOT NULL,
    answer longtext NOT NULL,
    isTrue INT NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id),
    unique(id)
);

delete from questions where id = 11;
delete from answers where id_question = 11;
insert into answers (id_question, answer, isTrue) values
(1, 'Answer1-Question2', 0),
(1, 'Answer2-Question2', 0),
(1, 'Answer3-Question2', 1),
(1, 'Answer4-Question2', 0),

(2, 'Answer1-Question3', 0),
(2, 'Answer2-Question3', 1),
(2, 'Answer3-Question3', 0),
(2, 'Answer4-Question3', 0),

(3, 'Answer1-Question4', 0),
(3, 'Answer2-Question4', 0),
(3, 'Answer3-Question4', 0),
(3, 'Answer4-Question4', 1),

(4, 'Answer1-Question5', 0),
(4, 'Answer2-Question5', 1),
(4, 'Answer3-Question5', 0),
(4, 'Answer4-Question5', 0),

(5, 'Answer1-Question6', 1),
(5, 'Answer2-Question6', 0),
(5, 'Answer3-Question6', 0),
(5, 'Answer4-Question6', 0),

(6, 'Good', 1),
(6, 'Bad', 0),
(6, 'I\'m fine', 0),
(7, 'Yes, I do', 1),
(7, 'No, I don\'t', 0);

select question, disciplines.name 
from questions
join disciplines 
on disciplines.id = (select id_discipline from topics
			where questions.id_topic = topics.id);

select json_object(
  'id',  questions.id,
  'topic_id', questions.id_topic,
  'topic', (select topics.name from topics where topics.id = questions.id_topic),
  'discipline', (select disciplines.name from  disciplines
				 where disciplines.id = (select topics.id_discipline from topics
				 where questions.id_topic = topics.id)),
  'date', questions.date, 
  'creator', questions.creator,
  'question', question,
  'answers', json_array(
                     (select GROUP_CONCAT('\`', 
								json_object('answer',answer, 'isTrue', isTrue), '\`'
                             )   
                      from answers 
                      where answers.id_question = questions.id))
                   ) as tasks
from questions 
where id in (select test_tasks.id_question from test_tasks
				where test_tasks.id_test = 1)
/*where questions.id_topic = 1
ORDER BY RAND()
LIMIT 3;*/
;

select questions.id from questions
where questions.id_topic = 1
ORDER BY RAND()
LIMIT 3;

select questions.id, questions.question, 
	   disciplines.name as 'discipline', topics.name as 'topic' 
from questions
join disciplines on questions.id_discipline = disciplines.id
join topics on questions.id_topic = topics.id;

select questions.id, question, answer
from questions
join answers ON answers.id_question = questions.id;

select answer from answers
where answers.id_question = 1;

select question, GROUP_CONCAT(DISTINCT answer ORDER BY answer ASC SEPARATOR ', ') as answers 
from questions
join answers ON answers.id_question = questions.id
group by question;


create table tests (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name varchar(60) NOT NULL UNIQUE,
    id_discipline INT NOT NULL,
    id_topic INT NOT NULL,
    amount_tasks INT NOT NULL,
    timer INT NOT NULL,
    date date NOT NULL,
    creator VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES disciplines(id),
    FOREIGN KEY (id_topic) REFERENCES topics(id)
);

select disciplines.name as 'discipline', 
	   topics.name as 'topic', 
       disciplines.id as 'id_discipline', 
       topics.id as 'id_topic',
	   tests.name as 'test_name', 
       tests.amount_tasks,
       tests.timer,
       tests.date ,
       tests.creator from tests
join disciplines on tests.id_discipline = disciplines.id
join topics on tests.id_topic = topics.id;

insert into tests (name, id_discipline, id_topic, amount_tasks, timer, date, creator) values
('Test1', 1, 1, 1, 10, '2018-01-17', 'teacher');

select * from tests;
delete from tests where id = 5;
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

delete from test_tasks where id_test = 5;
select * from test_tasks
where id_test = 5;

create table statistic (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(20) NOT NULL,
    id_test INT NOT NULL,
    result INT NOT NULL,
    date date NOT NULL,
    FOREIGN KEY (id_test) REFERENCES tests(id)
);

select * from statistic;
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



