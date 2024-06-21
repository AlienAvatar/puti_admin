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
    Button,
    List,
    Datagrid,
    TextField,
    SimpleForm,
    useUpdate,
    useRecordContext,
} from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';
import Aside from './Aside';
import { useState } from 'react';
import { Modal } from 'antd';
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
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const record = useRecordContext();
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');

    const [update, { error }] = useUpdate(
        'password',
        { 
            id: record.id,
            data: {
                'old_password': old_password,
                'new_password': new_password,
                'username': record.username
            }
        }
    );

    const showModal = () => {
        setOpen(true);
      };
    
    const handleOk = () => {
        setConfirmLoading(true);
        
        setTimeout(() => {
            update();
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const equalToPassword = (value, allValues) => {
        if (value !== allValues.confirm_new_password) {
            return '密码不一致';
        }
    }

    const FormAction = (
        <TopToolbar>
            {/* <SaveButton resource="password" label="更改"/>
            <Button label='取消' onClick={handleCancel}/> */}
        </TopToolbar>
    );

    const oldPasswordChange = (props) => {
        setOldPassword(props.currentTarget.value);
    }

    const newPasswordChange = (props) => {
        setNewPassword(props.currentTarget.value);
    }

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
                <Button size='medium' label="更改密码" onClick={showModal}>
                </Button>

                <Modal
                    title="更改密码"
                    open={open}
                    centered
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okButtonProps={{ hidden: true}}
                    cancelButtonProps={{ hidden: true }}
                    cancelText="取消"
                    okText="确认"
                    okType="primary"
                >
                    <SimpleForm toolbar={FormAction}>
                        <PasswordInput label="旧密码" source="old_password" onChange={oldPasswordChange}/>
                        <PasswordInput label="新密码" source="new_password" onChange={newPasswordChange}/>
                        <PasswordInput label="确认新密码" source="confirm_new_password" validate={equalToPassword}/>
                    </SimpleForm>
                </Modal>
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
