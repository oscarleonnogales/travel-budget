# Borderless Expense Tracker

An expense tracker built for travelers and people living near an international border. This web app
allows you to input your expenses in any currency, and it automatically calculates the realtime conversion
back to your home country's currency. See and print detailed reports of your monthly and yearly spending
habits.

[Live Demo](https://quizzical-dijkstra-ce920f.netlify.app) :point_left:

## Built with

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)

See the package.json files in the client and server directories for a full list of dependencies.

## Authentication

Users have the option to sign up through the traditional email and password or using their Google account. Passwords are encrypted with [bcrypt](https://www.npmjs.com/package/bcrypt) before being stored on the database. Authorization and sessions are handled through the [JWT](https://jwt.io/introduction) method.
