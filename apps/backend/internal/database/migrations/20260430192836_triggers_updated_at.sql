-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE TRIGGER update_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TRIGGER update_user_credentials_updated_at
AFTER UPDATE ON user_credentials
FOR EACH ROW
BEGIN
    UPDATE user_credentials
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TRIGGER update_institutions_updated_at
AFTER UPDATE ON institutions
FOR EACH ROW
BEGIN
    UPDATE institutions
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TRIGGER update_hostels_updated_at
AFTER UPDATE ON hostels
FOR EACH ROW
BEGIN
    UPDATE hostels
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TRIGGER IF EXISTS update_users_updated_at;
DROP TRIGGER IF EXISTS update_user_credentials_updated_at;
DROP TRIGGER IF EXISTS update_institutions_updated_at;
DROP TRIGGER IF EXISTS update_hostels_updated_at;
-- +goose StatementEnd
