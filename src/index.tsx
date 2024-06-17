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
import GlobalProvider from './data';
render(
    <React.StrictMode>
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            title="Example Admin"
            layout={Layout}
        >
            <CustomRoutes noLayout>
                <Route
                    path="/login"
                    element={<CustomRouteNoLayout title="Posts from /custom" />}
                />
            </CustomRoutes>
            <Resource name="users" {...users} />
            <Resource name="articles" {...articles} />
            <Resource name="comments" {...comments} />
            {/* {permissions => (
                <>
                    {permissions ? <Resource name="users" {...users} /> : null}
                    <CustomRoutes noLayout>
                        <Route
                            path="/custom1"
                            element={
                                <CustomRouteNoLayout title="Posts from /custom1" />
                            }
                        />
                    </CustomRoutes>
                    <CustomRoutes>
                        <Route
                            path="/custom2"
                            element={
                                <CustomRouteLayout title="Posts from /custom2" />
                            }
                        />
                    </CustomRoutes>
                </>
            )} */}
             {/* {((permissions: any) => (
        <>
            {permissions ? <Resource name="users" {...users} /> : null}
            <CustomRoutes noLayout>
                <Route
                    path="/custom1"
                    element={
                        <CustomRouteNoLayout title="Posts from /custom1" />
                    }
                />
            </CustomRoutes>
        </>
        ))(authProvider?.getPermissions() as any)}
            <CustomRoutes>
                <Route
                    path="/custom3"
                    element={<CustomRouteLayout title="Posts from /custom3" />}
                />
            </CustomRoutes> */}
        </Admin>
    </React.StrictMode>,
    document.getElementById('root')
);
