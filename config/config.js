require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.version = '1.0.0'

CONFIG.app = process.env.APP || 'dev'; //if app is LOCAL redis server wont be loaded
CONFIG.port = process.env.PORT || '10011';
module.exports = CONFIG;