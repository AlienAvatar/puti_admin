import * as React from 'react';
import { useTranslate, useRecordContext } from 'react-admin';
export default () => {
    const translate = useTranslate();
    const record = useRecordContext();
    console.log('record', record);
    return (React.createElement(React.Fragment, null, record
        ? translate('post.edit.title', { title: record.title })
        : ''));
};
