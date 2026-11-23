# 2nd Lt George Gordin - Nov 2026 RAP CRUD Application


[My Project is Live Here!](https://snakeserver.tech)

This is 2nd Lt George "Jake" Gordin, and I have had a great time with my second attempt at the RAP Practical examination. If you have any other questions please feel free to contact me:

[Military Email](mailto:george.gordin@spaceforce.mil)
[Civilian Email](mailto:gcgordin@gmail.com)

## Table of Contents

- [Overview](#Overview)
- [Front-End](#Front-End)
- [Back-End / API](#Back-End)
- [Database](#Database)
- [Deployment](#Deployment)
- [Conclusion](#Conclusion)

## Overview

This repo contains the frontend, backend, and database information for my CRUD application product, creatively called 'inventory'. I learned quite a bit from my last RAP experience, and I have made many improvements to my organization and structure when using React components. The Context API in particular was a very useful tool when keeping states organized.

## Front-End

As mentioned above, this time my react components are far better organized and seperated into component categories for better clarity and easier tracking. I moved the majority of my styling to inline references, but kept some body-targeting CSS (mainly the background) in an index.css file. 

## Back-End

The backend api (app.js, running live via PM2) handles the api methods (GET, PUT, DELETE, POST) via HTTPS. I decided that, since the password hashing is being done server-side (bcrypt), it was necessary to secure the front-to-back communication via HTTPS/TLS to avoid transmitting plaintext passwords.

## Database

This utlizes two tables worth of data, the schema of which is detailed in the Deployment section below. The database communication parameters arae located in /backend/.env, where the backend app looks for connection information. This may need to be altered depending on the local DB setup.

## Deployment

When deploying to my server for live production version, I had to make the following compatibility changes to get it running in the linux (Rocky 8) environment:

1) Removed the port parameter from the backend (app.js) connection handler to mySQL (using a non-default port on Windows, but default on Linux).

2) Changed the certificate paths in the backend (app.js) to real certs on that machine as opposed to the localhost-only ones for development (for HTTPS)

3) Changed the axios API target url from localhost to the correct live one in buttons.jsx in the frontend.

4) I was not able to import the sqldump from my windows environment into the linux one (although it works fine in the same environment), so I found it a lot easier to just remake the user / tables with the appropriate statements. Those statements are:

```
create database inventory;

use inventory;

create user 'inventoryUser' identified by 'dbPass';

grant all on inventory.* to 'inventoryUser';

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
```

After database setup is complete, the app can be installed by:

```
git clone https://github.com/Jake-Gordin/inventory.git

cd inventory

cd backend

npm install

node app.js (starting the backend)

(new console window) cd inventory

cd frontend

npm install

npm run build

npm run dev (starting the local frontend server)
```
...then just navigate to https://localhost:5173 (or whatever port is set up) and you should be right as rain. NPM install will pull down the mkcert plugin for vite, as defined in the vite.config.js file. This will handle the HTTPS certification for the server on localhost. If the certs in the backend/certs folder do not work on transfer to a different machine, new ones can be easily generated with mkcert (or whatever certification service one prefers). There are directory variables at the top of backend/app.js should one need to retarget these to enable secure communications, but I would just suggest dropping them in the provided folder.

## Conclusion

Thank you once again for taking the time and effort to review my work. I appreciate all of the hard work you have done facilitating this exam!
