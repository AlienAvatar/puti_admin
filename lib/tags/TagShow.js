import * as React from 'react';
import { Show, SimpleShowLayout, TextField, TranslatableFields, BooleanField, } from 'react-admin'; // eslint-disable-line import/no-unresolved
const TagShow = () => (React.createElement(Show, null,
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TranslatableFields, { locales: ['en', 'fr'] },
            React.createElement(TextField, { source: "name" })),
        React.createElement(BooleanField, { source: "published" }))));
export default TagShow;
