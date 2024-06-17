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
import { RichTextInput } from 'ra-input-rich-text';
import { TopToolbar, AutocompleteInput, ArrayInput, BooleanInput, CheckboxGroupInput, Datagrid, DateField, DateInput, Edit, CloneButton, CreateButton, ShowButton, EditButton, ImageField, ImageInput, NumberInput, ReferenceManyField, ReferenceManyCount, ReferenceInput, SelectInput, SimpleFormIterator, TabbedForm, TextField, TextInput, minValue, number, required, FormDataConsumer, useCreateSuggestionContext, usePermissions, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Box, Button, Dialog, DialogActions, DialogContent, TextField as MuiTextField, } from '@mui/material';
import PostTitle from './PostTitle';
import TagReferenceInput from './TagReferenceInput';
const CreateCategory = ({ onAddChoice, }) => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const handleSubmit = (event) => {
        event.preventDefault();
        const choice = { name: value, id: value.toLowerCase() };
        onAddChoice(choice);
        onCreate(choice);
        setValue('');
        return false;
    };
    return (React.createElement(Dialog, { open: true, onClose: onCancel },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(DialogContent, null,
                React.createElement(MuiTextField, { label: "New Category", value: value, onChange: event => setValue(event.target.value), autoFocus: true })),
            React.createElement(DialogActions, null,
                React.createElement(Button, { type: "submit" }, "Save"),
                React.createElement(Button, { onClick: onCancel }, "Cancel")))));
};
const EditActions = ({ hasShow }) => (React.createElement(TopToolbar, null,
    React.createElement(CloneButton, { className: "button-clone" }),
    hasShow && React.createElement(ShowButton, null),
    React.createElement(CreateButton, null)));
const SanitizedBox = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullWidth } = _a, props = __rest(_a, ["fullWidth"]);
    return React.createElement(Box, Object.assign({}, props));
};
const categories = [
    { name: 'Tech', id: 'tech' },
    { name: 'Lifestyle', id: 'lifestyle' },
];
const PostEdit = () => {
    const { permissions } = usePermissions();
    return (React.createElement(Edit, { title: React.createElement(PostTitle, null), actions: React.createElement(EditActions, null) },
        React.createElement(TabbedForm, { defaultValues: { average_note: 0 }, warnWhenUnsavedChanges: true },
            React.createElement(TabbedForm.Tab, { label: "post.form.summary" },
                React.createElement(SanitizedBox, { display: "flex", flexDirection: "column", width: "100%", justifyContent: "space-between", fullWidth: true },
                    React.createElement(TextInput, { InputProps: { disabled: true }, source: "id" }),
                    React.createElement(TextInput, { source: "title", validate: required(), resettable: true })),
                React.createElement(TextInput, { multiline: true, fullWidth: true, source: "teaser", validate: required(), resettable: true }),
                React.createElement(CheckboxGroupInput, { source: "notifications", fullWidth: true, choices: [
                        { id: 12, name: 'Ray Hakt' },
                        { id: 31, name: 'Ann Gullar' },
                        { id: 42, name: 'Sean Phonee' },
                    ] }),
                React.createElement(ImageInput, { multiple: true, source: "pictures", accept: "image/*", helperText: "" },
                    React.createElement(ImageField, { source: "src", title: "title" })),
                permissions === 'admin' && (React.createElement(ArrayInput, { source: "authors" },
                    React.createElement(SimpleFormIterator, { inline: true },
                        React.createElement(ReferenceInput, { source: "user_id", reference: "users" },
                            React.createElement(AutocompleteInput, { helperText: false })),
                        React.createElement(FormDataConsumer, null, (_a) => {
                            var { scopedFormData, getSource } = _a, rest = __rest(_a, ["scopedFormData", "getSource"]);
                            return scopedFormData &&
                                scopedFormData.user_id ? (React.createElement(SelectInput, Object.assign({ source: getSource('role'), choices: [
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
                                ], helperText: false }, rest))) : null;
                        }))))),
            React.createElement(TabbedForm.Tab, { label: "post.form.body" },
                React.createElement(RichTextInput, { source: "body", label: false, validate: required(), fullWidth: true })),
            React.createElement(TabbedForm.Tab, { label: "post.form.miscellaneous" },
                React.createElement(TagReferenceInput, { reference: "tags", source: "tags", label: "Tags" }),
                React.createElement(ArrayInput, { source: "backlinks" },
                    React.createElement(SimpleFormIterator, null,
                        React.createElement(DateInput, { source: "date" }),
                        React.createElement(TextInput, { source: "url", validate: required() }))),
                React.createElement(DateInput, { source: "published_at" }),
                React.createElement(SelectInput, { create: React.createElement(CreateCategory
                    // Added on the component because we have to update the choices
                    // ourselves as we don't use a ReferenceInput
                    , { 
                        // Added on the component because we have to update the choices
                        // ourselves as we don't use a ReferenceInput
                        onAddChoice: choice => categories.push(choice) }), resettable: true, source: "category", choices: categories }),
                React.createElement(NumberInput, { source: "average_note", validate: [required(), number(), minValue(0)] }),
                React.createElement(BooleanInput, { source: "commentable", defaultValue: true }),
                React.createElement(TextInput, { InputProps: { disabled: true }, source: "views" }),
                React.createElement(ArrayInput, { source: "pictures" },
                    React.createElement(SimpleFormIterator, null,
                        React.createElement(TextInput, { source: "url", defaultValue: "" }),
                        React.createElement(ArrayInput, { source: "metas.authors" },
                            React.createElement(SimpleFormIterator, null,
                                React.createElement(TextInput, { source: "name", defaultValue: "" })))))),
            React.createElement(TabbedForm.Tab, { label: "post.form.comments", count: React.createElement(ReferenceManyCount, { reference: "comments", target: "post_id", sx: { lineHeight: 'inherit' } }) },
                React.createElement(ReferenceManyField, { reference: "comments", target: "post_id", fullWidth: true },
                    React.createElement(Datagrid, null,
                        React.createElement(DateField, { source: "created_at" }),
                        React.createElement(TextField, { source: "author.name" }),
                        React.createElement(TextField, { source: "body" }),
                        React.createElement(EditButton, null)))))));
};
export default PostEdit;
