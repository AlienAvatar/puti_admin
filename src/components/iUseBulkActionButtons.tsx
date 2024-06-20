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
    ReferenceInput,
} from 'react-admin';
import {FilterButton} from "./iFilterButton";
import { Box,} from '@mui/material';
import * as React from 'react';

export const getUserFilters = () =>
    [
        <SearchInput source="username" alwaysOn resettable placeholder="搜索用户名"/>,
        <TextInput source="nickname" label="添加搜索昵称"/>,
        <BooleanInput source="is_delete" label="是否删除"/>,
        // is_delete => <BooleanField source="is_delete" label="是否删除" value={is_delete}/>,
    ].filter(filter => filter !== null);
    
export const getArticleFilters = () =>
    [
        <SearchInput source="title" alwaysOn resettable placeholder="搜索标题"/>,
        <TextInput source="author" label="添加搜索作者"/>,
        <BooleanInput source="is_delete" label="是否删除"/>,
        // is_delete => <BooleanField source="is_delete" label="是否删除" value={is_delete}/>,
    ].filter(filter => filter !== null);

export const getCommentFilters = () =>
    [
        <SearchInput source="article_id" alwaysOn resettable placeholder="搜索文章id"/>,
        <ReferenceInput source="author" reference="articles" label="添加搜索作者"/>,
        <BooleanInput source="is_delete" label="是否删除"/>,
        // is_delete => <BooleanField source="is_delete" label="是否删除" value={is_delete}/>,
    ].filter(filter => filter !== null);

export const UserBulkActionButtonsGroup = (filter_name) => {
    let component = null;
    if(filter_name === "user"){
        component = <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <FilterButton filters={getUserFilters()} />
                            <CreateButton label="创建"></CreateButton>
                            {/* <ExportButton label="导出" meta={"utf-8"} exporter={exporterfn}></ExportButton> */}
                            <BulkDeleteButton label="删除" />
                        </Box>
    }else if(filter_name === "article"){
        component = <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <FilterButton filters={getArticleFilters()} />
                        <CreateButton label="创建"></CreateButton>
                        {/* <ExportButton label="导出" meta={"utf-8"} exporter={exporterfn}></ExportButton> */}
                        <BulkDeleteButton label="删除" />
                    </Box>
    }else if(filter_name === "comment"){
        component = <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <FilterButton filters={getCommentFilters()} />
                        <CreateButton label="创建"></CreateButton>
                        {/* <ExportButton label="导出" meta={"utf-8"} exporter={exporterfn}></ExportButton> */}
                        <BulkDeleteButton label="删除" />
                    </Box>
    }else {
        component = <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <FilterButton filters={getUserFilters()} />
                        <CreateButton label="创建"></CreateButton>
                        {/* <ExportButton label="导出" meta={"utf-8"} exporter={exporterfn}></ExportButton> */}
                        <BulkDeleteButton label="删除" />
                    </Box>
    }

    return (
        {component}
    )
};
    
