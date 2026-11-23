If your version of mysql doesn't like the .sql import, just use these two statements to create the nessecary tables:

CREATE TABLE `items` (
  `ID` varchar(36) DEFAULT (uuid()) PRIMARY KEY,
  `userID` varchar(36),
  `name` varchar(64),
  `description` varchar(512),
  `quantity` int);

  CREATE TABLE `users` (
  `ID` varchar(36) DEFAULT (uuid()) PRIMARY KEY,
  `firstName` varchar(64),
  `lastName` varchar(64),
  `userName` varchar(64) UNIQUE,
  `password` varchar(255));