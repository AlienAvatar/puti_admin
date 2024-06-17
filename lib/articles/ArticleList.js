var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { BooleanField, BulkDeleteButton, BulkExportButton, SelectColumnsButton, CreateButton, DatagridConfigurable, DateField, downloadCSV, ExportButton, FilterButton, List, InfiniteList, NumberField, SearchInput, SimpleList, TextField, TextInput, TopToolbar, useTranslate, useAuthenticated, useRecordContext } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as config from "../config";
import { EditButton } from '../components/iEditButton';
import { ShowButton } from '../components/iShowButton';
import { article_data_context } from '../dataProvider';
//import ResetViewsButton from './ResetViewsButton';
export const PostIcon = BookIcon;
const CommentShowButton = () => {
    const record = useRecordContext();
    return (React.createElement(ShowButton, { label: "Show", record: record }));
};
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
    React.createElement(TextInput, { source: "title", defaultValue: "Please input a title" }),
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
const ArticleListMobileActions = () => (React.createElement(TopToolbar, null,
    React.createElement(FilterButton, null),
    React.createElement(CreateButton, null),
    React.createElement(ExportButton, null)));
const ArticleListMobile = (props) => (React.createElement(InfiniteList, { filters: postFilter, sort: { field: 'published_at', order: 'DESC' }, exporter: exporter, actions: React.createElement(ArticleListMobileActions, null) },
    React.createElement(SimpleList, { primaryText: record => record.title, secondaryText: record => `${record.views} views`, tertiaryText: record => new Date(record.published_at).toLocaleDateString() })));
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
const ArticleListBulkActions = memo((_a) => {
    var 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // children,
    props = __rest(_a, []);
    return (React.createElement(Fragment, null,
        React.createElement(BulkDeleteButton, Object.assign({}, props)),
        React.createElement(BulkExportButton, Object.assign({}, props))));
});
/**
 * Title 组件
 *
 * @returns 返回 ArticleListActions 组件的 React 元素
 */
const ArticleListActions = () => (React.createElement(TopToolbar, null,
    React.createElement(SelectColumnsButton, null),
    React.createElement(FilterButton, null),
    React.createElement(CreateButton, null),
    React.createElement(ExportButton, null)));
const ArticleListActionToolbar = ({ children }) => (React.createElement(Box, { sx: { alignItems: 'center', display: 'flex' } }, children));
const PostPanel = ({ record }) => (React.createElement("div", { dangerouslySetInnerHTML: { __html: record.body } }));
const tagSort = { field: 'name.en', order: 'ASC' };
const ArticleListDesktop = (props) => {
    const article_data = useContext(article_data_context);
    if (Object.keys(props).length === 0) {
        return null;
    }
    let data_list = [];
    const article_list = Object.values(props);
    article_list.forEach(item => {
        let obj = {};
        obj["id"] = item.id.$oid;
        obj["num"] = item.num;
        obj["title"] = item.title;
        obj["content"] = item.content;
        obj["category"] = item.category;
        obj["support_count"] = item.support_count;
        obj["views_count"] = item.views_count;
        obj["created_at"] = item.created_at;
        obj["updated_at"] = item.updated_at;
        obj["is_delete"] = item.is_delete;
        data_list.push(obj);
    });
    return (React.createElement(List, { filters: postFilter, sort: { field: 'created_at', order: 'DESC' }, exporter: exporter, actions: React.createElement(ArticleListActions, null) },
        React.createElement(StyledDatagrid, { bulkActionButtons: React.createElement(ArticleListBulkActions, null), 
            //rowClick={rowClick}
            expand: PostPanel, omit: ['average_note'], data: data_list },
            React.createElement(TextField, { source: "num", label: "\u6587\u4EF6\u7F16\u53F7" }),
            React.createElement(TextField, { source: "title", cellClassName: "title", label: "\u6807\u9898" }),
            React.createElement(TextField, { source: "content", cellClassName: "content", label: "\u6B63\u6587" }),
            React.createElement(TextField, { source: "category", cellClassName: "category", label: "\u7C7B\u578B" }),
            React.createElement(NumberField, { source: "views_count", label: "\u6D4F\u89C8\u91CF", sortByOrder: "DESC" }),
            React.createElement(NumberField, { source: "support_count", label: "\u70B9\u8D5E\u91CF", sortByOrder: "DESC" }),
            React.createElement(DateField, { source: "created_at", sortByOrder: "DESC", cellClassName: "createdAt", label: "\u521B\u5EFA\u65F6\u95F4" }),
            React.createElement(DateField, { source: "updated_at", sortByOrder: "DESC", cellClassName: "updateAt", label: "\u66F4\u65B0\u65F6\u95F4" }),
            React.createElement(BooleanField, { source: "is_delete", label: "\u662F\u5426\u5220\u9664", sortable: false }),
            React.createElement(ArticleListActionToolbar, null,
                React.createElement(EditButton, null),
                React.createElement(ShowButton, null)))));
};
/**
 * ArticleList 组件
 *
 * @returns 根据屏幕大小渲染不同组件，当屏幕小于等于中等尺寸时渲染 ArticleListMobile，否则渲染 ArticleListDesktop
 */
const ArticleList = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
    useAuthenticated();
    const [articles, setArticles] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    /**
     * 异步获取数据
     *
     * @returns 返回Promise对象，表示异步操作的结果
     */
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield axios.get(config.PATH_ARTICLE_LIST, {
                headers: {
                    'token': token,
                },
            });
            if (result.data.status == "success") {
                setArticles(result.data.articles);
                setIsLoading(false);
            }
            else {
                window.location.href = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        });
        fetchData();
    }, [token]);
    return isSmall ? React.createElement(ArticleListMobile, Object.assign({}, articles)) : React.createElement(ArticleListDesktop, Object.assign({}, articles));
};
export default ArticleList;
