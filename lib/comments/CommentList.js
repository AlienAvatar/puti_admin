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
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography, useMediaQuery, } from '@mui/material';
import jsonExport from 'jsonexport/dist';
import { ListBase, ListToolbar, ListActions, DateField, EditButton, Pagination, ReferenceField, ReferenceInput, SearchInput, ShowButton, SimpleList, TextField, Title, downloadCSV, useListContext, useTranslate, } from 'react-admin'; // eslint-disable-line import/no-unresolved
const commentFilters = [
    React.createElement(SearchInput, { source: "q", alwaysOn: true }),
    React.createElement(ReferenceInput, { source: "post_id", reference: "posts" }),
];
const exporter = (records, fetchRelatedRecords) => fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
    const data = records.map(record => {
        const { author } = record, recordForExport = __rest(record, ["author"]); // omit author
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
    if (!data)
        return null;
    return (React.createElement(Grid, { spacing: 2, container: true }, data.map(record => (React.createElement(Grid, { item: true, key: record.comment_id, sm: 12, md: 6, lg: 4 },
        React.createElement(Card, { sx: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            } },
            React.createElement(CardHeader, { className: "comment", title: React.createElement(TextField, { record: record, source: "author" }), subheader: React.createElement(DateField, { record: record, source: "created_at" }), avatar: React.createElement(Avatar, null,
                    React.createElement(PersonIcon, null)) }),
            React.createElement(CardContent, null,
                React.createElement(TextField, { record: record, source: "content", sx: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    } })),
            React.createElement(CardContent, { sx: { flexGrow: 1 } },
                React.createElement(Typography, { component: "span", variant: "body2", "data-testid": "postLink" },
                    translate('comment.list.about'),
                    "\u00A0"),
                React.createElement(ReferenceField, { record: record, source: "post_id", reference: "posts" })),
            React.createElement(CardActions, { sx: { justifyContent: 'flex-end' } },
                React.createElement(EditButton, { record: record }),
                React.createElement(ShowButton, { record: record }))))))));
};
const CommentMobileList = () => (React.createElement(SimpleList, { primaryText: record => record.author.name, secondaryText: record => record.body, tertiaryText: record => new Date(record.created_at).toLocaleDateString(), leftAvatar: () => React.createElement(PersonIcon, null) }));
const CommentList = () => (React.createElement(ListBase, { perPage: 6, exporter: exporter },
    React.createElement(ListView, null)));
const ListView = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    const { defaultTitle } = useListContext();
    return (React.createElement(React.Fragment, null,
        React.createElement(Title, { defaultTitle: defaultTitle }),
        React.createElement(ListToolbar, { filters: commentFilters, actions: React.createElement(ListActions, null) }),
        isSmall ? React.createElement(CommentMobileList, null) : React.createElement(CommentGrid, null),
        React.createElement(Pagination, { rowsPerPageOptions: [6, 9, 12] })));
};
export default CommentList;
