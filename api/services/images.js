var models = require("../models/index");

async function getAll(){
  return await models.images.getAll()
}

async function getOne(id){
  return await models.images.getOne(id)
}

async function put(image){
  return await models.images.put(image)
}

async function post(image){
  return await models.images.post(image)
}

module.exports = {
  getAll,
  getOne,
  put,
  post
};