/* eslint react/jsx-key: off */
import * as React from 'react';
import { Create, SimpleFormConfigurable, TextInput, required, TranslatableInputs, } from 'react-admin';
const TagCreate = () => (React.createElement(Create, { redirect: "list" },
    React.createElement(SimpleFormConfigurable, null,
        React.createElement(TranslatableInputs, { locales: ['en', 'fr'] },
            React.createElement(TextInput, { source: "name", validate: [required()] })))));
export default TagCreate;
