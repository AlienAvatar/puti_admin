var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Fragment, memo } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import { BooleanField, BulkDeleteButton, BulkExportButton, ChipField, SelectColumnsButton, CreateButton, DatagridConfigurable, DateField, downloadCSV, EditButton, ExportButton, FilterButton, List, InfiniteList, NumberField, ReferenceArrayField, ReferenceManyCount, SearchInput, ShowButton, SimpleList, SingleFieldList, TextField, TextInput, TopToolbar, useTranslate, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ResetViewsButton from './ResetViewsButton';
export const PostIcon = BookIcon;
/**
 * 快速筛选组件
 *
 * @param label 筛选标签
 * @param source 数据源
 * @param defaultValue 默认值
 * @returns 返回 Chip 组件
 */
const QuickFilter = ({ label, }) => {
    const translate = useTranslate();
    return React.createElement(Chip, { sx: { marginBottom: 1 }, label: translate(label) });
};
const postFilter = [
    React.createElement(SearchInput, { source: "q", alwaysOn: true }),
    React.createElement(TextInput, { source: "title", defaultValue: "Qui tempore rerum et voluptates" }),
    React.createElement(QuickFilter, { label: "resources.posts.fields.commentable", source: "commentable", defaultValue: true }),
];
/**
 * 导出文章数据
 *
 * @param posts 文章列表
 * @returns 导出后的 CSV 文件
 */
const exporter = posts => {
    const data = posts.map(post => (Object.assign(Object.assign({}, post), { backlinks: lodashGet(post, 'backlinks', []).map(backlink => backlink.url) })));
    return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
};
const PostListMobileActions = () => (React.createElement(TopToolbar, null,
    React.createElement(FilterButton, null),
    React.createElement(CreateButton, null),
    React.createElement(ExportButton, null)));
const PostListMobile = () => (React.createElement(InfiniteList, { filters: postFilter, sort: { field: 'published_at', order: 'DESC' }, exporter: exporter, actions: React.createElement(PostListMobileActions, null) },
    React.createElement(SimpleList, { primaryText: record => record.title, secondaryText: record => `${record.views} views`, tertiaryText: record => new Date(record.published_at).toLocaleDateString() })));
const StyledDatagrid = styled(DatagridConfigurable)(({ theme }) => ({
    '& .title': {
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
const PostListBulkActions = memo((_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(Fragment, null,
        React.createElement(ResetViewsButton, Object.assign({}, props)),
        React.createElement(BulkDeleteButton, Object.assign({}, props)),
        React.createElement(BulkExportButton, Object.assign({}, props))));
});
const PostListActions = () => (React.createElement(TopToolbar, null,
    React.createElement(SelectColumnsButton, null),
    React.createElement(FilterButton, null),
    React.createElement(CreateButton, null),
    React.createElement(ExportButton, null)));
const PostListActionToolbar = ({ children }) => (React.createElement(Box, { sx: { alignItems: 'center', display: 'flex' } }, children));
const rowClick = (_id, _resource, record) => {
    if (record.commentable) {
        return 'edit';
    }
    return 'show';
};
const PostPanel = ({ record }) => (React.createElement("div", { dangerouslySetInnerHTML: { __html: record.body } }));
const tagSort = { field: 'name.en', order: 'ASC' };
const PostListDesktop = () => (React.createElement(List, { filters: postFilter, sort: { field: 'published_at', order: 'DESC' }, exporter: exporter, actions: React.createElement(PostListActions, null) },
    React.createElement(StyledDatagrid, { bulkActionButtons: React.createElement(PostListBulkActions, null), rowClick: rowClick, expand: PostPanel, omit: ['average_note'] },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "title", cellClassName: "title" }),
        React.createElement(DateField, { source: "published_at", sortByOrder: "DESC", cellClassName: "publishedAt" }),
        React.createElement(ReferenceManyCount, { label: "resources.posts.fields.nb_comments", reference: "comments", target: "post_id", link: true }),
        React.createElement(BooleanField, { source: "commentable", label: "resources.posts.fields.commentable_short", sortable: false }),
        React.createElement(NumberField, { source: "views", sortByOrder: "DESC" }),
        React.createElement(ReferenceArrayField, { label: "Tags", reference: "tags", source: "tags", sortBy: "tags.name", sort: tagSort, cellClassName: "hiddenOnSmallScreens", headerClassName: "hiddenOnSmallScreens" },
            React.createElement(SingleFieldList, null,
                React.createElement(ChipField, { clickable: true, source: "name.en", size: "small" }))),
        React.createElement(NumberField, { source: "average_note" }),
        React.createElement(PostListActionToolbar, null,
            React.createElement(EditButton, null),
            React.createElement(ShowButton, null)))));
/**
 * PostList 组件
 *
 * @returns 根据屏幕大小渲染不同组件，当屏幕小于等于中等尺寸时渲染 PostListMobile，否则渲染 PostListDesktop
 */
const PostList = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
    return isSmall ? React.createElement(PostListMobile, null) : React.createElement(PostListDesktop, null);
};
export default PostList;
