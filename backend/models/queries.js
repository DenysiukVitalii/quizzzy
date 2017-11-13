module.exports = {
    getUsers: "SELECT * FROM users ORDER BY id DESC",
    insert: (table) => `INSERT INTO ${table} SET ?`,
    delete: (table, id) => `DELETE FROM ${table} WHERE id = '${id}'`,
    findByUsername: (username) => `SELECT * FROM users WHERE username = '${username}'`,
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
    getDisc: `SELECT * FROM disciplines ORDER BY id ASC`,
    editDiscipline: (data) => `UPDATE disciplines SET name = '${data.name}' WHERE id = ${data.id}`,
    findByDiscipline: (discname) => `SELECT * FROM disciplines WHERE name = '${discname}'`,
    editTopic: `UPDATE topics SET name = '${data.name}', id_discipline = '${data.id_discipline}'
                WHERE id = ${data.id}`,
    findByTopic: (topicname) => `SELECT * FROM topics WHERE name = '${topicname}'`,
    findByQuestion: (question) => `SELECT * FROM questions WHERE question = '${question}'`,
    insertAnswers: "INSERT INTO answers (id_question, answer, isTrue) VALUES ?",
    getTopicsByDisc: (idDisc) => `select topics.id, topics.name as 'topic'
                                    from topics
                                    join disciplines on topics.id_discipline = disciplines.id
                                    where disciplines.id = ${idDisc}
                                    order by topics.id asc;`,
    getTopics: `select topics.id, topics.name as 'topic', disciplines.name as 'discipline'
                    from topics
                    join disciplines on topics.id_discipline = disciplines.id
                    order by topics.id asc;`
}