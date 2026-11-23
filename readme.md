Hello World! This will be the home of my Nov 2026 CRUD application attempt.

used mkcert to create local certs for https (on the backend) communication via axios to alleviate my anxiety about sending PT passwords to the server

also using mkcert plugin for vite to allow for local https use during development

when deploying to my server for live testing, I had to make the following compatibility changes to get it running in the linux (Rocky 8) environment:

1) removed the port parameter from the backend (app.js) connection handler to mySQL (using a non-default port on Windows, but default on Linux)
2) changed the certificate paths in the backend (app.js) to real certs on that machine as opposed to the localhost-only ones for development (for HTTPS)
3) changed the axios API target url from localhost to the correct live one in buttons.jsx in the frontend
4) I was not able to import the sqldump from my windows environment into the linux one, so I found it a lot easier to just remake the tables with the appropriate statements. I have included these in the database folder in case you run into a similar issue.