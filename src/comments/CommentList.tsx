import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    useMediaQuery,
    Theme,
    Box,
} from '@mui/material';
import jsonExport from 'jsonexport/dist';
import {
    ListBase,
    ListToolbar,
    ListActions,
    DateField,
    EditButton,
    Pagination,
    ReferenceInput,
    SearchInput,
    SimpleList,
    TextField,
    Title,
    downloadCSV,
    useListContext,
    useTranslate,
    ShowButton,
    NumberField,
    DeleteButton,
    TopToolbar,
    CreateButton,
    Button,
    ReferenceField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { UserBulkActionButtonsGroup, getCommentFilters } from "../components/iUseBulkActionButtons"
import {FilterButton} from "../components/iFilterButton"

const CommentListMobileActions = () => (
    <TopToolbar>
        {/* 添加筛选条件按钮 */}
        <FilterButton /> 
        {/* 创建评论按钮 */}
        <CreateButton label="创建"/>
    </TopToolbar>
);
// const GoodComponent = () => {
//     return (
        
//     )
// }

const exporter = (records, fetchRelatedRecords) =>
    fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
        const data = records.map(record => {
            const { author, ...recordForExport } = record; // omit author
            recordForExport.author_name = author.name;
            recordForExport.post_title = posts[record.post_id].title;
            return recordForExport;
        });
        const headers = [
            'id',
            'author_name',
            'post_id',
            'post_title',
            'created_at',
            'body',
        ];

        return jsonExport(data, { headers }, (error, csv) => {
            if (error) {
                console.error(error);
            }
            downloadCSV(csv, 'comments');
        });
    });


const CommentGrid = () => {
    const { data } = useListContext();
    const translate = useTranslate();
    if (!data) return null;

    const GridItem = ({ record }) => {
        return (
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardHeader
                    className="comment"
                    title={
                        <TextField
                            record={record}
                            source="author"
                        />
                    }
                    subheader={
                        <DateField
                            record={record}
                            source="created_at"
                        />
                    }
                    avatar={
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    }
                />
                <CardContent>
                    <div><span>article id:</span><TextField source='article_id' record={record} /></div>

                    <div><TextField
                        record={record}
                        source="content"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    /></div>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <ThumbUpIcon />
                    <TextField
                        record={record}
                        source="support_count"
                    />
                    <EditButton record={record} label="编辑" />
                    <ShowButton record={record} label="展示" />
                    <DeleteButton record={record} label="删除" />
                </CardActions>
            </Card>
        )
    }

    return (
        <Grid spacing={2} container>
            {
                data.map(record => {
                    const grid_comp = !record.is_delete ? <GridItem record={record}/> : null;
                    return (
                        <Grid item key={record.id} sm={12} md={6} lg={4}>
                            {grid_comp}
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};

const CommentMobileList = () => (
    <SimpleList
        primaryText={record => record.author.name}
        secondaryText={record => record.body}
        tertiaryText={record =>
            new Date(record.created_at).toLocaleDateString()
        }
        leftAvatar={() => <PersonIcon />}
    />
);

const CommentList = () => (
    <ListBase perPage={6} exporter={exporter}>
        <ListView />
    </ListBase>
);

const test_actions = (values) => {
    console.log('values', values);
}

const test_actions2 = () =>(
    <div>
        1
    </div>
)
const ListView = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    const { defaultTitle } = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <ListToolbar filters={getCommentFilters()} 
                actions={<CommentListMobileActions /> } />
            {isSmall ? <CommentMobileList /> : <CommentGrid />}
            <Pagination rowsPerPageOptions={[6, 9, 12]} />
        </>
    );
};

export default CommentList;
