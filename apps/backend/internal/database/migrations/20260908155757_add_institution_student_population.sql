-- +goose Up
ALTER TABLE institutions ADD COLUMN average_student_population INTEGER;

-- +goose Down
ALTER TABLE institutions DROP COLUMN average_student_population;
