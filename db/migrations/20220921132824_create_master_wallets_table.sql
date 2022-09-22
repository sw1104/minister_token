-- migrate:up
CREATE TABLE master_wallets(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    full_token INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_master_wallets_users FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE master_wallets;