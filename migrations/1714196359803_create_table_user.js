module.exports = {
    up: "CREATE TABLE users (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "password VARCHAR(500) NOT NULL," +
        "email VARCHAR(100) UNIQUE NOT NULL," +
        "balance DECIMAL(10, 2) DEFAULT 100.00," +
        "type VARCHAR(50) DEFAULT 'user'," +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
        ")",
    down: "DROP TABLE users"
};
