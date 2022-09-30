-- migrate:up
CREATE TABLE states(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(200) NOT NULL
);
-- migrate:down
DROP TABLE states;
