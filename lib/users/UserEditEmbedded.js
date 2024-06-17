/* eslint react/jsx-key: off */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
const UserEditEmbedded = ({ id }) => (
/* Passing " " as title disables the custom title */
React.createElement(Edit, { title: " ", id: id },
    React.createElement(SimpleForm, { defaultValues: { role: 'user' } },
        React.createElement(TextInput, { source: "name", defaultValue: "slim shady", validate: required() }))));
UserEditEmbedded.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
    id: PropTypes.string,
};
export default UserEditEmbedded;
