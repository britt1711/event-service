DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id INT NOT NULL IDENTITY(1000,1) PRIMARY KEY, -- autoincrements up from number 1000
    userId int NOT NULL,
    title nvarchar(200) NOT NULL,
    [description] nvarchar(1000) NULL,
    startDatetime datetime NOT NULL,
    endDatetime datetime NOT NULL,
    eventTypeId int NOT NULL,
    venueName nvarchar(50) NULL,
    street nvarchar(70) NOT NULL,
    city nvarchar(50) NOT NULL,
    [state] nchar(2) NOT NULL,
    zipcode char(5) NOT NULL,
    country nvarchar(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (eventTypeId) REFERENCES event_types(id)
)

-- pre-inserted data to use for testing later
INSERT INTO events (userId, title, [description], startDatetime, endDatetime, eventTypeId, venueName, street, city, [state], zipcode, country)
VALUES
    (1, N'BirthdayBash', N'Celebrate my 21st with me!', '2022-01-01 18:00', '2022-01-02 04:00', 8, N'Somewhere Nowhere', N'112 W 25th St', N'New York', N'NY', '10001', N'United States'),
    (1, N'Galentines', N'Picnic in the park!', '2022-02-13 16:00', '2022-02-13 20:00', 8, N'Washington Square Park', N'Washington Square', N'New York', N'NY', '10012', N'United States'),
    (2, N'World Tour', N'Americas Tour. Come check us out in Austin!', '2022-05-01 18:00', '2022-05-02 01:00', 6, N'ACL Live', N'123 Austin St', N'Austin', N'TX', '70708', N'United States'),
    (3, N'DeadPool Premier', N'I am on tv mom!!', '2022-08-23 15:00', '2022-08-23 17:00', 7, N'AMC', N'1038 Movie Dr', N'Dallas', N'TX', '75060', N'United States')

/*
NOTE: NVARCHAR allows for internationalization because it supports unicode data
*/