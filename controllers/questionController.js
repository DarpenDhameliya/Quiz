const { successmessage, errormessage } = require("../response/response");
const path = require("path");
const fs = require("fs");
const { selectQuestionData, selectSpecificQuestionData, addQuestion, deleteQuestion, editQuestion, getFielteredDataTotalCount, getFielteredData, selectAllQuestionData } = require("../db/question");
const Authenticate = require("../middleware/authMiddleware");
var xlsx = require("xlsx");

const getAllQuestionData = async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL
        const response = await selectQuestionData(req.params.id);
        const returndata = response.map((data) => {
            return {
                ...data,
                answer: JSON.parse(data.answer),
                image: `${baseUrl}/category/` + data.image
            };
        })
        return res.status(200).json(successmessage(returndata));
    } catch (error) {
        console.error("Error get quize:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const getFilteredData = async (req, res) => {
    try {
        const perPage = 50
        const pageNumber = req.query.page
        const skip = (pageNumber - 1) * perPage;

        const totalRecords = await getFielteredDataTotalCount(req.query.data, req.params.byQuiz);
        const response = await getFielteredData(req.query.data, req.params.byQuiz, perPage, skip);
        return res.status(200).json(successmessage({data: response,perPage, totalPage: Math.ceil(totalRecords / perPage)}));
    } catch (error) {
        console.error("Error get quize:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const getAllQuestionDataForAdmin = async (req, res) => {
    try {

        const response = await selectAllQuestionData();
        const returndata = response.map((data) => {
            return {
                ...data,
                answer: JSON.parse(data.answer),
            };
        })
        return res.status(200).json(successmessage(returndata));
    } catch (error) {
        // console.error("Error get quize:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const postAddExcelQuestion = async (req, res) => {
    try {
        // console.log(req.body, req.file, req.file.path)
        const path = req.file.path
        const workbook = xlsx.readFile(path);

        // Assume CSV data is in the first sheet (usually "Sheet1")
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Parse the CSV data
        const data = xlsx.utils.sheet_to_json(worksheet);

        const values = data.map(item => [
            item.question.trim().replace(/'/g, "''"),
            item.answer.replace(/'/g, "''"),
            item.correct.replace(/'/g, "''"),
            item.time,
            item.coins,
            item.quiz_id
        ]);
        const response = await addQuestionCsv(values);
        console.log(response)
        return res.status(200).json(successmessage("Create successfully"));
    } catch (error) {
        console.error("Error add quize:", error);
        return res.status(400).json(errormessage(error.message));
    }
};


const postAddQuestion = async (req, res) => {
    try {
        const dbData = {
            question: req.body.question,
            answer: JSON.stringify(req.body.answer),
            correct: req.body.correct,
            quiz_id: parseInt(req.body.quizId),
            coins: req.body.coins
        }
        const response = await addQuestion(dbData);
        return res.status(200).json(successmessage("Create successfully"));
    } catch (error) {
        console.error("Error add quize:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const getQuestion = async (req, res) => {
    try {
        const response = await selectSpecificQuestionData(req.params.id);
        // console.log(response)
        return res.status(200).json(successmessage(response));
    } catch (error) {
        console.error("Error add category:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const postEditQuestion = async (req, res) => {
    try {
        const { question, answer, correct, quizId, coins } = req.body
        const getrecord = await selectSpecificQuestionData(req.params.id);
        if (getrecord) {
            const dbData = {
                question: question ? question : getrecord[0].question,
                answer: answer ? JSON.stringify(answer) : getrecord[0].answer,
                correct: correct ? correct : getrecord[0].correct,
                quiz_id: quizId ? parseInt(quizId) : getrecord[0].quiz_id,
                coins: coins ? coins : getrecord[0].coins
            }
            try {
                await editQuestion(getrecord[0].id, dbData);
                res.status(200).json(successmessage('Update Sucessfully'));
            } catch (error) {
                console.log(error)
                res.status(402).json(errormessage(error.message));
            }
        } else {
            res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        console.error("Error add category:", error);
        res.status(400).json(errormessage(error.message));
    }
};

const postDeleteQuestion = async (req, res) => {
    try {
        const getrecord = await selectSpecificQuestionData(req.params.id);
        if (getrecord) {
            try {
                await deleteQuestion(req.params.id);
                res.status(200).json(successmessage('Delete Sucessfully'));
            } catch (error) {
                res.status(402).json(errormessage(error.message));
            }
        } else {
            res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        console.error("Error add category:", error);
        res.status(500).json(errormessage(error.message));
    }
};

module.exports = {
    getAllQuestionData,
    postAddQuestion,
    getQuestion,
    postEditQuestion,
    postDeleteQuestion,
    postAddExcelQuestion,
    getAllQuestionDataForAdmin,
    getFilteredData
};
