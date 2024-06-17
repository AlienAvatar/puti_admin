/* eslint react/jsx-key: off */
import * as React from 'react';
import { useParams } from 'react-router';
import { Edit, SimpleFormConfigurable, TextField, TextInput, required, List, Datagrid, ResourceContextProvider, EditButton, TranslatableInputs, } from 'react-admin';
const TagEdit = () => {
    const { id } = useParams();
    return (React.createElement(React.Fragment, null,
        React.createElement(Edit, { redirect: "list" },
            React.createElement(SimpleFormConfigurable, { warnWhenUnsavedChanges: true },
                React.createElement(TextField, { source: "id" }),
                React.createElement(TranslatableInputs, { locales: ['en', 'fr'] },
                    React.createElement(TextInput, { source: "name", validate: [required()] })))),
        React.createElement(ResourceContextProvider, { value: "posts" },
            React.createElement(List, { hasCreate: false, resource: "posts", filter: { tags: [id] }, title: " " },
                React.createElement(Datagrid, null,
                    React.createElement(TextField, { source: "id" }),
                    React.createElement(TextField, { source: "title" }),
                    React.createElement(EditButton, null))))));
};
export default TagEdit;
