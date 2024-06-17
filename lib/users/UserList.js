/* eslint react/jsx-key: off */
import PeopleIcon from '@mui/icons-material/People';
import memoize from 'lodash/memoize';
import { useMediaQuery } from '@mui/material';
import * as React from 'react';
import { BulkDeleteWithConfirmButton, Datagrid, List, SearchInput, SimpleList, TextField, TextInput, usePermissions, } from 'react-admin';
import Aside from './Aside';
import UserEditEmbedded from './UserEditEmbedded';
export const UserIcon = PeopleIcon;
const getUserFilters = permissions => [
    React.createElement(SearchInput, { source: "q", alwaysOn: true }),
    React.createElement(TextInput, { source: "name" }),
    permissions === 'admin' ? React.createElement(TextInput, { source: "role" }) : null,
].filter(filter => filter !== null);
const UserBulkActionButtons = props => (React.createElement(BulkDeleteWithConfirmButton, Object.assign({}, props)));
const rowClick = memoize(permissions => () => {
    return permissions === 'admin'
        ? Promise.resolve('edit')
        : Promise.resolve('show');
});
const UserList = () => {
    const { permissions } = usePermissions();
    return (React.createElement(List, { filters: getUserFilters(permissions), filterDefaultValues: { role: 'user' }, sort: { field: 'name', order: 'ASC' }, aside: React.createElement(Aside, null) }, useMediaQuery((theme) => theme.breakpoints.down('md')) ? (React.createElement(SimpleList, { primaryText: record => record.name, secondaryText: record => permissions === 'admin' ? record.role : null })) : (React.createElement(Datagrid, { rowClick: rowClick(permissions), expand: React.createElement(UserEditEmbedded, null), bulkActionButtons: React.createElement(UserBulkActionButtons, null), optimized: true },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "name" }),
        permissions === 'admin' && React.createElement(TextField, { source: "role" })))));
};
export default UserList;
