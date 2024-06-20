import * as React from 'react';
import { useMemo } from 'react';
import { DefaultEditorOptions, RichTextInput } from 'ra-input-rich-text';
import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    FileField,
    FileInput,
    FormDataConsumer,
    maxValue,
    minValue,
    NumberInput,
    required,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleFormConfigurable,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    useNotify,
    usePermissions,
    useRedirect,
    useCreate,
    useCreateSuggestionContext,
    DeleteButton
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
import * as config from "../config";
import { Editor } from '@tiptap/react';

const ArticleCreateToolbar = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { reset } = useFormContext();
    
    // let editorRef = props.editorRef;
    // const handleSubmit = async event => {
    //     event.preventDefault();

    //     const token = localStorage.getItem('token');
    //     const nickname = localStorage.getItem('nickname');
        
    //     const title = document.getElementById('title').value;
    //     const content = editorRef.current?.getHTML();
    //     console.log(event);
        
    //     const result = await axios.post(config.PATH_ARTICLE_CREATE, {
    //         headers: {
    //             'token': token,
    //         },
    //         data: {
    //             nickname: nickname,
    //             title: title,
    //             content: content,
    //         }
    //     });
    //     if(result.data.status == "success"){
            
    //     }else{
    //         return new Promise((resolve, reject) => setTimeout(reject, 1000));
    //     }
    // };

    return (
        <Toolbar>
            {/* <SaveButton label="post.action.save_and_edit" variant="text" />
            <SaveButton
                label="post.action.save_and_show"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('show', 'posts', data.id);
                    },
                }}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            /> */}
            <SaveButton
                label="保存"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: () => {
                        reset();
                        window.scrollTo(0, 0);
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                    },
                }}
            />
            {/* <SaveButton
                label="post.action.save_with_average_note"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('show', 'posts', data.id);
                    },
                }}
                transform={data => ({ ...data, average_note: 10 })}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            /> */}
        </Toolbar>
    );
};

const backlinksDefaultValue = [
    {
        date: new Date(),
        url: 'http://google.com',
    },
];
const ArticleCreate = () => {
    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);

    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');
    const editorRef = React.useRef<Editor | null>(null);

    return (
        <Create redirect="edit">
            <SimpleFormConfigurable
                // onSubmit={handleSubmit}
                toolbar={<ArticleCreateToolbar />}
            >
                <TextInput
                    className='article_title'
                    autoFocus
                    source="title"
                    validate={required('Required field')}
                />
                <RichTextInput 
                    className='article_rich_content'
                    source="content" 
                    fullWidth
                    sx={{
                        '& .tiptap': {
                            paddingTop: '10px',
                            height: 200,
                        },
                    }}
                    editorOptions={{
                        ...DefaultEditorOptions,
                        onCreate: ({ editor }: { editor: Editor }) => {
                            editorRef.current = editor;
                        },
                    }}
                    validate={required()}
                />
                <TextInput
                    className='article_author'
                    autoFocus
                    source="author"
                    validate={required('Required field')}
                    defaultValue={nickname}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <SelectInput 
                    className="article_category"
                    source="category"
                    label="类型" 
                    choices={[
                        { id: 'tech', name: 'Tech' },
                        { id: 'lifestyle', name: 'Lifestyle' },
                        { id: 'people', name: 'People' },
                    ]} 
                />
            </SimpleFormConfigurable>
        </Create>
    );
};

export default ArticleCreate;

const DependantInput = ({
    dependency,
    children,
}: {
    dependency: string;
    children: JSX.Element;
}) => {
    const dependencyValue = useWatch({ name: dependency });

    return dependencyValue ? children : null;
};

