'use strict';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

//Routes configuration
import { MainRouter } from './app';

const App = express();

// parse application/json
App.use(bodyParser.json({ limit: '50mb', extended: true }));
App.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
App.use(cors());
App.use(logger('dev'));
App.use(cookieParser());
App.use(express.static(path.join(__dirname, 'public')));

App.use('/api', MainRouter);

export default App;
