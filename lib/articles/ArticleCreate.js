var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { DefaultEditorOptions, RichTextInput } from 'ra-input-rich-text';
import { Create, required, SelectInput, SimpleFormConfigurable, TextInput } from 'react-admin';
import { useWatch } from 'react-hook-form';
import { Button, DialogActions } from '@mui/material';
import axios from 'axios';
import * as config from "../config";
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
    const editorRef = React.useRef(null);
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const titleElement = document.getElementById('title');
        const title = titleElement ? titleElement.value : '';
        const content = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getHTML();
        const categoryElement = document.querySelector('.MuiSelect-nativeInput');
        const category = categoryElement ? categoryElement.value : '';
        axios.defaults.headers['token'] = token;
        const result = yield axios.post(config.PATH_ARTICLE_CREATE, {
            'title': title,
            'author': nickname,
            'content': content,
            'category': category
        });
        if (result.data.status == "success") {
            console.log(result.data);
        }
        else {
            return new Promise((resolve, reject) => setTimeout(reject, 1000));
        }
    });
    return (React.createElement(Create, { redirect: "edit" },
        React.createElement(SimpleFormConfigurable
        //toolbar={<ArticleCreateToolbar {...editorRef} />}
        , { 
            //toolbar={<ArticleCreateToolbar {...editorRef} />}
            onSubmit: handleSubmit },
            React.createElement(TextInput, { className: 'article_title', autoFocus: true, source: "title", validate: required('Required field') }),
            React.createElement(RichTextInput, { className: 'article_rich_content', source: "content", fullWidth: true, sx: {
                    '& .tiptap': {
                        paddingTop: '10px',
                        height: 200,
                    },
                }, editorOptions: Object.assign(Object.assign({}, DefaultEditorOptions), { onCreate: ({ editor }) => {
                        editorRef.current = editor;
                    } }), validate: required() }),
            React.createElement(TextInput, { className: 'article_author', autoFocus: true, source: "author", validate: required('Required field'), defaultValue: nickname, InputProps: {
                    readOnly: true,
                } }),
            React.createElement(SelectInput, { className: "article_category", source: "category", label: "\u7C7B\u578B", choices: [
                    { id: 'tech', name: 'Tech' },
                    { id: 'lifestyle', name: 'Lifestyle' },
                    { id: 'people', name: 'People' },
                ] }),
            React.createElement(DialogActions, null,
                React.createElement(Button, { type: "submit" }, "Save")))));
};
export default ArticleCreate;
const DependantInput = ({ dependency, children, }) => {
    const dependencyValue = useWatch({ name: dependency });
    return dependencyValue ? children : null;
};
