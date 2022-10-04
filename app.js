const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routes = require("./src/routes");

const createApp = () => {
    const app = express();
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(routes);

    return app;
}

module.exports = { createApp };