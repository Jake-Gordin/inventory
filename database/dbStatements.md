If your version of mysql doesn't like the .sql import, just use these two statements to create the nessecary tables:

CREATE TABLE `items` (
  `ID` varchar(36) NOT NULL DEFAULT (uuid()),
  `userID` varchar(36) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`ID`)

  CREATE TABLE `users` (
  `ID` varchar(36) NOT NULL DEFAULT (uuid()),
  `firstName` varchar(64) DEFAULT NULL,
  `lastName` varchar(64) DEFAULT NULL,
  `userName` varchar(64) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `userName` (`userName`)