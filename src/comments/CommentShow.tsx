import * as React from 'react';
import {
    DateField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const CommentShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="article_id" reference="articles" label="文章标题">
                <TextField source="title"/>
            </ReferenceField>
            <ReferenceField source="article_id" reference="articles" label="文章作者">
                <TextField source="author" />
            </ReferenceField>
            <TextField source="author" label="评论作者"/>
            <TextField source="content" label="评论内容"/>
            <DateField source="created_at" label="创建日期"/>
        </SimpleShowLayout>
    </Show>
);

export default CommentShow;
