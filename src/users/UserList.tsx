/* eslint react/jsx-key: off */
import PeopleIcon from '@mui/icons-material/People';
import memoize from 'lodash/memoize';
import { useMediaQuery, Theme, Avatar, } from '@mui/material';
import * as React from 'react';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    List,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
    usePermissions,
    EditButton,
    ShowButton,
    BooleanField,
} from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import Aside from './Aside';
import UserEditEmbedded from './UserEditEmbedded';
export const UserIcon = PeopleIcon;
import {ListActionToolbar} from "../components/iListActionToolbar"
const getUserFilters = permissions =>
    [
        <SearchInput source="q" alwaysOn />,
        <TextInput source="nickname" />,
    ].filter(filter => filter !== null);

const UserBulkActionButtons = props => (
    <BulkDeleteWithConfirmButton {...props} />
);

const rowClick = memoize(permissions => (record) => {
    return Promise.resolve('show');
});

const UserList = (props) => {
    const { permissions } = usePermissions();
    return (
        <List
            filters={getUserFilters(permissions)}
            filterDefaultValues={{ role: 'user' }}
            sort={{ field: 'nickname', order: 'ASC' }}
            aside={<Aside />}
        >
            {useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record =>
                        permissions === 'admin' ? record.role : null
                    }
                />
            ) : (
                <Datagrid
                    rowClick={rowClick(permissions)}
                    expand={<UserEditEmbedded />}
                    bulkActionButtons={<UserBulkActionButtons />}
                    optimized
                >
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    <TextField source="id" />
                    <TextField source="username" label="用户名" />
                    <TextField source="nickname" label="昵称" />
                    <TextField source="email" label="E-mail" />
                    <BooleanField
                        source="is_delete"
                        label="是否删除"
                        sortable={false}
                    />
                    <ListActionToolbar>
                        <EditButton label="编辑"/>
                        <ShowButton label="展示"/>
                    </ListActionToolbar> 
                </Datagrid>
            )}
        </List>
    );
};

export default UserList;
