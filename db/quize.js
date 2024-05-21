const { queryPromise } = require('./query');

const selectQuizeData = async () => {

    const selectCategoryData = `
    SELECT 
    quiz.id,
    quiz.title,
    category.id AS category_id,
    category.name,
    category.image,
    quiz.totalPrice,
    quiz.entryFee,
    quiz.live
    FROM quiz
    LEFT JOIN category ON quiz.category_id = category.id`;

    const result = await queryPromise(selectCategoryData);
    return result;
};

const selectSpecificQuizeData = async (id) => {
    const selectCategoryData = `
    SELECT 
    quiz.id,
    quiz.title,
    category.id AS category_id,
    category.name AS category_name,
    quiz.totalPrice,
    quiz.entryFee,
    quiz.live
    FROM quiz
    LEFT JOIN category ON quiz.category_id = category.id
    WHERE quiz.id = ?`;
    const result = await queryPromise(selectCategoryData, id);
    return result;
};

const addQuiz = async (categogy) => {
    const selectategoryData = `INSERT INTO quiz SET ?`;
    const result = await queryPromise(selectategoryData, categogy);
    return result;
};

const editQuiz = async (id, category) => {
    let updateQuery = `UPDATE quiz SET `;
    const updateValues = [];
    const updateKeys = Object.keys(category);

    updateKeys.forEach((key, index) => {
        updateQuery += `${key} = ?`;

        updateValues.push(category[key]);
        if (index < updateKeys.length - 1) {
            updateQuery += ', ';
        }
    });

    updateQuery += ` WHERE id = ?`;
    updateValues.push(id);
    const result = await queryPromise(updateQuery, updateValues);
    return result;
};

const deletQuiz = async (id) => {
    const selectategoryData = `DELETE FROM quiz WHERE id = ?`;
    const result = await queryPromise(selectategoryData, id);
    if (result.affectedRows === 0) {
        throw new Error(`Category with ID ${id} not found.`);
    }
    return result;
};

module.exports = {
    selectQuizeData,
    addQuiz,
    editQuiz,
    selectSpecificQuizeData,
    deletQuiz,
};