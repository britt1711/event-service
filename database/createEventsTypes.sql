DROP TABLE IF EXISTS event_types;

-- create table for event types
CREATE TABLE event_types (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, -- autoincrements up from number 1
    [name] NVARCHAR(50) NOT NULL
);

-- creating and deleting event types is beyond the scope of this project
-- manually add in event types
-- in reality, this table should be dynamic
INSERT INTO event_types ([name])
VALUES
    (N'Fundraising Event'),
    (N'Anime Convention'),
    (N'Music Festival'),
    (N'Seminar'),
    (N'Sports'),
    (N'Concert'),
    (N'Movie Premier'),
    (N'Other')
