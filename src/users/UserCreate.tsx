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
    ImageInput,
    ImageField,
    useRecordContext,
    PasswordInput,
    useSaveContext,
} from 'react-admin';

import Aside from './Aside';

const UserEditToolbar = ({ permissions, ...props }) => {
    const notify = useNotify();
    const { reset } = useFormContext();

    return (
        <Toolbar {...props}>
            <SaveButton label="保存" />
        </Toolbar>
    );
};

const isValidName = async value =>
    new Promise<string>(resolve =>
        setTimeout(() =>
            resolve(value === 'Admin' ? "Can't be Admin" : undefined)
        )
    );

const UserCreate = (props) => {
    const { permissions } = usePermissions();
    const unique = useUnique();

    const equalToPassword = (value, allValues) => {
        if (value !== allValues.password) {
            return '密码不一致';
        }
    }
    
    return (
        <Create aside={<Aside />} redirect="show">
            <SimpleForm
                mode="onBlur"
                warnWhenUnsavedChanges
                toolbar={<UserEditToolbar permissions={permissions} />}
            >
                <TextInput source="username" resettable autoFocus validate={[required(), unique()]} />
                {/* <ImageInput source="pictures"  accept="image/*" label="Related pictures">
                    <ImageField source="src" title="title" />
                </ImageInput> */}
                <PasswordInput source="password"  validate={[required()]} />
                <PasswordInput source="confirm_password"  validate={equalToPassword} />
                <TextInput source="nickname" resettable validate={[required()]} />
                <TextInput source="email" resettable validate={[required()]} />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
