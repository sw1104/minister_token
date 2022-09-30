-- migrate:up
ALTER TABLE wallets CHANGE remain_token stack_token INT NOT NULL DEFAULT 0;

-- migrate:down

