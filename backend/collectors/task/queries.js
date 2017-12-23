module.exports = {
     getTasks: `select json_object(
                    'id',  questions.id,
                    'topic_id', questions.id_topic,
                    'topic', (select topics.name from topics where topics.id = questions.id_topic),
                    'discipline', (select disciplines.name from  disciplines
                                where disciplines.id = (select topics.id_discipline from topics
                                where questions.id_topic = topics.id)),
                    'question', question,
                    'answers', json_array(
                                    (select GROUP_CONCAT('\`', 
                                                json_object('answer',answer, 'isTrue', isTrue), '\`'
                                            )   
                                        from answers 
                                        where answers.id_question = questions.id))
                                    ) as tasks
                from questions;`,
    findByQuestion: (question) => `SELECT * FROM questions WHERE question = '${question}'`,
    insertAnswers: "INSERT INTO answers (id_question, answer, isTrue) VALUES ?",
}