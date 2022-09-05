CREATE PROCEDURE updateComplete(
@project_id VARCHAR(100))
AS
BEGIN
UPDATE ProjectsTable
SET 

is_complete='1'

WHERE 
project_id=@project_id
END