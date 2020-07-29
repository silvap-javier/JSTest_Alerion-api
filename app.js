"use strict";

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();

const CONFIG = require("./config/config");

var models = null; // load after ddbbs connections
var cookieParser = require("cookie-parser");
var cors = require("cors");
var SwaggerUi = require("swagger-ui-express");

var resolve = require("json-refs").resolveRefs;
var YAML = require("yamljs");
const swaggerDocument = YAML.load("./api/swagger/swagger.yaml");

var options = {
    filter: ["relative", "remote"],
    resolveCirculars: false,
    loaderOptions: {
        processContent: function (res, callback) {
            callback(YAML.parse(res.text));
        }
    }
};
var swaggerDocumentLoaded = "";

global.loginRateLimiterRedis = null;

resolve(swaggerDocument, options)
    .then(function (results) {
        // console.log(results.refs)
        swaggerDocumentLoaded = results.resolved
        // console.log('-------------')
        // console.log(results.resolved)
    })
    .catch(function (reason) {
        console.log("errorPath", reason.stack);
    });

module.exports = app;

//setting swagger AUTH BASIC HANDLER
var config = {
    appRoot: __dirname, // required config
};

// database connection initialize
// Pre condition to start API (1)
// console.log("CONFIG:", CONFIG);
startAPI();

// API Start when pre condition's are completed
function startAPI() {
    app.enable('trust proxy');

    app.use(cookieParser());

    // CORS
    app.use(cors());

    // CORS middleware
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    SwaggerExpress.create(config, function (err, swaggerExpress) {
        if (err) { console.log("errorCreate", err); }

        // install middleware
        swaggerExpress.register(app);

        var port = CONFIG.port;

        //loading api docs - using reensambled yaml file
        app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocumentLoaded));
        app.listen(port, function () {
            console.log("API running on port: " + port);
        });
        // start tasks
    });
}