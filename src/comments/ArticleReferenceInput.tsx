import * as React from 'react';
import { Fragment, useState, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    SelectInput,
    useTranslate,
    required,
    useListContext,
    ReferenceInput,
    TextInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import ArticleQuickCreate from './ArticleQuickCreate';
import ArticlePreview from './ArticlePreview';
import { random } from 'lodash';

const ArticleReferenceInput = () => {
    const translate = useTranslate();
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const postId = useWatch({ name: 'post_id' });

    const handleShowClick = useCallback(
        event => {
            event.preventDefault();
            setShowPreviewDialog(true);
        },
        [setShowPreviewDialog]
    );

    const handleCloseShow = useCallback(() => {
        setShowPreviewDialog(false);
    }, [setShowPreviewDialog]);

    // const { data } = useListContext();
    // console.log('data', data);
    // if (!data) return null;

    return (
        <>
            <ReferenceInput
                source="article_id"
                reference="articles"
                perPage={10000}
                sort={{ field: 'title', order: 'ASC' as const }}
            >
                <SelectInput
                    label='标题'
                    fullWidth
                    // create={<ArticleQuickCreate />}
                    optionText="title"
                    validate={required()}
                />
            </ReferenceInput>
        </>
    );
};

export default ArticleReferenceInput;
