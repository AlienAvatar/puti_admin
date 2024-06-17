import * as React from 'react';
import { ArrayField, BooleanField, CloneButton, ChipField, Datagrid, DateField, EditButton, NumberField, ReferenceArrayField, ReferenceManyField, ReferenceManyCount, RichTextField, SelectField, ShowContextProvider, ShowView, SingleFieldList, TabbedShowLayout, TextField, UrlField, useShowController, useLocaleState, useRecordContext, } from 'react-admin';
import PostTitle from './PostTitle';
const CreateRelatedComment = () => {
    const record = useRecordContext();
    return (React.createElement(CloneButton, { resource: "comments", label: "Add comment", record: { post_id: record.id } }));
};
const PostShow = () => {
    const controllerProps = useShowController();
    const [locale] = useLocaleState();
    return (React.createElement(ShowContextProvider, { value: controllerProps },
        React.createElement(ShowView, { title: React.createElement(PostTitle, null) },
            React.createElement(TabbedShowLayout, null,
                React.createElement(TabbedShowLayout.Tab, { label: "post.form.summary" },
                    React.createElement(TextField, { source: "id" }),
                    React.createElement(TextField, { source: "title" }),
                    controllerProps.record &&
                        controllerProps.record.title ===
                            'Fusce massa lorem, pulvinar a posuere ut, accumsan ac nisi' && (React.createElement(TextField, { source: "teaser" })),
                    React.createElement(ArrayField, { source: "backlinks" },
                        React.createElement(Datagrid, { bulkActionButtons: false },
                            React.createElement(DateField, { source: "date" }),
                            React.createElement(UrlField, { source: "url" })))),
                React.createElement(TabbedShowLayout.Tab, { label: "post.form.body" },
                    React.createElement(RichTextField, { source: "body", stripTags: false, label: false })),
                React.createElement(TabbedShowLayout.Tab, { label: "post.form.miscellaneous" },
                    React.createElement(ReferenceArrayField, { reference: "tags", source: "tags", sort: { field: `name.${locale}`, order: 'ASC' } },
                        React.createElement(SingleFieldList, null,
                            React.createElement(ChipField, { source: `name.${locale}`, size: "small", clickable: true }))),
                    React.createElement(DateField, { source: "published_at" }),
                    React.createElement(SelectField, { source: "category", choices: [
                            { name: 'Tech', id: 'tech' },
                            { name: 'Lifestyle', id: 'lifestyle' },
                        ] }),
                    React.createElement(NumberField, { source: "average_note" }),
                    React.createElement(BooleanField, { source: "commentable" }),
                    React.createElement(TextField, { source: "views" }),
                    React.createElement(CloneButton, null)),
                React.createElement(TabbedShowLayout.Tab, { label: "post.form.comments", count: React.createElement(ReferenceManyCount, { reference: "comments", target: "post_id", sx: { lineHeight: 'inherit' } }) },
                    React.createElement(ReferenceManyField, { reference: "comments", target: "post_id", sort: { field: 'created_at', order: 'DESC' } },
                        React.createElement(Datagrid, null,
                            React.createElement(DateField, { source: "created_at" }),
                            React.createElement(TextField, { source: "author.name" }),
                            React.createElement(TextField, { source: "body" }),
                            React.createElement(EditButton, null))),
                    React.createElement(CreateRelatedComment, null))))));
};
export default PostShow;
