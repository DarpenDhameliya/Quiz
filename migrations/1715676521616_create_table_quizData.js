module.exports = {
    "up": "CREATE TABLE quizData (" +
      "id INT AUTO_INCREMENT PRIMARY KEY," +
      "category_id INT," +
      "title VARCHAR(255) NOT NULL," +
      "start_time TIME NOT NULL," +
      "end_time TIME NOT NULL," +
      "date DATE NOT NULL," +
      "question JSON," +
      "entryFee DECIMAL(10, 2) NOT NULL," +
      "totalPrice DECIMAL(10, 2) NOT NULL," +
      "live BOOLEAN DEFAULT false," +
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
      "FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE" +
      ")",
    "down": "DROP TABLE quizData"
  };