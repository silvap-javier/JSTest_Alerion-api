exports.getAll = getAll;
exports.getOne = getOne;
exports.post = post;
exports.put = put;
exports.$delete = $delete;
const fs = require('fs')
const db = './api/store/images.json'

async function getAll(query, callback){
    let images = JSON.parse(fs.readFileSync(db, 'utf8'));
    return images
}

async function getOne(id){
    let images = JSON.parse(fs.readFileSync(db, 'utf8'));
    return images.find(x => x.id === id)
};

async function post(data){
    let images = JSON.parse(fs.readFileSync(db, 'utf8'));
    images.push(data)
    return fs.writeFileSync(db, JSON.stringify(images))
};

async function put(data){
    let images = JSON.parse(fs.readFileSync(db, 'utf8'));
    let image = await getOne(data.id)
    let index = images.findIndex(x => x.id ==image.id)
    images[index] = data
    return fs.writeFileSync(db, JSON.stringify(images))
};

async function $delete(guid, callback){
   
}    