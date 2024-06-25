import * as React from 'react';
import { useTranslate, useRecordContext } from 'react-admin';
import { useContext } from 'react';

export default () => {
    const translate = useTranslate();
    const record = useRecordContext();

    return (
        <>
            {record
                ? translate('post.edit.title', { title: record.title })
                : ''}
        </>
    );
};
