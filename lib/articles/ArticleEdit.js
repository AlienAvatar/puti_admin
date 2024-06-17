var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { DefaultEditorOptions, RichTextInput } from 'ra-input-rich-text';
import { TopToolbar, Datagrid, DateField, DateInput, CloneButton, CreateButton, ShowButton, EditButton, NumberInput, ReferenceManyField, ReferenceManyCount, SelectInput, TabbedForm, TextField, TextInput, required, SaveButton, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Box, } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from "../config";
import { DeleteButton } from '../components/iDeleteButton';
const EditActions = ({ hasShow }) => (React.createElement(TopToolbar, null,
    React.createElement(CloneButton, { className: "button-clone" }),
    hasShow && React.createElement(ShowButton, null),
    React.createElement(CreateButton, null)));
const FormActions = (props) => {
    return (React.createElement(TopToolbar, { className: 'update_TopToolbar', sx: {
            '& .update_TopTolbar': {
                display: 'flex',
                justifyContent: 'flex-start',
            }
        } },
        React.createElement(SaveButton, { className: 'update_button_save', sx: {
                '& .update_button_save': {
                    float: 'left',
                }
            }, label: "Save", type: "submit", variant: "contained" }),
        React.createElement(DeleteButton, { onClick: DeleteClilckHandle, record: props }),
        React.createElement(ShowButton, null)));
};
const DeleteClilckHandle = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('token');
    const num = getParameterFromUrl(window.location.hash, 'articles');
    let delete_url = `${config.PATH_ARTICLE_DELETE}${num}`;
    console.log(delete_url);
    axios.defaults.headers['token'] = token;
    const result = yield axios.post(delete_url);
    console.log('result', result);
    if (result.data.status == "success") {
        return new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
    else {
        console.log(result);
        return new Promise((resolve, reject) => setTimeout(reject, 1000));
    }
});
const SanitizedBox = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullWidth } = _a, props = __rest(_a, ["fullWidth"]);
    return React.createElement(Box, Object.assign({}, props));
};
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
    const editorRef = React.useRef(null);
    const num = getParameterFromUrl(window.location.hash, 'articles');
    let get_url = `${config.PATH_ARTICLE_GET}${num}`;
    let update_url = `${config.PATH_ARTICLE_UPDATE}${num}`;
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            axios.defaults.headers['token'] = token;
            const result = yield axios.get(get_url, {});
            if (result.data.status == "success") {
                setArticle(result.data.data.article);
            }
            else {
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        });
        fetchData();
    }, [token, get_url]);
    const updateData = (data) => __awaiter(void 0, void 0, void 0, function* () {
        axios.defaults.headers['token'] = token;
        const result = yield axios.post(update_url, {
            'title': data.title,
            'author': nickname,
            'content': data.content,
            'category': data.category,
            'support_count': data.support_count,
            'views_count': data.views_count,
        });
        console.log('result', result);
        if (result.data.status == "success") {
            return new Promise((resolve, reject) => setTimeout(resolve, 1000));
        }
        else {
            return new Promise((resolve, reject) => setTimeout(reject, 1000));
        }
    });
    return (React.createElement(TabbedForm, { defaultValues: article, warnWhenUnsavedChanges: true, onSubmit: updateData, toolbar: React.createElement(FormActions, { props: article }) },
        React.createElement(TabbedForm.Tab, { label: "\u4E3B\u4F53" },
            React.createElement(SanitizedBox, { display: "flex", flexDirection: "column", width: "100%", justifyContent: "space-between", fullWidth: true },
                React.createElement(TextInput, { InputProps: { disabled: true }, source: "num" }),
                React.createElement(TextInput, { InputProps: { disabled: true }, source: "author" }),
                React.createElement(TextInput, { source: "title", validate: required(), resettable: true })),
            React.createElement(RichTextInput, { className: 'article_rich_content', source: "content", fullWidth: true, sx: {
                    '& .tiptap': {
                        paddingTop: '10px',
                        height: 200,
                    },
                }, editorOptions: Object.assign(Object.assign({}, DefaultEditorOptions), { onCreate: ({ editor }) => {
                        editorRef.current = editor;
                    } }), validate: required() }),
            React.createElement(SelectInput, { className: "article_category", source: "category", label: "\u7C7B\u578B", choices: [
                    { id: 'tech', name: 'Tech' },
                    { id: 'lifestyle', name: 'Lifestyle' },
                    { id: 'people', name: 'People' },
                ] })),
        React.createElement(TabbedForm.Tab, { label: "\u5176\u5B83" },
            React.createElement(NumberInput, { label: "\u70B9\u8D5E\u6570", source: "support_count" }),
            React.createElement(NumberInput, { label: "\u6D4F\u89C8\u91CF", source: "views_count" }),
            React.createElement(DateInput, { source: "updated_at", defaultValue: "", InputProps: { disabled: true } }),
            React.createElement(DateInput, { source: "created_at", defaultValue: "", InputProps: { disabled: true } })),
        React.createElement(TabbedForm.Tab, { label: "\u8BC4\u8BBA", count: React.createElement(ReferenceManyCount, { reference: "comments", target: "Article_id", sx: { lineHeight: 'inherit' } }) },
            React.createElement(ReferenceManyField, { reference: "comments", target: "Article_id", fullWidth: true },
                React.createElement(Datagrid, null,
                    React.createElement(DateField, { source: "created_at" }),
                    React.createElement(TextField, { source: "author.name" }),
                    React.createElement(TextField, { source: "body" }),
                    React.createElement(EditButton, null)))))
    // <Edit title={<ArticleTitle />} actions={<EditActions />}>
    //     <TabbedForm
    //         defaultValues={{ average_note: 0 }}
    //         warnWhenUnsavedChanges
    //     >
    //         <TabbedForm.Tab label="主体">
    //             <SanitizedBox
    //                 display="flex"
    //                 flexDirection="column"
    //                 width="100%"
    //                 justifyContent="space-between"
    //                 fullWidth
    //             >
    //                 <TextInput
    //                     InputProps={{ disabled: true }}
    //                     source="num"
    //                 />
    //                 <TextInput
    //                     source="title"
    //                     validate={required()}
    //                     resettable
    //                 />
    //             </SanitizedBox>
    //             <RichTextInput
    //                 source="body"
    //                 label={false}
    //                 validate={required()}
    //                 fullWidth
    //             />
    //             <SelectInput 
    //                 className="article_category"
    //                 source="category"
    //                 label="类型" 
    //                 choices={[
    //                     { id: 'tech', name: 'Tech' },
    //                     { id: 'lifestyle', name: 'Lifestyle' },
    //                     { id: 'people', name: 'People' },
    //                 ]}
    //             />
    //         </TabbedForm.Tab>
    //         <TabbedForm.Tab
    //             label="评论"
    //             count={
    //                 <ReferenceManyCount
    //                     reference="comments"
    //                     target="Article_id"
    //                     sx={{ lineHeight: 'inherit' }}
    //                 />
    //             }
    //         >
    //             <ReferenceManyField
    //                 reference="comments"
    //                 target="Article_id"
    //                 fullWidth
    //             >
    //                 <Datagrid>
    //                     <DateField source="created_at" />
    //                     <TextField source="author.name" />
    //                     <TextField source="body" />
    //                     <EditButton />
    //                 </Datagrid>
    //             </ReferenceManyField>
    //         </TabbedForm.Tab>
    //     </TabbedForm>
    // </Edit>
    );
};
export default ArticleEdit;
