/* eslint react/jsx-key: off */
import * as React from 'react';
import { Show, TabbedShowLayout, TextField, usePermissions } from 'react-admin';
import Aside from './Aside';
const UserShow = () => {
    const { permissions } = usePermissions();
    return (React.createElement(Show, null,
        React.createElement(TabbedShowLayout, null,
            React.createElement(TabbedShowLayout.Tab, { label: "user.form.summary" },
                React.createElement(TextField, { source: "id" }),
                React.createElement(TextField, { source: "name" })),
            permissions === 'admin' && (React.createElement(TabbedShowLayout.Tab, { label: "user.form.security", path: "security" },
                React.createElement(TextField, { source: "role" })))),
        React.createElement(Aside, null)));
};
export default UserShow;
