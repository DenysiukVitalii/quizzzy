module.exports = {
    getStatisctic: (username) => `select statistic.id_test, 
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
                                    where statistic.username = '${username}'`
}