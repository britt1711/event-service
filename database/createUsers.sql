DROP TABLE IF EXISTS users;

-- create table for event types
CREATE TABLE users (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, -- autoincrements up from number 1
    email NVARCHAR(0) NOT NULL UNIQUE,
    pwd NVARCHAR(50) NOT NULL, --password would typically have an encryption
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL
);

-- creating and deleting users is beyond the scope of this project
-- manually add in users
-- in reality, this table should be dynamic
INSERT INTO users (email, pwd, firstName, lastName)
VALUES
    (N'Admin@gmail.com', N'Password', N'Administrator', N'Testing'),
    (N'TheBiebs123@gmail.com', N'BabyBabyOOO', N'Justin', N'Bieber'),
    (N'DeadPoolDude@gmail.com', N'DeadPool', N'Ryan', N'Reynolds'),
    (N'Anon@gmail.com', N'Anonymous', N'Jane', N'Doe')
