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
import { useMemo } from 'react';
import { RichTextInput } from 'ra-input-rich-text';
import { ArrayInput, AutocompleteInput, BooleanInput, Create, DateInput, FileField, FileInput, FormDataConsumer, maxValue, minValue, NumberInput, required, ReferenceInput, SaveButton, SelectInput, SimpleFormConfigurable, SimpleFormIterator, TextInput, Toolbar, useNotify, usePermissions, useRedirect, useCreate, useCreateSuggestionContext, } from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
const PostCreateToolbar = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { reset } = useFormContext();
    return (React.createElement(Toolbar, null,
        React.createElement(SaveButton, { label: "post.action.save_and_edit", variant: "text" }),
        React.createElement(SaveButton, { label: "post.action.save_and_show", type: "button", variant: "text", mutationOptions: {
                onSuccess: data => {
                    notify('ra.notification.created', {
                        type: 'info',
                        messageArgs: { smart_count: 1 },
                    });
                    redirect('show', 'posts', data.id);
                },
            }, sx: { display: { xs: 'none', sm: 'flex' } } }),
        React.createElement(SaveButton, { label: "post.action.save_and_add", type: "button", variant: "text", mutationOptions: {
                onSuccess: () => {
                    reset();
                    window.scrollTo(0, 0);
                    notify('ra.notification.created', {
                        type: 'info',
                        messageArgs: { smart_count: 1 },
                    });
                },
            } }),
        React.createElement(SaveButton, { label: "post.action.save_with_average_note", type: "button", variant: "text", mutationOptions: {
                onSuccess: data => {
                    notify('ra.notification.created', {
                        type: 'info',
                        messageArgs: { smart_count: 1 },
                    });
                    redirect('show', 'posts', data.id);
                },
            }, transform: data => (Object.assign(Object.assign({}, data), { average_note: 10 })), sx: { display: { xs: 'none', sm: 'flex' } } })));
};
const backlinksDefaultValue = [
    {
        date: new Date(),
        url: 'http://google.com',
    },
];
const PostCreate = () => {
    const defaultValues = useMemo(() => ({
        average_note: 0,
    }), []);
    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);
    return (React.createElement(Create, { redirect: "edit" },
        React.createElement(SimpleFormConfigurable, { toolbar: React.createElement(PostCreateToolbar, null), defaultValues: defaultValues },
            React.createElement(FileInput, { source: "pdffile", label: "PDF-Template", accept: "application/pdf" },
                React.createElement(FileField, { source: "src", title: "title" })),
            React.createElement(TextInput, { autoFocus: true, source: "title", validate: required('Required field') }),
            React.createElement(TextInput, { source: "teaser", fullWidth: true, multiline: true, validate: required('Required field') }),
            React.createElement(RichTextInput, { source: "body", fullWidth: true, validate: required() }),
            React.createElement(DependantInput, { dependency: "title" },
                React.createElement(NumberInput, { source: "average_note", validate: [
                        minValue(0, 'Should be between 0 and 5'),
                        maxValue(5, 'Should be between 0 and 5'),
                    ] })),
            React.createElement(DateInput, { source: "published_at", defaultValue: dateDefaultValue }),
            React.createElement(BooleanInput, { source: "commentable", defaultValue: true }),
            React.createElement(ArrayInput, { source: "backlinks", defaultValue: backlinksDefaultValue, validate: [required()] },
                React.createElement(SimpleFormIterator, null,
                    React.createElement(DateInput, { source: "date", defaultValue: "" }),
                    React.createElement(TextInput, { source: "url", defaultValue: "" }))),
            permissions === 'admin' && (React.createElement(ArrayInput, { source: "authors" },
                React.createElement(SimpleFormIterator, null,
                    React.createElement(ReferenceInput, { source: "user_id", reference: "users" },
                        React.createElement(AutocompleteInput, { label: "User", create: React.createElement(CreateUser, null) })),
                    React.createElement(FormDataConsumer, null, (_a) => {
                        var { scopedFormData, getSource } = _a, rest = __rest(_a, ["scopedFormData", "getSource"]);
                        return scopedFormData && scopedFormData.user_id ? (React.createElement(SelectInput, Object.assign({ source: getSource('role'), choices: [
                                {
                                    id: 'headwriter',
                                    name: 'Head Writer',
                                },
                                {
                                    id: 'proofreader',
                                    name: 'Proof reader',
                                },
                                {
                                    id: 'cowriter',
                                    name: 'Co-Writer',
                                },
                            ] }, rest, { label: "Role" }))) : null;
                    })))))));
};
export default PostCreate;
const DependantInput = ({ dependency, children, }) => {
    const dependencyValue = useWatch({ name: dependency });
    return dependencyValue ? children : null;
};
const CreateUser = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();
    const handleSubmit = event => {
        event.preventDefault();
        create('users', {
            data: {
                name: value,
            },
        }, {
            onSuccess: data => {
                setValue('');
                onCreate(data);
            },
        });
    };
    return (React.createElement(Dialog, { open: true, onClose: onCancel },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(DialogContent, null,
                React.createElement(TextInput, { source: "name", defaultValue: "Slim Shady", autoFocus: true, validate: [required()] }),
                React.createElement(AutocompleteInput, { source: "role", choices: [
                        { id: '', name: 'None' },
                        { id: 'admin', name: 'Admin' },
                        { id: 'user', name: 'User' },
                        { id: 'user_simple', name: 'UserSimple' },
                    ], validate: [required()] })),
            React.createElement(DialogActions, null,
                React.createElement(Button, { type: "submit" }, "Save"),
                React.createElement(Button, { onClick: onCancel }, "Cancel")))));
};
