import * as React from 'react';
import { Box, Card, Typography, Dialog, DialogContent, TextField as MuiTextField, DialogActions, Button, } from '@mui/material';
import { AutocompleteInput, CreateButton, DateInput, EditContextProvider, useEditController, Link as RaLink, ReferenceInput, SimpleForm, TextInput, Title, minLength, ShowButton, TopToolbar, useCreateSuggestionContext, useCreate, useCreatePath, useRecordContext, } from 'react-admin';
const LinkToRelatedPost = () => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    return (React.createElement(RaLink, { to: createPath({
            type: 'edit',
            resource: 'posts',
            id: record === null || record === void 0 ? void 0 : record.post_id,
        }) },
        React.createElement(Typography, { variant: "caption", color: "inherit", align: "right" }, "See related post")));
};
const OptionRenderer = (props) => {
    const record = useRecordContext();
    return record.id === '@@ra-create' ? (React.createElement("div", Object.assign({}, props), record.name)) : (React.createElement("div", Object.assign({}, props), record === null || record === void 0 ? void 0 :
        record.title,
        " - ", record === null || record === void 0 ? void 0 :
        record.id));
};
const inputText = record => record.id === '@@ra-create'
    ? record.name
    : `${record.title} - ${record.id}`;
const CreatePost = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();
    const handleSubmit = (event) => {
        event.preventDefault();
        create('posts', {
            data: {
                title: value,
            },
        }, {
            onSuccess: data => {
                setValue('');
                const choice = data;
                onCreate(choice);
            },
        });
        return false;
    };
    return (React.createElement(Dialog, { open: true, onClose: onCancel },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(DialogContent, null,
                React.createElement(MuiTextField, { label: "New post title", value: value, onChange: event => setValue(event.target.value), autoFocus: true })),
            React.createElement(DialogActions, null,
                React.createElement(Button, { type: "submit" }, "Save"),
                React.createElement(Button, { onClick: onCancel }, "Cancel")))));
};
const CommentEdit = props => {
    const controllerProps = useEditController(props);
    const { resource, record, save } = controllerProps;
    return (React.createElement(EditContextProvider, { value: controllerProps },
        React.createElement("div", { className: "edit-page" },
            React.createElement(Title, { defaultTitle: controllerProps.defaultTitle }),
            React.createElement(Box, { sx: { float: 'right' } },
                React.createElement(TopToolbar, null,
                    React.createElement(ShowButton, { record: record }),
                    React.createElement(CreateButton, { resource: "posts", label: "Create post" }))),
            React.createElement(Card, { sx: { marginTop: '1em', maxWidth: '30em' } }, record && (React.createElement(SimpleForm, { resource: resource, record: record, onSubmit: save, warnWhenUnsavedChanges: true },
                React.createElement(TextInput, { source: "id", fullWidth: true, InputProps: { disabled: true } }),
                React.createElement(ReferenceInput, { source: "post_id", reference: "posts", perPage: 15, sort: { field: 'title', order: 'ASC' } },
                    React.createElement(AutocompleteInput, { create: React.createElement(CreatePost, null), matchSuggestion: (filterValue, suggestion) => {
                            const title = `${suggestion.title} - ${suggestion.id}`;
                            return title.includes(filterValue);
                        }, optionText: React.createElement(OptionRenderer, null), inputText: inputText, fullWidth: true })),
                React.createElement(LinkToRelatedPost, null),
                React.createElement(TextInput, { source: "author.name", validate: minLength(10), fullWidth: true }),
                React.createElement(DateInput, { source: "created_at", fullWidth: true }),
                React.createElement(TextInput, { source: "body", validate: minLength(10), fullWidth: true, multiline: true })))))));
};
export default CommentEdit;
