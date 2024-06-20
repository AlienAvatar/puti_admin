import * as React from 'react';
import {
    useGetList,
    useAuthenticated,
    Datagrid,
    TextField,
    Title,
    FunctionField,
    DatagridRowProps,
    RecordContextProvider,
    FieldProps,
    DatagridProps,
    DatagridBodyProps,
    DatagridBody
} from 'react-admin';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from "./config";
import { TableCell, TableRow, Checkbox } from "@mui/material";

const sort = { field: 'created_at', order: 'DESC' };


const MyDatagridRow = ({
    record,
    id,
    onToggleItem,
    children,
    selected,
    selectable,
}: DatagridRowProps) =>
    id ? (
        <RecordContextProvider value={record}>
            <TableRow>
                {/* first column: selection checkbox */}
                <TableCell padding="none">
                    {selectable && (
                        <Checkbox
                            checked={selected}
                            onClick={(event) => {
                                if (onToggleItem) {
                                    onToggleItem(id, event);
                                }
                            }}
                        />
                    )}
                </TableCell>
                {/* data columns based on children */}
                {React.Children.map(children, (field) =>
                    React.isValidElement<FieldProps>(field) && field.props.source ? (
                        <TableCell key={`${id}`}>{field}</TableCell>
                    ) : null
                )}
            </TableRow>
        </RecordContextProvider>
    ) : null;

const MyDatagridBody = (props: DatagridBodyProps) => (
    <DatagridBody {...props} row={<MyDatagridRow />} />
);
const MyDatagrid = (props: DatagridProps) => (
    <Datagrid {...props} body={<MyDatagridBody />} />
);
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
        const fetchData = async () => {
            const result = await axios.get(config.PATH_ARTICLE_LIST, {
                headers: {
                    'token': token,
                },
            });
            
            if(result.data.status == "success"){
                console.log('result', result);
                setArticles(result.data.articles);
                setIsLoading(false);
                setTotal(result.data.articles.length);
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        };
    
        fetchData();
    }, [token]);
    
    
    // const { data, total, isLoading } = useGetList('articles', {
    //     pagination: { page: 1, perPage: 10 },
    //     sort: { field: 'published_at', order: 'DESC' }, // 假设'someField'是你要排序的字段
    // });
    
    return !isLoading ? (
        <div>
            <Title title="Example Admin" />
            <h1>{title}</h1>
            <p>
                Found <span className="total">{articles.length}</span> posts !
            </p>

            <Datagrid
                sort={sort}
                data={articles}
                isLoading={isLoading}
                total={total}
                rowClick="edit"
                key={1}
            >
                <FunctionField
                    source="id"
                    label="id"
                    render={record => `${record.num}`}
                    key="id"
                />
                <TextField source="title" sortable={false} />
                <TextField source="author" sortable={false} />
                <TextField source="content" sortable={false} />
                <TextField source="support_count" sortable={false} />
                <TextField source="created_at" sortable={false} />
                <TextField source="updated_at" sortable={false} />
            </Datagrid>
        </div>
    ) : null;
};

export default CustomRouteLayout;
