module.exports = {
    getTests: `select 
                    tests.id as 'id_test',
                    disciplines.name as 'discipline', 
                    topics.name as 'topic', 
                    disciplines.id as 'id_discipline', 
                    topics.id as 'id_topic',
                    tests.name as 'test_name', 
                    tests.amount_tasks,
                    tests.timer,
                    tests.date ,
                    tests.creator from tests
                join disciplines on tests.id_discipline = disciplines.id
                join topics on tests.id_topic = topics.id;`,
    findByTestname: (testname) => `SELECT * FROM tests WHERE name = '${testname}'`,
    getRandTasks: (id_topic, amount_tasks) => `select questions.id from questions
                                                where questions.id_topic = '${id_topic}'
                                                ORDER BY RAND()
                                                LIMIT ${amount_tasks};`,
    insertTestTasks: "INSERT INTO test_tasks (id_test, id_question) VALUES ?",
    getTasksByTestId: (id) => `select json_object(
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
                                            ) as task
                        from questions 
                        where id in (select test_tasks.id_question from test_tasks
                            where test_tasks.id_test = '${id}')`,
    deleteTestTasks: (id) =>  `delete from test_tasks where id_test = '${id}'`
}