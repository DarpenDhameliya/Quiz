const { queryPromise } = require('./query');

const selectCategoryData = async () => {
    const selecategoryData = `SELECT * FROM category`;
    const result = await queryPromise(selecategoryData);
    return result;
};

const selectSpecificCategoryData = async (id) => {
    const selecategoryData = `SELECT * FROM category WHERE id = ?`;
    const result = await queryPromise(selecategoryData, id);
    return result[0];
};

const addCategory = async (categogy) => {
    const selecategoryData = `INSERT INTO category SET ?`;
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
    selectCategoryData,
    addCategory,
    editCategory,
    selectSpecificCategoryData,
    deleteCategory
};