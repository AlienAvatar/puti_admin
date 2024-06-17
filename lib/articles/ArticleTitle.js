import * as React from 'react';
import { useTranslate } from 'react-admin';
import { useContext } from 'react';
import { article_data_context } from '../dataProvider';
export default () => {
    const translate = useTranslate();
    const record = useContext(article_data_context);
    return (React.createElement(React.Fragment, null, record
        ? translate('post.edit.title', { title: record.title })
        : ''));
};
