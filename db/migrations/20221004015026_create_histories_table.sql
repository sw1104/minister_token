-- migrate:up
CREATE TABLE histories(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    all_token INT,
    add_token INT,
    use_token INT,
    stack_token INT,
    collect_token INT,
    state_id INT,
    order_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_histories_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_histories_state_id FOREIGN KEY (state_id) REFERENCES  states (id),
    CONSTRAINT fk_order_history_id FOREIGN KEY (order_id) REFERENCES  orders (id)
);

-- migrate:down
DROP TABLE histories
