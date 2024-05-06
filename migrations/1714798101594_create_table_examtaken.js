module.exports = {
    up: `
        CREATE TABLE quiz_attempt (
            id INT AUTO_INCREMENT PRIMARY KEY,
            start_time BIGINT NOT NULL,
            total_time DECIMAL(10, 3) NOT NULL,
            score INT NOT NULL,
            user_id INT,
            quiz_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id), 
            FOREIGN KEY (quiz_id) REFERENCES quiz(id) 
        )
    `,
    down: "DROP TABLE quiz_attempt"
};
