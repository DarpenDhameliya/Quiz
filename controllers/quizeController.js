const { successmessage, errormessage } = require("../response/response");
const path = require("path");
const fs = require("fs");
const { selectQuizeData, selectSpecificQuizeData, addQuiz, deletQuiz, editQuiz } = require('../db/quize');

const getAllQuizeData = async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL
        const response = await selectQuizeData();
        const returndata = response.map((data) => {
            return {
                ...data,
                image: `${baseUrl}/category/` + data.image
            };
        })
        return res.status(200).json(successmessage(returndata));
    } catch (error) {
        return res.status(500).json(errormessage(error.message));
    }
};
const getQuizDetailsForQuestion = async (req, res) => {
    try {
        const response = await selectSpecificQuizeData(req.params.id);
        return res.status(200).json(successmessage(response));
    } catch (error) {
        return res.status(400).json(errormessage(error.message));
    }
};

const postAddQuiz = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const dbData = {
            title: req.body.title,
            totalPrice: req.body.totalPrice,
            entryFee: req.body.entryFee,
            category_id: req.body.category_id,
            live: req.body.live
        }
        const response = await addQuiz(dbData);
        return res.status(200).json(successmessage("Create successfully"));
    } catch (error) {
        return res.status(500).json(errormessage(error.message));
    }
};

const postEditQuiz = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const { title, totalPrice, entryFee, live, category_id } = req.body
        const getrecord = await selectSpecificQuizeData(req.params.id);
        if (getrecord) {
            let dbData = {
                title: title ? title : getrecord[0].title,
                totalPrice: totalPrice ? totalPrice : getrecord[0].totalPrice,
                entryFee: entryFee ? entryFee : getrecord[0].entryFee,
                live: (live || live === false) ? live : getrecord[0].live,
                category_id: category_id ? category_id : getrecord[0].category_id
            };
            try {
                await editQuiz(getrecord[0].id, dbData);
                res.status(200).json(successmessage('Update Sucessfully'));
            } catch (error) {
                res.status(402).json(errormessage(error.message));
            }
        } else {
            res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        res.status(500).json(errormessage(error.message));
    }
};

const postDeleteQuiz = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const getrecord = await selectSpecificQuizeData(req.params.id);
        if (getrecord) {
            try {
                await deletQuiz(req.params.id);
                res.status(200).json(successmessage('Delete Sucessfully'));
            } catch (error) {
                res.status(402).json(errormessage(error.message));
            }
        } else {
            res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        res.status(500).json(errormessage(error.message));
    }
};

module.exports = {
    getAllQuizeData,
    postAddQuiz,
    postEditQuiz,
    postDeleteQuiz,
    getQuizDetailsForQuestion
};
