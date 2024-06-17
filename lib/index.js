/* eslint react/jsx-key: off */
import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import authProvider from './authProvider';
import comments from './comments';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import posts from './posts';
import users from './users';
import tags from './tags';
import articles from './articles';
render(React.createElement(React.StrictMode, null,
    React.createElement(Admin, { authProvider: authProvider, dataProvider: dataProvider, i18nProvider: i18nProvider, title: "Example Admin", layout: Layout },
        React.createElement(CustomRoutes, { noLayout: true },
            React.createElement(Route, { path: "/custom", element: React.createElement(CustomRouteNoLayout, { title: "Posts from /custom" }) })),
        React.createElement(Resource, Object.assign({ name: "posts" }, posts)),
        React.createElement(Resource, Object.assign({ name: "comments" }, comments)),
        React.createElement(Resource, Object.assign({ name: "tags" }, tags)),
        React.createElement(Resource, Object.assign({ name: "articles" }, articles)),
        ((permissions) => (React.createElement(React.Fragment, null,
            permissions ? React.createElement(Resource, Object.assign({ name: "users" }, users)) : null,
            React.createElement(CustomRoutes, { noLayout: true },
                React.createElement(Route, { path: "/custom1", element: React.createElement(CustomRouteNoLayout, { title: "Posts from /custom1" }) })))))(authProvider === null || authProvider === void 0 ? void 0 : authProvider.getPermissions()),
        React.createElement(CustomRoutes, null,
            React.createElement(Route, { path: "/custom3", element: React.createElement(CustomRouteLayout, { title: "Posts from /custom3" }) })))), document.getElementById('root'));
