-- migrate:up
CREATE TABLE wallet_histories(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    all_token INT NOT NULL DEFAULT 0,
    add_token INT NOT NULL DEFAULT 0,
    use_token INT NOT NULL DEFAULT 0,
    stack_token INT NOT NULL DEFAULT 0,
    collect_token INT NOT NULL DEFAULT 0,
    state_id INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_wallet_histories_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES  states (id)
);
-- migrate:down
DROP TABLE wallet_histories;
