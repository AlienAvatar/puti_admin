import * as React from 'react';
import { DefaultEditorOptions, RichTextInput } from 'ra-input-rich-text';
import {
    TopToolbar,
    AutocompleteInput,
    ArrayInput,
    BooleanInput,
    CheckboxGroupInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    CloneButton,
    CreateButton,
    ShowButton,
    EditButton,
    ImageField,
    ImageInput,
    NumberInput,
    ReferenceManyField,
    ReferenceManyCount,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput,
    minValue,
    number,
    required,
    FormDataConsumer,
    useCreateSuggestionContext,
    EditActionsProps,
    usePermissions,
    SimpleForm,
    SimpleFormConfigurable,
    Create,
    EditBase,
    Form,
    SaveButton,
    useRedirect,
    useNotify,
    BulkDeleteButton,
    NumberField,
    BooleanField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField as MuiTextField,
} from '@mui/material';
import ArticleTitle from './ArticleTitle';
import TagReferenceInput from './TagReferenceInput';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from "../config";
import { Editor } from '@tiptap/react';
import { useFormContext } from 'react-hook-form';
import { DeleteButton } from '../components/iDeleteButton';
const EditActions = ({ hasShow }: EditActionsProps) => (
    <TopToolbar>
        <CloneButton className="button-clone" />
        {hasShow && <ShowButton />}
        {/* FIXME: added because react-router HashHistory cannot block navigation induced by address bar changes */}
        <CreateButton />

    </TopToolbar>
);

const FormActions = (props) =>{
    return (
        <TopToolbar
            className='update_TopToolbar'
            sx={
                {
                    '& .update_TopTolbar': {
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }
                }
            }>
            <SaveButton
                className='update_button_save'
                sx={{
                    '& .update_button_save': {
                        float: 'left',
                    }
                }}
                label="Save"
                type="submit"
                variant="contained"
            />
            <DeleteButton onClick={DeleteClilckHandle} record={props} />
            <ShowButton />
        </TopToolbar>
    )
};

const DeleteClilckHandle = async () => {
    const token = localStorage.getItem('token');
    const num = getParameterFromUrl(window.location.hash, 'articles');

    let delete_url = `${config.PATH_ARTICLE_DELETE}${num}`;

    console.log(delete_url)
    axios.defaults.headers['token'] = token;
    const result = await axios.post(delete_url);
    
    console.log('result', result);
    if(result.data.status == "success"){
        return new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }else{
        console.log(result);
        return new Promise((resolve, reject) => setTimeout(reject, 1000));
    }

}
const SanitizedBox = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullWidth,
    ...props
}: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;

function getParameterFromUrl(url, parameterName) {
    const urlParts = url.split('/');
    const paramIndex = urlParts.indexOf(parameterName);
    if (paramIndex !== -1 && paramIndex + 1 < urlParts.length) {
      return urlParts[paramIndex + 1];
    }
    return null;
}

