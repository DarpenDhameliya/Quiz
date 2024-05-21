module.exports = {
    "up": "CREATE TABLE setting (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "image VARCHAR(200) COLLATE utf8mb4_general_ci DEFAULT NULL," +
        "websitename VARCHAR(255) DEFAULT NULL," +
        "adscoin INT DEFAULT NULL," +
        "examtime VARCHAR(50) DEFAULT NULL," +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
        ")",
    "down": "DROP TABLE setting"
};
