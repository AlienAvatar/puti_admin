import * as React from 'react';
import { Fragment, memo } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import lodashGet from 'lodash/get';
import memoize from 'lodash/memoize';
import jsonExport from 'jsonexport/dist';
import {
    BooleanField,
    BulkDeleteButton,
    BulkExportButton,
    ChipField,
    SelectColumnsButton,
    CreateButton,
    DatagridConfigurable,
    DateField,
    downloadCSV,
    ExportButton,
    List,
    InfiniteList,
    NumberField,
    ReferenceArrayField,
    ReferenceManyCount,
    SearchInput,
    SimpleList,
    SingleFieldList,
    TextField,
    TextInput,
    TopToolbar,
    useTranslate,
    useAuthenticated,
    Datagrid,
    useRecordContext,
    EditButton,
    ShowButton,
    usePermissions,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as config from "../config";
import { article_data_context } from '../dataProvider';
import {FilterButton} from "../components/iFilterButton"
import { UserBulkActionButtonsGroup, getArticleFilters} from "../components/iUseBulkActionButtons"

export const PostIcon = BookIcon;

const ArticleListMobileActions = () => (
    <TopToolbar>
        {/* 添加筛选条件按钮 */}
        <FilterButton /> 
        {/* 创建文章按钮 */}
        <CreateButton />
    </TopToolbar>
);

const ArticleListMobile = (props) => (
    <InfiniteList
        filters={getArticleFilters()}
        sort={{ field: 'published_at', order: 'DESC' }}
        // exporter={exporter}
        actions={<ArticleListMobileActions />}
    >
        <SimpleList
            primaryText={record => record.title}
            secondaryText={record => `${record.views} views`}
            tertiaryText={record =>
                new Date(record.published_at).toLocaleDateString()
            }
        />
    </InfiniteList>
);

const StyledDatagrid = styled(DatagridConfigurable)(({ theme }) => ({
    '& .title': {
        maxWidth: '16em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .content': {
        maxWidth: '16em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .publishedAt': { fontStyle: 'italic' },
}));

const ArticleListBulkActions = memo(
    ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // children,
        ...props
    }) => (
        <Fragment>
            {/* <ResetViewsButton {...props} /> */}
            <BulkDeleteButton {...props} />
            <BulkExportButton {...props} />
        </Fragment>
    )
);

/**
 * Title 组件
 *
 * @returns 返回 ArticleListActions 组件的 React 元素
 */
const ArticleListActions = () => (
    <TopToolbar>
        {/* <SelectColumnsButton /> */}
        <FilterButton filters={getArticleFilters()}/>
        <CreateButton label="创建"/>
        <BulkDeleteButton label="删除" />
        {/* <ExportButton /> */}
    </TopToolbar>
);

const ArticleListActionToolbar = ({ children }) => (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);



const PostPanel = ({ record }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const tagSort = { field: 'name.en', order: 'ASC' };

const rowClick = memoize(permissions => (record) => {
    return Promise.resolve('show');
});

const ArticleListDesktop = (props) => {
    const { permissions } = usePermissions();
    return (
        <List
            filters={getArticleFilters()}
            filterDefaultValues={{is_delete: false}}
            sort={{ field: 'created_at', order: 'DESC' }}
            // exporter={exporter}
            actions={<ArticleListActions />}
        >
            <StyledDatagrid
                bulkActionButtons={<ArticleListActions />}
                rowClick={rowClick(permissions)}
                //expand={PostPanel}
                omit={['average_note']}
                // data={data_list}
            >
                {/* <TextField source="id" /> */}
                <TextField source="id" label="文件编号" />
                <TextField source="title" cellClassName="title" label="标题"/>
                <TextField source="author" cellClassName="author" label="作者"/>
                
                <TextField source="content" cellClassName="content" label="正文"/>

                <TextField source="category" cellClassName="category" label="类型"/>
                <NumberField source="views_count" label="浏览量" sortByOrder="DESC" />
                <NumberField source="support_count" label="点赞量" sortByOrder="DESC" />
                <DateField
                    source="created_at"
                    sortByOrder="DESC"
                    cellClassName="createdAt"
                    label="创建时间"
                />
                <DateField
                    source="updated_at"
                    sortByOrder="DESC"
                    cellClassName="updateAt"
                    label="更新时间"
                />
                <BooleanField
                    source="is_delete"
                    label="是否删除"
                    sortable={false}
                />
                <ArticleListActionToolbar>
                    <EditButton label="编辑"/>
                    <ShowButton label="展示"/>
                </ArticleListActionToolbar> 
            </StyledDatagrid>
        </List>
    )
};

/**
 * ArticleList 组件
 *
 * @returns 根据屏幕大小渲染不同组件，当屏幕小于等于中等尺寸时渲染 ArticleListMobile，否则渲染 ArticleListDesktop
 */
const ArticleList = () => {
    const isSmall = useMediaQuery<Theme>(
        theme => theme.breakpoints.down('md'),
        { noSsr: true }
    );

    useAuthenticated();

    // return isSmall ? <ArticleListMobile  {...articles}/> : <ArticleListDesktop {...articles}/>;
    return <ArticleListDesktop />;
};


  
export default ArticleList;
