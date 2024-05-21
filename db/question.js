const { queryPromise } = require('./query');

const selectQuestionData = async (id) => {
    const selectQuestiondata = `
    SELECT 
        q.id AS question_id,
        q.question,
        q.answer,
        q.correct,
        q.coins,
        q.quiz_id,
        quiz.title AS quiz_title,
        quiz.totalPrice AS quiz_totalPrice,
        quiz.entryFee AS quiz_entryFee,
        quiz.category_id,
        c.name AS category_name,
        c.image
    FROM 
        questions q
    LEFT JOIN 
        quiz ON q.quiz_id = quiz.id
    LEFT JOIN 
        category c ON quiz.category_id = c.id 
    WHERE 
        q.quiz_id = ?`;

    const result = await queryPromise(selectQuestiondata, id);
    return result;
};

const selectAllQuestionData = async (id) => {
    const selectQuestiondata = `
    SELECT 
        q.id AS question_id,
        q.question,
        q.answer,
        q.correct,
        q.coins,
        q.quiz_id
    FROM 
        questions q
    LEFT JOIN 
        quiz ON q.quiz_id = quiz.id
    LEFT JOIN 
        category c ON quiz.category_id = c.id `;

    const result = await queryPromise(selectQuestiondata, id);
    return result;
};

const getFielteredDataTotalCount = async (searchData, searchByQuizId) => {
    let selectQuestiondata;
    if (searchByQuizId === 'true') {
        selectQuestiondata = `
            SELECT COUNT(*) as totalCount
            FROM questions q
            JOIN quiz ON q.quiz_id = quiz.id
            WHERE quiz.title LIKE '%${searchData}%'
        `;
    } else {
        selectQuestiondata = `
            SELECT COUNT(*) as totalCount
            FROM questions
            WHERE question LIKE '%${searchData}%'
        `;
    }

    const result = await queryPromise(selectQuestiondata);
    return result[0].totalCount;
};

const getFielteredData = async (searchData, searchByQuizId, pageNumber, skip) => {
    let selectQuestiondata
    if (searchByQuizId === 'true') {
        selectQuestiondata = `
        SELECT q.id, q.question, q.answer, q.correct, q.time, q.coins, q.quiz_id
        FROM questions q
        JOIN quiz ON q.quiz_id = quiz.id
        WHERE quiz.title LIKE '%${searchData}%'
        ORDER BY q.created_at ASC
        LIMIT ${pageNumber} OFFSET ${skip}
        `;
    } else {
        selectQuestiondata = `
        SELECT * 
        FROM questions 
        WHERE question LIKE '%${searchData}%' 
        ORDER BY created_at ASC
        LIMIT ${pageNumber} OFFSET ${skip}`;
    }

    const result = await queryPromise(selectQuestiondata);
    return result;
};

// const getQuestionData = async (id) => {
//     const selectQuestiondata = `
//     SELECT qd.*, q.question, q.answer, q.correct 
//     FROM quizData qd
//     LEFT JOIN questions q ON qd.id = q.id
//     WHERE qd.id = ?
// `; const result = await queryPromise(selectQuestiondata, id);
//     return result;
// };
const getQuestionData = async (id) => {
    const selectQuestionData = `
    SELECT 
        qd.id AS quizData_id,
        qd.category_id,
        qd.title,
        qd.start_time,
        qd.end_time,
        qd.date,
        qd.entryFee,
        qd.totalPrice,
        q.id AS question_id,
        q.question,
        q.answer,
        q.correct
    FROM 
        quizData qd
    JOIN 
        questions q ON FIND_IN_SET(q.id, REPLACE(REPLACE(qd.question, '[', ''), ']', '')) > 0
    WHERE 
        qd.id = ?
`;
    const result = await queryPromise(selectQuestionData, [id]);
    const groupedResult = result.reduce((acc, item) => {
        console.log(item)
        const {
            quizData_id,
            category_id,
            title,
            start_time,
            end_time,
            date,
            question_id,
            question,
            entryFee,
            totalPrice,
            answer,
            correct
        } = item;
        if (!acc[quizData_id]) {
            acc[quizData_id] = {
                quizData_id,
                category_id,
                title,
                start_time,
                end_time,
                date,
                entryFee,
                totalPrice,
                questions: []
            };
        }
        acc[quizData_id].questions.push({
            question_id,
            question,
            answer,
            correct
        });
        return acc;
    }, {});
    console.log(groupedResult)
    return Object.values(groupedResult);
};

const selectSpecificQuestionData = async (id) => {
    const selectQuestiondata = `SELECT * FROM questions WHERE id = ?`;
    const result = await queryPromise(selectQuestiondata, id);
    return result;
};

const addQuestionCsv = async (values) => {
    let selectQuestiondata = "INSERT INTO questions (question, answer, correct, time, coins, quiz_id) VALUES ?";
    const result = await queryPromise(selectQuestiondata, [values]);
    return result;
};

const addQuestion = async (categogy) => {
    const selectQuestiondata = `INSERT INTO questions SET ?`;
    const result = await queryPromise(selectQuestiondata, categogy);
    return result;
};
const addQuestions = async (data) => {
    const selectQuestiondata = `INSERT INTO quizData SET ?`;
    const result = await queryPromise(selectQuestiondata, data);
    return result;
};

const editQuestion = async (id, category) => {
    let updateQuery = `UPDATE questions SET `;
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

const deleteQuestion = async (id) => {
    const selectQuestiondata = `DELETE FROM questions WHERE id = ?`;
    const result = await queryPromise(selectQuestiondata, id);
    if (result.affectedRows === 0) {
        throw new Error(`Question with ID ${id} not found.`);
    }
    return result;
};

module.exports = {
    selectQuestionData,
    addQuestion,
    editQuestion,
    selectSpecificQuestionData,
    getFielteredData,
    deleteQuestion,
    addQuestionCsv,
    selectAllQuestionData,
    getFielteredDataTotalCount,
    addQuestions,
    getQuestionData
};