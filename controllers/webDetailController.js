const { selectCategoryData, addCategory, selectSpecificCategoryData, editCategory, deleteCategory } = require('../db/category');
const { successmessage, errormessage } = require("../response/response");
const path = require("path");
const fs = require("fs");
const { selectWebDetail, addWebDetail, selectSpecificWebDetail, editWebDetail, deleteWebDetail } = require('../db/setting');

const getWebDetail = async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL

        const response = await selectWebDetail();
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

const postAddWebDetail = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const { websitename, adscoin, examtime } = req.body
        const dbData = {
            websitename,
            adscoin,
            examtime,
            image: req.file.filename
        }
        const response = await addWebDetail(dbData);
        return res.status(200).json(successmessage(response));
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log("Error deleting file:", err);
                }
            });
        }
        return res.status(500).json(errormessage(error.message));
    }
};

const postEditWebDetail = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }
        const { websitename, adscoin, examtime } = req.body
        const getrecord = await selectSpecificWebDetail(req.params.id);

        if (getrecord) {
            let dbData = {};
            dbData.id = getrecord.id
            if (websitename) {
                dbData.websitename = websitename;
            } else {
                dbData.websitename = getrecord.websitename
            }

            if (adscoin) {
                dbData.adscoin = adscoin;
            } else {
                dbData.adscoin = getrecord.adscoin
            }

            if (examtime) {
                dbData.examtime = examtime;
            } else {
                dbData.examtime = getrecord.examtime
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
                await editWebDetail(dbData);
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

const postDeleteWebDetail = async (req, res) => {
    try {
        if (req.type === 'user') {
            return res.status(401).json(errormessage('Unauthorized'));
        }

        const getrecord = await selectSpecificWebDetail(req.params.id);
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
                await deleteWebDetail(req.params.id);
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
    getWebDetail,
    postAddWebDetail,
    postEditWebDetail,
    postDeleteWebDetail
};
