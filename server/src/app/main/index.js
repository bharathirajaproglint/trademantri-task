'use strict';

import { MediaType } from '../../config/Constants';
import Handler from './Handler';

export default [
    {
        path: '/login',
        type: MediaType.POST,
        method: Handler.login,
        options: {},
    },
    {
        path: '/data/create',
        type: MediaType.POST,
        method: Handler.Create,
        options: {},
    },
    {
        path: '/data/find',
        type: MediaType.GET,
        method: Handler.Find,
        options: {},
    },
    {
        path: '/template/find',
        type: MediaType.GET,
        method: Handler.findTemplate,
        options: {},
    },
    {
        path: '/template/update',
        type: MediaType.POST,
        method: Handler.updateTemplate,
        options: {},
    },
    {
        path: '/comapny/find',
        type: MediaType.GET,
        method: Handler.findCompany,
        options: {},
    },
    {
        path: '/source/find',
        type: MediaType.GET,
        method: Handler.findSourceConfig,
        options: {},
    },
    {
        path: '/source/update',
        type: MediaType.POST,
        method: Handler.updateSourceConfig,
        options: {},
    }
];