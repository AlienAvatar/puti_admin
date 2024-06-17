import * as React from 'react';
import { DateField, ReferenceField, Show, SimpleShowLayout, TextField, } from 'react-admin'; // eslint-disable-line import/no-unresolved
const CommentShow = () => (React.createElement(Show, null,
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(ReferenceField, { source: "post_id", reference: "posts" },
            React.createElement(TextField, { source: "title" })),
        React.createElement(TextField, { source: "author.name" }),
        React.createElement(DateField, { source: "created_at" }),
        React.createElement(TextField, { source: "body" }))));
export default CommentShow;
