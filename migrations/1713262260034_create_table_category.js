module.exports = {
    "up": "CREATE TABLE category (" +
    "id INT AUTO_INCREMENT PRIMARY KEY," +
    "name VARCHAR(100) DEFAULT NULL," +
    "image varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL," +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
    "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
    ")",
    "down": "DROP TABLE category"
}