const axios = require("axios");
const {
  selectCategoryData,
  addCategory,
  selectSpecificCategoryData,
  editCategory,
  deleteCategory,
} = require("../db/category");
const { successmessage, errormessage } = require("../response/response");
const path = require("path");
const fs = require("fs");
const {
  selectSpecificQuizeData,
  selectSpecificQuizeDatafromCategory,
} = require("../db/quize");
const { selectAttemptData, addAttempt } = require("../db/quizAttempt");
var CryptoJS = require("crypto-js");

const getAllQuizAttemptData = async (req, res) => {
  try {
    const response = await selectAttemptData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sortedAttempts = response.sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);

      const aIsToday =
        aDate.getDate() === today.getDate() &&
        aDate.getMonth() === today.getMonth() &&
        aDate.getFullYear() === today.getFullYear();
      const bIsToday =
        bDate.getDate() === today.getDate() &&
        bDate.getMonth() === today.getMonth() &&
        bDate.getFullYear() === today.getFullYear();

      // Prioritize attempts made today
      if (aIsToday && !bIsToday) return -1;
      if (!aIsToday && bIsToday) return 1;

      // Sort by score (descending)
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      // Sort by total time (ascending)
      if (a.total_time !== b.total_time) {
        return a.total_time - b.total_time;
      }
      // Sort by start time (ascending)
      return a.start_time - b.start_time;
    });
    // console.log(sortedAttempts,'sortedAttempts')
    const rankings = sortedAttempts.map((attempt, index) => ({
      ...attempt,
      ranking: index + 1,
    }));
    console.log(rankings, "rankings");
    var iv = CryptoJS.enc.Hex.parse("be410fea41df7162a679875ec131cf2c");
    var encrypted = CryptoJS.AES.encrypt("Who was the first Indian woman in space?", "3213213213213321", {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log("encrypted: " + encrypted.toString());

    var manual_data = encrypted.toString();
    var decrypted = CryptoJS.AES.decrypt(manual_data, "3213213213213321", {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log(
      "   decrypted, by hand: " + decrypted.toString(CryptoJS.enc.Utf8)
    );
    return res.status(200).json(successmessage(response));
  } catch (error) {
    console.error("Error get category:", error);
    return res.status(400).json(errormessage(error.message));
  }
};
// const getAllQuizAttemptData = async (req, res) => {
//     try {
//       const response = await selectAttemptData();

//       return res.status(200).json(successmessage(response));
//     } catch (error) {
//       console.error("Error get category:", error);
//       return res.status(400).json(errormessage(error.message));
//     }
//   };

const postAddQuizAttempt = async (req, res) => {
  try {
    const { start_time, total_time, score, quiz_id } = req.body;
    const dbData = {
      start_time: start_time,
      total_time: total_time,
      score: score,
      quiz_id: quiz_id,
      user_id: req.user,
    };
    // console.log(dbData)
    const response = await addAttempt(dbData);
    return res.status(200).json(successmessage("response"));
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
    const name = req.body.name;
    const getrecord = await selectSpecificCategoryData(req.params.id);

    if (getrecord) {
      let dbData = {};
      dbData.id = getrecord.id;
      if (name) {
        dbData.name = name;
      } else {
        dbData.name = getrecord.name;
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
      //   console.log(dbData);
      try {
        await editCategory(dbData);
        return res.status(200).json(successmessage("Update Sucessfully"));
      } catch (error) {
        return res.status(402).json(errormessage(error.message));
      }
    } else {
      return res.status(402).json(errormessage("Data Not Found"));
    }
  } catch (error) {
    console.error("Error add category:", error);
    return res.status(400).json(errormessage(error.message));
  }
};

const postDeleteCategory = async (req, res) => {
  try {
    const getrecord = await selectSpecificCategoryData(req.params.id);
    if (getrecord) {
      //   console.log("getrecord", getrecord);
      // const getrecords = await selectSpecificQuizeDatafromCategory(req.params.id);
      // console.log(getrecords)
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
        return res.status(200).json(successmessage("Delete Sucessfully"));
      } catch (error) {
        return res.status(402).json(errormessage(error.message));
      }
    } else {
      return res.status(402).json(errormessage("Data Not Found"));
    }
  } catch (error) {
    console.error("Error add category:", error);
    return res.status(500).json(errormessage(error.message));
  }
};

module.exports = {
  getAllQuizAttemptData,
  getCategory,
  postAddQuizAttempt,
  postEditCategory,
  postDeleteCategory,
};
