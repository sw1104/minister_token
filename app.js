const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require('./src/middlewares/errorHandler')
require("express-async-errors");

const routes = require("./src/routes");

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(routes);
    app.use(errorHandler);

    return app;
}

module.exports = { createApp };