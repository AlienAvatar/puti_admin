import * as React from 'react';
import { useTranslate, useRecordContext } from 'react-admin';
import { useContext } from 'react';
import { article_data_context } from '../dataProvider';

export default () => {
    const translate = useTranslate();
    const record = useContext(article_data_context);

    return (
        <>
            {record
                ? translate('post.edit.title', { title: record.title })
                : ''}
        </>
    );
};
