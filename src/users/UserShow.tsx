/* eslint react/jsx-key: off */
import * as React from 'react';
import { Show, TabbedShowLayout, TextField, usePermissions, SimpleShowLayout,
    TopToolbar,EditButton,CloneButton
 } from 'react-admin';
import { Avatar, } from '@mui/material';
import Aside from './Aside';
import PersonIcon from '@mui/icons-material/Person';
const ShowActions = () =>{
    return (
        <TopToolbar>
            {/* <CloneButton label="复制" className="button-clone" /> */}
            <EditButton label="编辑"/>
        </TopToolbar>
    )
} 
const UserShow = () => {
    const { permissions } = usePermissions();
    return (
        <Show title="展示" actions={<ShowActions/>} >
            <SimpleShowLayout>
                <TextField source="id" />
                {/* <Avatar>
                    <PersonIcon />
                </Avatar> */}
                <TextField label="用户名" source="username" />
                <TextField label="昵称" source="nickname" />
                <TextField label="邮箱" source="email" />
            </SimpleShowLayout>
        </Show>
    );
};

export default UserShow;
