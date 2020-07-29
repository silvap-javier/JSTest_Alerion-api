// var logModel = require('../models/logs');

module.exports = {
    responseError,
    responseSuccess
};

function responseError(req, res, error) {//, logData = {}, saveLogging = true) {
    error.code = 500;
    res.status(500).json({ status: "fail", error: error });
}

function responseSuccess(req, res, data) {//, logData = {}, saveLogging = true) {
    res.json({ status: "success", data: data });
}
