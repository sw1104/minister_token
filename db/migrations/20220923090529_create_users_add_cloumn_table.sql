-- migrate:up
ALTER TABLE users ADD refresh varchar(2000) NULL;

-- migrate:down

