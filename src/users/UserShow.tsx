/* eslint react/jsx-key: off */
import * as React from 'react';
import { Show, TabbedShowLayout, TextField, usePermissions, SimpleShowLayout } from 'react-admin';
import { Avatar, } from '@mui/material';
import Aside from './Aside';
import PersonIcon from '@mui/icons-material/Person';
const UserShow = () => {
    const { permissions } = usePermissions();
    return (
        <Show title="展示">
            <SimpleShowLayout>
                <TextField source="id" />
                <Avatar>
                    <PersonIcon />
                </Avatar>
                <TextField label="用户名" source="username" />
                <TextField label="昵称" source="nickname" />
                <TextField label="邮箱" source="email" />
            </SimpleShowLayout>
        </Show>
    );
};

export default UserShow;
