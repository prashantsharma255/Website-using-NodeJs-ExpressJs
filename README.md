# Building a website with Node.js and Express.js

The master branch contains the initial version to get started with, while the branches contain the state of the code at the beginning (e.g. 02_02**b**) and end (e.g. 02_02**e**) of a video.

## Setting up the project

* In your terminal, create directory `building-website-nodejs-express` and **change into it**.
* Run 
  ```bash
  git clone --bare git@github.com:danielkhan/building-website-nodejs-express.git .git
  git config --bool core.bare false
  git reset --hard
  git branch
  ```
  
A dynamic website built using Node.js and Express.js like this project, involves the following components:

- A server built using Node.js and the Express.js web framework to handle incoming HTTP requests and provide responses.
- A database to store data such as user profiles, posts, comments, and other content that needs to be dynamically generated and displayed on the website.
- A front-end user interface built using HTML, CSS, and JavaScript that communicates with the server via AJAX requests to dynamically update the content of the website without requiring a page reload.
- Middleware to handle common tasks such as user authentication, request logging, error handling, and security.  

The website works by having the user interact with the front-end interface, which sends HTTP requests to the server to fetch data from the database and update the content of the website in real-time. The server uses the data stored in the database to dynamically generate HTML templates and send them back to the client. The use of Node.js and Express.js allows for high performance and scalability, making it well-suited for building complex and highly dynamic web applications.