const ArticleEdit = () => {
    const token = localStorage.getItem('token');
    const [article, setArticle] = useState(null);
    const nickname = localStorage.getItem('nickname');
    const editorRef = React.useRef<Editor | null>(null);

    const num = getParameterFromUrl(window.location.hash, 'articles');

    let get_url = `${config.PATH_ARTICLE_GET}${num}`;
    let update_url = `${config.PATH_ARTICLE_UPDATE}${num}`;

    useEffect(() => {
        const fetchData = async () => {
            axios.defaults.headers['token'] = token;
            const result = await axios.get(get_url, {});

            if(result.data.status == "success"){
                setArticle(result.data.data.article);
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        };
    
        fetchData();
    }, [token, get_url]);

    const updateData = async (data) => {
        axios.defaults.headers['token'] = token;
        const result = await axios.post(update_url, {
            'title': data.title,
            'author': nickname,
            'content': data.content,
            'category': data.category,
            'support_count': data.support_count,
            'views_count': data.views_count,
        });
        
        console.log('result', result);
        if(result.data.status == "success"){
            return new Promise((resolve, reject) => setTimeout(resolve, 1000));
        }else{
            return new Promise((resolve, reject) => setTimeout(reject, 1000));
        }
    };

    return (
            // <TabbedForm
            //     defaultValues={article}
            //     warnWhenUnsavedChanges
            //     onSubmit={updateData}
            //     toolbar={<FormActions props={article}/>}
            // >
            //     <TabbedForm.Tab label="主体">
            //         <SanitizedBox
            //             display="flex"
            //             flexDirection="column"
            //             width="100%"
            //             justifyContent="space-between"
            //             fullWidth
            //         >
            //             <TextInput
            //                 InputProps={{ disabled: true }}
            //                 source="num"
            //             />
            //             <TextInput
            //                 InputProps={{ disabled: true }}
            //                 source="author"
            //             />
            //             <TextInput
            //                 source="title"
            //                 validate={required()}
            //                 resettable
            //             />

            //         </SanitizedBox>

            //         <RichTextInput 
            //             className='article_rich_content'
            //             source="content" 
            //             fullWidth
            //             sx={{
            //                 '& .tiptap': {
            //                     paddingTop: '10px',
            //                     height: 200,
            //                 },
            //             }}
            //             editorOptions={{
            //                 ...DefaultEditorOptions,
            //                 onCreate: ({ editor }: { editor: Editor }) => {
            //                     editorRef.current = editor;
            //                 },
            //             }}
            //             validate={required()}
            //         />

            //         <SelectInput 
            //             className="article_category"
            //             source="category"
            //             label="类型" 
            //             choices={[
            //                 { id: 'tech', name: 'Tech' },
            //                 { id: 'lifestyle', name: 'Lifestyle' },
            //                 { id: 'people', name: 'People' },
            //             ]}
            //         />
            //     </TabbedForm.Tab>
            //     <TabbedForm.Tab label="其它">
            //         <NumberInput label="点赞数" source="support_count" />
            //         <NumberInput label="浏览量" source="views_count" />
            //         <DateInput source="updated_at" defaultValue="" InputProps={{ disabled: true }}/>
            //         <DateInput source="created_at" defaultValue="" InputProps={{ disabled: true }}/>
            //     </TabbedForm.Tab>
            //     <TabbedForm.Tab
            //         label="评论"
            //         count={
            //             <ReferenceManyCount
            //                 reference="comments"
            //                 target="Article_id"
            //                 sx={{ lineHeight: 'inherit' }}
            //             />
            //         }
            //     >
            //         <ReferenceManyField
            //             reference="comments"
            //             target="Article_id"
            //             fullWidth
            //         >
            //             <Datagrid>
            //                 <DateField source="created_at" />
            //                 <TextField source="author.name" />
            //                 <TextField source="body" />
            //                 <EditButton />
            //             </Datagrid>
            //         </ReferenceManyField>
            //     </TabbedForm.Tab>
            // </TabbedForm>
        <Edit title={<ArticleTitle />} actions={<EditActions />}>
            <TabbedForm
                defaultValues={{ average_note: 0 }}
                warnWhenUnsavedChanges
            >
                <TabbedForm.Tab label="主体">
                    <SanitizedBox
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        justifyContent="space-between"
                        fullWidth
                    >
                        <TextInput
                            InputProps={{ disabled: true }}
                            source="id"
                        />
                        <TextInput
                            source="author"
                            label="作者"
                        />
                        <TextInput
                            source="title"
                            label="标题"
                            validate={required()}
                            resettable
                        />

                    </SanitizedBox>

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
                </TabbedForm.Tab>

                <TabbedForm.Tab label="其它">
                    <NumberInput label="点赞数" source="support_count" />
                    <NumberInput label="浏览量" source="views_count" />
                    <DateInput source="updated_at" defaultValue="" InputProps={{ disabled: true }}/>
                    <DateInput source="created_at" defaultValue="" InputProps={{ disabled: true }}/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="评论"
                    count={
                        <ReferenceManyCount
                            reference="comments"
                            target="Article_id"
                            sx={{ lineHeight: 'inherit' }}
                        />
                    }
                >
                    <ReferenceManyField
                        reference="comments"
                        target="Article_id"
                        fullWidth
                    >
                        <Datagrid>
                            <DateField source="created_at" label="创建日期"/>
                            <TextField source="author" label="作者" />
                            <TextField source="content" label="内容"/>
                            <NumberField source="good_count" label="点赞数"/>
                            <BooleanField source="is_delete" label="是否删除"/>
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};

export default ArticleEdit;
