'use strict';
require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const Helper = require('../shared');
const helper = new Helper('web-app');
// project root
const webApp = helper.getProjectRoot('app/web-app/');

// static files (images, css, js, etc)
const staticFiles = webApp+'public';
// handlebar root templates location
const viewFields = webApp+'src/hbs/templates';
// handlebars partials location
const partialsFiles = webApp+'src/hbs/partials';

const server = express();

server.use(express.static(staticFiles));

server.set('view engine', 'hbs');
server.set('views', viewFields);

hbs.registerPartials(partialsFiles);
hbs.localsAsTemplateData(server);

// main route
server.get('/', (req, res)=>{
	helper.log('connected');
	return res.render('index');
});

server.listen(process.env.CLIENT_PORT, ()=>helper.log(`http://localhost:${process.env.CLIENT_PORT}`));