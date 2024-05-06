module.exports = {
    "up": "CREATE TABLE quiz (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "title VARCHAR(100) DEFAULT NULL," +
        "totalPrice INT DEFAULT 0," +
        "entryFee INT DEFAULT 0," +
        "category_id INT," +
        "live BOOLEAN DEFAULT FALSE," +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
        "FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE" +
        ")",
    "down": "DROP TABLE quiz"
}