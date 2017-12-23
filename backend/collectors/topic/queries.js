module.exports = {
    getTopicsByDisc: (idDisc) => `select topics.id, topics.name as 'topic'
                                    from topics
                                    join disciplines on topics.id_discipline = disciplines.id
                                    where disciplines.id = ${idDisc}
                                    order by topics.id asc;`,
    getTopics: `select topics.id, topics.name as 'topic', disciplines.name as 'discipline'
                from topics
                join disciplines on topics.id_discipline = disciplines.id
                order by topics.id asc;`,
    findByTopic: (topicname) => `SELECT * FROM topics WHERE name = '${topicname}'`,
    editTopic: (data) => `UPDATE topics SET name = '${data.name}', id_discipline = '${data.id_discipline}'
                                            WHERE id = ${data.id}`
}