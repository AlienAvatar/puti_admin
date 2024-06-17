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

// const ArticleCreateToolbar = (props) => {
//     const notify = useNotify();
//     const redirect = useRedirect();
//     const { reset } = useFormContext();
    
//     let editorRef = props.editorRef;
//     const handleSubmit = async event => {
//         event.preventDefault();

//         const token = localStorage.getItem('token');
//         const nickname = localStorage.getItem('nickname');
        
//         const title = document.getElementById('title').value;
//         const content = editorRef.current?.getHTML();
//         console.log(event);
        
//         const result = await axios.post(config.PATH_ARTICLE_CREATE, {
//             headers: {
//                 'token': token,
//             },
//             data: {
//                 nickname: nickname,
//                 title: title,
//                 content: content,
//             }
//         });
//         if(result.data.status == "success"){
            
//         }else{
//             return new Promise((resolve, reject) => setTimeout(reject, 1000));
//         }
    
//     };

//     return (
//         <Toolbar>
//             <SaveButton
//                 label="post.action.save_and_add"
//                 type="button"
//                 variant="text"
//                 onClick={handleSubmit}
//                 mutationOptions={{
//                     onSuccess: () => {
//                         reset();
//                         window.scrollTo(0, 0);
//                         notify('ra.notification.created', {
//                             type: 'info',
//                             messageArgs: { smart_count: 1 },
//                         });
//                     },
//                 }}
//             />
//         </Toolbar>
//     );
// };

const ArticleCreate = () => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');
    const editorRef = React.useRef<Editor | null>(null);
    
    const handleSubmit =  async () => {
        const titleElement = document.getElementById('title') as HTMLInputElement;
        const title = titleElement ? titleElement.value : '';
        const content = editorRef.current?.getHTML();
        const categoryElement = document.querySelector('.MuiSelect-nativeInput') as HTMLSelectElement;
        const category = categoryElement ? categoryElement.value : '';
        axios.defaults.headers['token'] = token;
        const result = await axios.post(config.PATH_ARTICLE_CREATE, {
            'title': title,
            'author': nickname,
            'content': content,
            'category': category
        });
        if(result.data.status == "success"){
            console.log(result.data);
        }else{
            return new Promise((resolve, reject) => setTimeout(reject, 1000));
        }
    }

    return (
        <Create redirect="edit">
            <SimpleFormConfigurable
                //toolbar={<ArticleCreateToolbar {...editorRef} />}
                onSubmit={handleSubmit}
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
                <DialogActions>
                    <Button type="submit">Save</Button>
                </DialogActions>
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

