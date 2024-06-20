var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { useAuthenticated, Datagrid, TextField, Title, FunctionField, RecordContextProvider, DatagridBody } from 'react-admin';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from "./config";
import { TableCell, TableRow, Checkbox } from "@mui/material";
const sort = { field: 'created_at', order: 'DESC' };
const MyDatagridRow = ({ record, id, onToggleItem, children, selected, selectable, }) => id ? (React.createElement(RecordContextProvider, { value: record },
    React.createElement(TableRow, null,
        React.createElement(TableCell, { padding: "none" }, selectable && (React.createElement(Checkbox, { checked: selected, onClick: (event) => {
                if (onToggleItem) {
                    onToggleItem(id, event);
                }
            } }))),
        React.Children.map(children, (field) => React.isValidElement(field) && field.props.source ? (React.createElement(TableCell, { key: `${id}` }, field)) : null)))) : null;
const MyDatagridBody = (props) => (React.createElement(DatagridBody, Object.assign({}, props, { row: React.createElement(MyDatagridRow, null) })));
const MyDatagrid = (props) => (React.createElement(Datagrid, Object.assign({}, props, { body: React.createElement(MyDatagridBody, null) })));
const CustomRouteLayout = ({ title = 'Article' }) => {
    useAuthenticated();
    const [articles, setArticles] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
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
                console.log('result', result);
                setArticles(result.data.articles);
                setIsLoading(false);
                setTotal(result.data.articles.length);
            }
            else {
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        });
        fetchData();
    }, [token]);
    // const { data, total, isLoading } = useGetList('articles', {
    //     pagination: { page: 1, perPage: 10 },
    //     sort: { field: 'published_at', order: 'DESC' }, // 假设'someField'是你要排序的字段
    // });
    return !isLoading ? (React.createElement("div", null,
        React.createElement(Title, { title: "Example Admin" }),
        React.createElement("h1", null, title),
        React.createElement("p", null,
            "Found ",
            React.createElement("span", { className: "total" }, articles.length),
            " posts !"),
        React.createElement(Datagrid, { sort: sort, data: articles, isLoading: isLoading, total: total, rowClick: "edit", key: 1 },
            React.createElement(FunctionField, { source: "id", label: "id", render: record => `${record.num}`, key: "id" }),
            React.createElement(TextField, { source: "title", sortable: false }),
            React.createElement(TextField, { source: "author", sortable: false }),
            React.createElement(TextField, { source: "content", sortable: false }),
            React.createElement(TextField, { source: "support_count", sortable: false }),
            React.createElement(TextField, { source: "created_at", sortable: false }),
            React.createElement(TextField, { source: "updated_at", sortable: false })))) : null;
};
export default CustomRouteLayout;
