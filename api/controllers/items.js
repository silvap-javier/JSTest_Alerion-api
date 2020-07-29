"use strict";

const CONFIG = require('../../config/config');
// var axios = require("../services/axios");
var moment = require("moment");
var models = require("../models/index");
var responseSrv = require("../services/responses");
var imagesSrv = require("../services/images");

function getAll(req, res) {
    async function _getAll(){
        let images = await imagesSrv.getAll()
        responseSrv.responseSuccess(req, res, images);
    }
    _getAll()
}

function put(req, res) {
    async function _put(){
        let id = req.body.id
        let image = await imagesSrv.getOne(id)
        if (image){
            for (let attr in req.body) {
                image[attr] =  req.body[attr]
            }
            await imagesSrv.put(image)
            responseSrv.responseSuccess(req, res,image);
        }else{
            return responseSrv.responseError(req, res, {
                code: 404,
                message: 'ITEMS NOT_FOUND'
            });
        }
    }
    _put()
}

function post(req, res) {
    async function _put(){
        let id = req.body.id
        let image = await imagesSrv.getOne(id)
        if (image){
            return responseSrv.responseError(req, res, {
                code: 404,
                message: 'ITEMS ID REPEAT'
            });
        }else{
            await imagesSrv.post(req.body)
            responseSrv.responseSuccess(req, res,req.body);
        }
    }
    _put()
}

module.exports = {
    post: post,
    put: put,
    //delete: $delete,
    //get: get,
    getAll:getAll
};