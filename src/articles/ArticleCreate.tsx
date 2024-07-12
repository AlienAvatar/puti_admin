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
    DeleteButton,
    ImageField,
    Form,
    Button,
    ImageInput,
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import axios from 'axios';
import * as config from "../config";
import { Editor } from '@tiptap/react';
import upload_img_url from '../dataProvider';

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

    const [create] = useCreate();
    
    const  uploadSave = (data) => {
        create('upload', { data });
    };

   
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
                    label="内容" 
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
                        { id: '公告', name: '公告' },
                        { id: '古佛降世', name: '古佛降世' },
                        { id: '羌佛说法', name: '羌佛说法' },
                        { id: '羌佛公告', name: '羌佛公告' },
                        { id: '认证恭祝', name: '认证恭祝' },
                        { id: '羌佛圣量', name: '羌佛圣量' },
                        { id: '羌佛圣迹', name: '羌佛圣迹' },
                        { id: '圆满佛格', name: '圆满佛格' },
                        { id: '妙谙五明', name: '妙谙五明' },
                        { id: '渡生成就', name: '渡生成就' },
                        { id: '羌佛文告', name: '羌佛文告' },
                        { id: '总部文告', name: '总部文告' },
                        { id: '大德文集', name: '大德文集' },
                        { id: '圣德回复', name: '圣德回复' },
                    ]}
                />

                {/* <TextInput source="cover_img" label={upload_img_url} fullWidth disabled></TextInput>  */}
            </SimpleFormConfigurable>

            <Form onSubmit={uploadSave}>
                <ImageInput source="cover_img_file" 
                    label="封面图" 
                    multiple={false} 
                    placeholder={<p>拖拽图片到这</p>}  
                >
                    <img src={cover_img} />
                </ImageInput>
                <Button
                    label="上传图片"
                    type="submit"
                    variant="text"
                    // onClick={uploadSave}
                />
                
            </Form>
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

