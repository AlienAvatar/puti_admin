import * as React from 'react';
import { Fragment, useState, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { ReferenceInput, SelectInput, useTranslate, required, } from 'react-admin'; // eslint-disable-line import/no-unresolved
import PostQuickCreate from './PostQuickCreate';
import PostPreview from './PostPreview';
const PostReferenceInput = () => {
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
    return (React.createElement(React.Fragment, null,
        React.createElement(ReferenceInput, { source: "post_id", reference: "posts", perPage: 10000, sort: { field: 'title', order: 'ASC' } },
            React.createElement(SelectInput, { fullWidth: true, create: React.createElement(PostQuickCreate, null), optionText: "title", validate: required() })),
        postId ? (React.createElement(Fragment, null,
            React.createElement(Button, { "data-testid": "button-show-post", sx: { margin: '10px 24px', position: 'relative' }, onClick: handleShowClick }, translate('ra.action.show')),
            React.createElement(Dialog, { "data-testid": "dialog-show-post", fullWidth: true, open: showPreviewDialog, onClose: handleCloseShow, "aria-label": translate('simple.create-post') },
                React.createElement(DialogTitle, null, translate('simple.create-post')),
                React.createElement(DialogContent, null,
                    React.createElement(PostPreview, { id: postId, resource: "posts" })),
                React.createElement(DialogActions, null,
                    React.createElement(Button, { "data-testid": "button-close-modal", onClick: handleCloseShow }, translate('simple.action.close')))))) : null));
};
export default PostReferenceInput;
