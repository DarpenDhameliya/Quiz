const axios = require("axios");
const { selectCategoryData, addCategory, selectSpecificCategoryData, editCategory, deleteCategory } = require('../db/category');
const { successmessage, errormessage } = require("../response/response");
const path = require("path");
const fs = require("fs");
const { selectSpecificQuizeData, selectSpecificQuizeDatafromCategory } = require("../db/quize");

const getAllCategoryData = async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL

        const response = await selectCategoryData();
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

const postAddCategory = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const dbData = {
            name: req.body.name,
            image: req.file.filename,
        }
        const response = await addCategory(dbData);
        return res.status(200).json(successmessage(response));
    } catch (error) {
        console.error("Error add category:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const getCategory = async (req, res) => {
    try {
        const response = await selectSpecificCategoryData(req.params.id);
        return res.status(200).json(successmessage(response));
    } catch (error) {
        console.error("Error add category:", error);
        return res.status(400).json(errormessage(error.message));
    }
};

const postEditCategory = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }

        const name = req.body.name
        const getrecord = await selectSpecificCategoryData(req.params.id);

        if (getrecord) {
            let dbData = {};
            dbData.id = getrecord.id
            if (name) {
                dbData.name = name;
            } else {
                dbData.name = getrecord.name
            }
            if (req.file && req.file.filename) {
                dbData.image = req.file.filename;
                let fileName = getrecord.image;
                var filepath = "files/category";
                let filemainPath = path.join(filepath, fileName);
                fs.unlink(filemainPath, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err);
                        return;
                    }
                });
            } else {
                dbData.image = getrecord.image;
            }
            try {
                await editCategory(dbData);
                return res.status(200).json(successmessage('Update Sucessfully'));
            } catch (error) {
                return res.status(402).json(errormessage(error.message));
            }
        } else {
            return res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        return res.status(500).json(errormessage(error.message));
    }
};

const postDeleteCategory = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }

        const getrecord = await selectSpecificCategoryData(req.params.id);
        if (getrecord) {
            if (getrecord.image) {
                let fileName = getrecord.image;
                var filepath = "files/category";
                let filemainPath = path.join(filepath, fileName);
                fs.unlink(filemainPath, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err);
                        return;
                    }
                });
            }
            try {
                await deleteCategory(req.params.id);
                return res.status(200).json(successmessage('Delete Sucessfully'));
            } catch (error) {
                return res.status(402).json(errormessage(error.message));
            }
        } else {
            return res.status(402).json(errormessage("Data Not Found"));
        }
    } catch (error) {
        return res.status(500).json(errormessage(error.message));
    }
};

module.exports = {
    getAllCategoryData,
    getCategory,
    postAddCategory,
    postEditCategory,
    postDeleteCategory
};
