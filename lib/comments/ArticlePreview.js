import * as React from 'react';
import { useQueryClient } from 'react-query';
import { SimpleShowLayout, TextField, ResourceContextProvider, } from 'react-admin';
const ArticlePreview = ({ id, resource, }) => {
    const queryClient = useQueryClient();
    const record = queryClient.getQueryData([
        resource,
        'getOne',
        { id: String(id) },
    ]);
    return (React.createElement(ResourceContextProvider, { value: resource },
        React.createElement(SimpleShowLayout, { record: record },
            React.createElement(TextField, { source: "id" }),
            React.createElement(TextField, { source: "title" }),
            React.createElement(TextField, { source: "teaser" }))));
};
export default ArticlePreview;
