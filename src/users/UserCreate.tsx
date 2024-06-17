/* eslint react/jsx-key: off */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Create,
    SaveButton,
    AutocompleteInput,
    TabbedForm,
    TextInput,
    Toolbar,
    required,
    useNotify,
    usePermissions,
    useUnique,
    FileInput,
    SimpleForm,
} from 'react-admin';

import Aside from './Aside';

const UserEditToolbar = ({ permissions, ...props }) => {
    const notify = useNotify();
    const { reset } = useFormContext();

    return (
        <Toolbar {...props}>
            <SaveButton label="user.action.save_and_show" />
            {permissions === 'admin' && (
                <SaveButton
                    label="user.action.save_and_add"
                    mutationOptions={{
                        onSuccess: () => {
                            notify('ra.notification.created', {
                                type: 'info',
                                messageArgs: {
                                    smart_count: 1,
                                },
                            });
                            reset();
                        },
                    }}
                    type="button"
                    variant="text"
                />
            )}
        </Toolbar>
    );
};

const isValidName = async value =>
    new Promise<string>(resolve =>
        setTimeout(() =>
            resolve(value === 'Admin' ? "Can't be Admin" : undefined)
        )
    );

const UserCreate = () => {
    const { permissions } = usePermissions();
    const unique = useUnique();
    return (
        <Create aside={<Aside />} redirect="show">
            <SimpleForm
                mode="onBlur"
                warnWhenUnsavedChanges
                toolbar={<UserEditToolbar permissions={permissions} />}
            >
                <TextInput source="username" defaultValue="123" autoFocus validate={[required(), unique()]} />
                <TextInput source="password" defaultValue="123" validate={[required()]} />
                <TextInput source="re_password" defaultValue="123" validate={[required()]} />
                <TextInput source="nickname" defaultValue="123" validate={[required()]} />
                {/* <FileInput source="avatar" accept="image/*" /> */}
                <TextInput source="email" defaultValue="123" validate={[required()]} />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
