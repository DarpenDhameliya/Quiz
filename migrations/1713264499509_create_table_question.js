module.exports = {
    up: "CREATE TABLE questions (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "question VARCHAR(100) NOT NULL," +
        "answer JSON NOT NULL," +
        "correct VARCHAR(255) NOT NULL," +
        "time BIGINT NOT NULL," +
        "coins DECIMAL(10, 2) DEFAULT 0.00," +
        "quiz_id INT," +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
        "FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE" +
        ")",
    down: "DROP TABLE questions"
};
