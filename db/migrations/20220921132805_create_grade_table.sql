-- migrate:up
CREATE TABLE grades(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    grade VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE grades;