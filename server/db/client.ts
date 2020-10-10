"use strict";
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment]; 
const client = require('knex')(configuration); 
module.exports = client;
