import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { useCallback } from 'react';
import { SaveButton, Form, TextInput, required, useCreate, useCreateSuggestionContext, useNotify, useTranslate, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import CancelButton from './ArticleQuickCreateCancelButton';
const ArticleQuickCreate = props => {
    const [create] = useCreate();
    const notify = useNotify();
    const { onCancel, onCreate } = useCreateSuggestionContext();
    const handleSave = useCallback(values => {
        create('posts', { data: values }, {
            onSuccess: data => {
                onCreate(data);
            },
            onError: (error) => {
                notify(error.message, { type: 'error' });
            },
        });
    }, [create, notify, onCreate]);
    const translate = useTranslate();
    return (React.createElement(Dialog, { "data-testid": "dialog-add-post", open: true, fullWidth: true, onClose: onCancel, "aria-label": translate('simple.create-post') },
        React.createElement(Form, Object.assign({ onSubmit: handleSave }, props),
            React.createElement(DialogTitle, null, translate('simple.create-post')),
            React.createElement(DialogContent, null,
                React.createElement(TextInput, { defaultValue: "", source: "title", validate: required() }),
                React.createElement(TextInput, { defaultValue: "", source: "author", validate: required(), fullWidth: true, multiline: true })),
            React.createElement(DialogActions, null,
                React.createElement(SaveButton, null),
                React.createElement(CancelButton, { onClick: onCancel })))));
};
export default ArticleQuickCreate;
