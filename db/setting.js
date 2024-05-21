const { queryPromise } = require('./query');

const selectWebDetail = async () => {
    const selectWebDetail = `SELECT * FROM setting`;
    const result = await queryPromise(selectWebDetail);
    return result;
};

const selectSpecificWebDetail = async (id) => {
    const selectWebDetail = `SELECT * FROM setting WHERE id = ?`;
    const result = await queryPromise(selectWebDetail, id);
    return result[0];
};

const addWebDetail = async (categogy) => {
    const insertWebDetail = `INSERT INTO setting SET ?`;
    const result = await queryPromise(insertWebDetail, categogy);
    return result;
};

const editWebDetail = async (categogy) => {
    const { websitename, image, adscoin, examtime, id } = categogy
    const updateWebDetail = `UPDATE setting SET websitename = ?, image = ?, adscoin = ?,examtime = ?  WHERE id = ?`;
    const result = await queryPromise(updateWebDetail, [websitename, image, adscoin, examtime, id]);
    return result;
};

const deleteWebDetail = async (id) => {
    const deleteWebDetail = `DELETE FROM setting WHERE id = ?`;
    const result = await queryPromise(deleteWebDetail, id);
    if (result.affectedRows === 0) {
        throw new Error(`Category with ID ${id} not found.`);
    }

    return result;
};

module.exports = {
    selectWebDetail,
    addWebDetail,
    editWebDetail,
    selectSpecificWebDetail,
    deleteWebDetail
};