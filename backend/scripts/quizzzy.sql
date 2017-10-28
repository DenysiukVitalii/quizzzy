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


create table questions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    question longtext NOT NULL,
    unique(id)
);

insert into questions (question) values 
('How are you?'),
('Do you speak English?');

select * from answers;

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

select json_object(
  'id',  questions.id,
  'question', question,
  'answers', json_array(
                     (select GROUP_CONCAT('\`', 
								json_object('answer',answer, 'isTrue', isTrue), '\`'
                             )   
                      from answers 
                      where answers.id_question = questions.id))
                   ) as tasks
 from questions;
select questions.id, question, answer
from questions
join answers ON answers.id_question = questions.id;

select answer from answers
where answers.id_question = 1;

select question, GROUP_CONCAT(DISTINCT answer ORDER BY answer ASC SEPARATOR ', ') as answers 
from questions
join answers ON answers.id_question = questions.id
group by question;

create table disciplines (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name longtext NOT NULL,
    unique(id)
);

create table topics (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    id_discipline INT NOT NULL,
    name varchar(60) NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES disciplines(id),
    unique(id)
);

