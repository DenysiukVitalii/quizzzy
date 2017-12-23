module.exports = {
    getDisciplines: `SELECT * FROM disciplines ORDER BY id ASC`,
    findByDiscipline: (discname) => `SELECT * FROM disciplines WHERE name = '${discname}'`,
    editDiscipline: (data) => `UPDATE disciplines SET name = '${data.name}' WHERE id = ${data.id}`
}