import * as React from 'react';
import { Create, SimpleFormConfigurable, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ArticleReferenceInput from './ArticleReferenceInput';
const now = new Date();
const CommentCreate = () => {
    const nickname = localStorage.getItem('nickname');
    return (React.createElement(Create, { redirect: false },
        React.createElement(SimpleFormConfigurable, null,
            React.createElement(ArticleReferenceInput, null))));
};
export default CommentCreate;
