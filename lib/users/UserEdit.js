/* eslint react/jsx-key: off */
import * as React from 'react';
import { CloneButton, DeleteWithConfirmButton, Edit, required, SaveButton, SelectInput, ShowButton, TabbedForm, TextInput, Toolbar, TopToolbar, usePermissions, useSaveContext, } from 'react-admin';
import Aside from './Aside';
/**
 * Custom Toolbar for the Edit form
 *
 * Save with undo, but delete with confirm
 */
const UserEditToolbar = props => {
    return (React.createElement(Toolbar, Object.assign({ sx: { display: 'flex', justifyContent: 'space-between' } }, props),
        React.createElement(SaveButton, null),
        React.createElement(DeleteWithConfirmButton, null)));
};
const EditActions = () => (React.createElement(TopToolbar, null,
    React.createElement(CloneButton, { className: "button-clone" }),
    React.createElement(ShowButton, null)));
const UserEditForm = () => {
    const { permissions } = usePermissions();
    const { save } = useSaveContext();
    const newSave = values => new Promise(resolve => {
        if (values.name === 'test') {
            return resolve({
                name: {
                    message: 'ra.validation.minLength',
                    args: { min: 10 },
                },
            });
        }
        return save(values);
    });
    return (React.createElement(TabbedForm, { defaultValues: { role: 'user' }, toolbar: React.createElement(UserEditToolbar, null), onSubmit: newSave },
        React.createElement(TabbedForm.Tab, { label: "user.form.summary", path: "" },
            permissions === 'admin' && (React.createElement(TextInput, { source: "id", InputProps: { disabled: true } })),
            React.createElement(TextInput, { source: "name", defaultValue: "slim shady", validate: required() })),
        permissions === 'admin' && (React.createElement(TabbedForm.Tab, { label: "user.form.security", path: "security" },
            React.createElement(SelectInput, { source: "role", validate: required(), choices: [
                    { id: '', name: 'None' },
                    { id: 'admin', name: 'Admin' },
                    { id: 'user', name: 'User' },
                ], defaultValue: 'user' })))));
};
const UserEdit = () => {
    return (React.createElement(Edit, { aside: React.createElement(Aside, null), actions: React.createElement(EditActions, null) },
        React.createElement(UserEditForm, null)));
};
export default UserEdit;
