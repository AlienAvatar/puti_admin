import * as React from 'react';
import { Fragment, memo } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import lodashGet from 'lodash/get';
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
    FilterButton,
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
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as config from "../config";
//import {EditButton} from '../components/iEditButton'
// import { ShowButton } from '../components/iShowButton'
import { article_data_context } from '../dataProvider';

//import ResetViewsButton from './ResetViewsButton';
export const PostIcon = BookIcon;

interface Article {
    id: string;
    author: string;
    title: string;
    content: string;
    category: string;
    support_count: number;
    views_count: number;
    is_delete: boolean;
    created_at: string;
    updated_at: string;

}

/**
 * 快速筛选组件
 *
 * @param label 筛选标签
 * @param source 数据源
 * @param defaultValue 默认值
 * @returns 返回 Chip 组件
 */
const QuickFilter = ({
    label,
}: {
    label?: string;
    source?: string;
    defaultValue?: any;
}) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const postFilter = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="Please input a title" />,
    <QuickFilter
        label="resources.posts.fields.commentable"
        source="commentable"
        defaultValue
    />,
];

/**
 * 导出文章数据
 *
 * @param posts 文章列表
 * @returns 导出后的 CSV 文件
 */
const exporter = posts => {
    const data = posts.map(post => ({
        ...post,
        backlinks: lodashGet(post, 'backlinks', []).map(
            backlink => backlink.url
        ),
    }));
    return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
};

const ArticleListMobileActions = () => (
    <TopToolbar>
        {/* 添加筛选条件按钮 */}
        <FilterButton /> 
        {/* 创建文章按钮 */}
        <CreateButton />
        {/* 导出按钮 */}
        <ExportButton />
    </TopToolbar>
);

const ArticleListMobile = (props) => (
    <InfiniteList
        filters={postFilter}
        sort={{ field: 'published_at', order: 'DESC' }}
        exporter={exporter}
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
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const ArticleListActionToolbar = ({ children }) => (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);



const PostPanel = ({ record }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const tagSort = { field: 'name.en', order: 'ASC' };

const ArticleListDesktop = (props) => {
    const article_data = useContext(article_data_context);

    if (Object.keys(props).length === 0) {
        return null;
    } 

    let data_list = [];
    const article_list: Article[]  = Object.values(props);
    article_list.forEach(item => {
        let obj = {};
        obj["id"] = item.id;
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


    return (
        <List
            filters={postFilter}
            sort={{ field: 'created_at', order: 'DESC' }}
            exporter={exporter}
            actions={<ArticleListActions />}
        >
            <StyledDatagrid
                bulkActionButtons={<ArticleListBulkActions />}
                //rowClick={rowClick}
                expand={PostPanel}
                omit={['average_note']}
                data={data_list}
            >
                {/* <TextField source="id" /> */}
                <TextField source="id" label="文件编号" />
                <TextField source="title" cellClassName="title" label="标题"/>
                
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
    const [articles, setArticles] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
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
                setArticles(result.data.articles);
                setIsLoading(false);
            }else{
                window.location.href = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        };
    
        fetchData();
    }, [token]);

    return isSmall ? <ArticleListMobile  {...articles}/> : <ArticleListDesktop {...articles}/>;
};


  
export default ArticleList;
