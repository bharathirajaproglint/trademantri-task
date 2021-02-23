'use strict';

//Imports
import express from 'express';
import RouterOptions from '../config/RouterOptions';
import ProcessRoutes from './ProcessRoutes';

//Routes
import MainRoutes from './main';

let MainRouter = express.Router(RouterOptions);
if (MainRoutes && MainRoutes.length > 0) {
    MainRouter = ProcessRoutes(MainRouter, MainRoutes);
} else {
    console.error('There is no Main route configured')
}

export { MainRouter};