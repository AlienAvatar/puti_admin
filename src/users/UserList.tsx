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
    CreateButton,
    ExportButton,
    Toolbar,
    downloadCSV,
    BulkDeleteButton,
    BooleanInput,
    CheckboxGroupInput,
    ReferenceArrayInput,
    UpdateButton,
} from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import Aside from './Aside';
import UserEditEmbedded from './UserEditEmbedded';
export const UserIcon = PeopleIcon;
import {ListActionToolbar} from "../components/iListActionToolbar"
import {FilterButton} from "../components/iFilterButton"
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import { Box,} from '@mui/material';
import {useState} from 'react';

const getUserFilters = permissions =>
    [
        <SearchInput source="username" alwaysOn resettable placeholder="搜索用户名"/>,
        <TextInput source="nickname" label="添加搜索昵称"/>,
        <BooleanInput source="is_delete" label="是否删除"/>,
        // is_delete => <BooleanField source="is_delete" label="是否删除" value={is_delete}/>,
    ].filter(filter => filter !== null);


const exporterfn = (data) => {
    console.log(data);
    const data2 = data.map(post => (Object.assign(Object.assign({}, post), { backlinks: lodashGet(post, 'backlinks', []).map(backlink => backlink.url) })));
    return jsonExport(data2, (err, csv) => downloadCSV(csv, 'posts'));
}
const UserBulkActionButtons = props => {
    const { permissions } = usePermissions();
    return (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <FilterButton filters={getUserFilters(permissions)} />
            <CreateButton label="创建"></CreateButton>
            {/* <ExportButton label="导出" meta={"utf-8"} exporter={exporterfn}></ExportButton> */}
            <BulkDeleteButton label="删除" />
        </Box>
    )
};

const rowClick = memoize(permissions => (record) => {
    return Promise.resolve('show');
});

const UserList = (props) => {
    const { permissions } = usePermissions();
    const [isDelete, setIsDelete] = useState(false);

    return (
        <List
            filters={getUserFilters(permissions)}
            filterDefaultValues={{is_delete: false}}
            sort={{ field: 'nickname', order: 'ASC' }}
            aside={<Aside />}
            actions={<UserBulkActionButtons hasCreate={true}/>}
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
                    // expand={<UserEditEmbedded />}
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
