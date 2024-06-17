import * as React from 'react';
import { useState, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { SelectInput, useTranslate, required } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { ReferenceInput } from '../components/iReferenceInput';
const ArticleReferenceInput = () => {
    const translate = useTranslate();
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const postId = useWatch({ name: 'post_id' });
    const handleShowClick = useCallback(event => {
        event.preventDefault();
        setShowPreviewDialog(true);
    }, [setShowPreviewDialog]);
    const handleCloseShow = useCallback(() => {
        setShowPreviewDialog(false);
    }, [setShowPreviewDialog]);
    // const { data } = useListContext();
    // console.log('data', data);
    // if (!data) return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(ReferenceInput, { source: "comment_id", reference: "articles", perPage: 10000, sort: { field: 'title', order: 'ASC' } },
            React.createElement(SelectInput, { label: '\u6807\u9898', fullWidth: true, 
                // create={<ArticleQuickCreate />}
                optionText: "title", validate: required() }))));
};
export default ArticleReferenceInput;
