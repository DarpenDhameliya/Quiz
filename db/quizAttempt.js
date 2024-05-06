const { queryPromise } = require('./query');

// const selectAttemptData = async () => {
//     const selecategoryData = `SELECT * FROM quiz_attempt`;
//     const result = await queryPromise(selecategoryData);
//     return result;
// };

const selectAttemptData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selecategoryData = `SELECT * FROM quiz_attempt WHERE DATE(created_at) = DATE(?)`;
    const result = await queryPromise(selecategoryData, [today]);
    return result;
};

const selectSpecificCategoryData = async (id) => {
    const selecategoryData = `SELECT * FROM category WHERE id = ?`;
    const result = await queryPromise(selecategoryData, id);
    return result[0];
};

const addAttempt = async (categogy) => {
    const selecategoryData = `INSERT INTO quiz_attempt SET ?`;
    const result = await queryPromise(selecategoryData, categogy);
    return result;
};

const editCategory = async (categogy) => {
    const { name, image, id } = categogy
    const selecategoryData = `UPDATE category SET name = ?, image = ? WHERE id = ?`;
    const result = await queryPromise(selecategoryData, [name, image, id]);
    return result;
};

const deleteCategory = async (id) => {
    const selecategoryData = `DELETE FROM category WHERE id = ?`;
    const result = await queryPromise(selecategoryData, id);
    if (result.affectedRows === 0) {
        throw new Error(`Category with ID ${id} not found.`);
    }

    return result;
};

module.exports = {
    selectAttemptData,
    addAttempt,
    editCategory,
    selectSpecificCategoryData,
    deleteCategory
};