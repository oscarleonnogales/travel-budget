# Borderless Expense Tracker

The ideal expense tracker for travelers and digital nomads. This web app allows users to input and track expenses in 200+ currencies and receive a real time conversion; users can review their monthly and yearly spending habits with generated graphs and reports.

[Live Demo](https://quizzical-dijkstra-ce920f.netlify.app) :point_left:

## Built with

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)

See the package.json file in the client and server directories for a full list of dependencies.

## Authentication

Authentication is handled with either [JWT](https://jwt.io/introduction)'s or Google's [OAuth](https://developers.google.com/identity/protocols/oauth2). Passwords are hashed with [bcrypt](https://www.npmjs.com/package/bcrypt) before being stored on the database.
