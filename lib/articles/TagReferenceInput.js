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
import { useState } from 'react';
import { AutocompleteArrayInput, ReferenceArrayInput, useCreate, useCreateSuggestionContext, useLocaleState, } from 'react-admin';
import { Box, Button, Dialog, DialogContent, DialogActions, TextField as MuiTextField, } from '@mui/material';
import { useFormContext } from 'react-hook-form';
const TagReferenceInput = (_a) => {
    var props = __rest(_a, []);
    const { setValue } = useFormContext();
    const [published, setPublished] = useState(true);
    const [locale] = useLocaleState();
    const handleChangePublishedFilter = () => {
        setPublished(prev => !prev);
        setValue('tags', []);
    };
    return (React.createElement(Box, { sx: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '50%',
        } },
        React.createElement(ReferenceArrayInput, Object.assign({}, props, { perPage: 5, filter: { published } }),
            React.createElement(AutocompleteArrayInput, { create: React.createElement(CreateTag, null), optionText: `name.${locale}` })),
        React.createElement(Button, { name: "change-filter", onClick: handleChangePublishedFilter, sx: { margin: '0 24px', position: 'relative' } },
            "Filter ",
            published ? 'Unpublished' : 'Published',
            " Tags")));
};
const CreateTag = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();
    const handleSubmit = (event) => {
        event.preventDefault();
        create('tags', { data: { name: { en: value } } }, {
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
                React.createElement(MuiTextField, { label: "New tag", value: value, onChange: event => setValue(event.target.value), autoFocus: true })),
            React.createElement(DialogActions, null,
                React.createElement(Button, { type: "submit" }, "Save"),
                React.createElement(Button, { onClick: onCancel }, "Cancel")))));
};
export default TagReferenceInput;
