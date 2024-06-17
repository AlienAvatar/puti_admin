import * as React from 'react';

import {
    Create,
    DateInput,
    TextInput,
    SimpleFormConfigurable,
    SimpleForm,
    minLength,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import ArticleReferenceInput from './ArticleReferenceInput';

const CommentCreate = () =>{
    return (
        <Create redirect={false}>
            <SimpleFormConfigurable>
                <ArticleReferenceInput  />
                <TextInput fullWidth label="正文" source="content" multiline 
                    sx={{
                        '& .tiptap': {
                            paddingTop: '10px',
                            height: 200,
                        },
                    }}
                />
                <TextInput source="author" label="昵称" />
            </SimpleFormConfigurable>
        </Create>
    );
} 

export default CommentCreate;
