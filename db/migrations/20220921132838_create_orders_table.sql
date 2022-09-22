-- migrate:up
CREATE TABLE orders(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE cascade,
    CONSTRAINT fk_orders_product_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE cascade
);

-- migrate:down
DROP TABLE orders;