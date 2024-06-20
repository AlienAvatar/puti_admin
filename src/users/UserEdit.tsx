/* eslint react/jsx-key: off */
import * as React from 'react';
import {
    CloneButton,
    DeleteWithConfirmButton,
    Edit,
    required,
    SaveButton,
    SelectInput,
    ShowButton,
    TabbedForm,
    TextInput,
    Toolbar,
    TopToolbar,
    usePermissions,
    useSaveContext,
    DateInput,
    ImageInput,
    PasswordInput,
    FileInput,
    ImageField,
} from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';
import Aside from './Aside';

/**
 * Custom Toolbar for the Edit form
 *
 * Save with undo, but delete with confirm
 */
const UserEditToolbar = props => {
    return (
        <Toolbar
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            {...props}
        >
            <SaveButton />
            <DeleteWithConfirmButton />
        </Toolbar>
    );
};

const EditActions = (props) =>{
    console.log('EditActions', props);
    return (
        <TopToolbar>
            <CloneButton label="复制" className="button-clone" />
            <ShowButton label="展示"/>
        </TopToolbar>
    )
} 

const UserEditForm = () => {
    const { permissions } = usePermissions();
    const { save } = useSaveContext();

    const newSave = values =>
        new Promise(resolve => {
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

    return (
        <TabbedForm
            defaultValues={{ role: 'user' }}
            toolbar={<UserEditToolbar />}
            onSubmit={newSave}
        >
            <TabbedForm.Tab label="更改" path="">
                <TextInput source="id" InputProps={{ disabled: true }} />
                {/* <ImageInput source="pictures"  accept="image/*" label="Related pictures">
                    <ImageField source="src" title="title" />
                </ImageInput> */}
                {/* <Avatar>
                    <ImageField source="src" title="title" />
                </Avatar> */}
                <TextInput
                    source="nickname"
                    label="昵称"
                    validate={required()}
                />
                <TextInput
                    source="username"
                    label="用户名"
                    validate={required()}
                    InputProps={{ disabled: true }} 
                />
            
                {/* <PasswordInput
                    source="password"
                    label="密码"
                    validate={required()}
                /> */}
                <TextInput
                    source="email"
                    label="E-mail"
                    validate={required()}
                />
                <DateInput source="created_at" label="创建日期" InputProps={{ disabled: true }} />
                <DateInput source="updated_at" label="更改日期" InputProps={{ disabled: true }} />
            </TabbedForm.Tab>
        </TabbedForm>   
    );
};
const UserEdit = () => {
    return (
        <Edit aside={<Aside />} actions={<EditActions />}>
            <UserEditForm />
        </Edit>
    );
};

export default UserEdit;
