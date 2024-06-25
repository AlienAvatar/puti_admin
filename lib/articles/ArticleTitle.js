import * as React from 'react';
import { useRecordContext, useTranslate } from 'react-admin';
import { useContext } from 'react';
export default () => {
    const translate = useTranslate();
    const record = useRecordContext();
    return (React.createElement(React.Fragment, null, record
        ? translate('post.edit.title', { title: record.title })
        : ''));
};
