import * as React from 'react';
import { CloneButton, Datagrid, DateField, EditButton, NumberField, RichTextField, SelectField, ShowContextProvider, ShowView, TabbedShowLayout, TextField, useRecordContext } from 'react-admin';
import ArticleTitle from './ArticleTitle';
import { useShowController } from '../components/iuseShowController';
import { getParameterFromUrl } from '../utils';
import { ReferenceManyField } from "../components/iReferenceManyField";
const CreateRelatedComment = () => {
    const record = useRecordContext();
    return (React.createElement(CloneButton, { resource: "comments", label: "Add comment", record: { post_num: record.num } }));
};
const ArticleShow = () => {
    const num = getParameterFromUrl(window.location.hash, 'articles');
    const controllerProps = useShowController({ resource: 'articles', num: num });
    return (React.createElement(ShowContextProvider, { value: controllerProps },
        React.createElement(ShowView, { title: React.createElement(ArticleTitle, null) },
            React.createElement(TabbedShowLayout, null,
                React.createElement(TabbedShowLayout.Tab, { label: "\u4E3B\u4F53" },
                    React.createElement(TextField, { source: "num", label: "\u6587\u4EF6\u7F16\u53F7" }),
                    React.createElement(TextField, { source: "title", label: "\u6807\u9898" }),
                    React.createElement(TextField, { source: "author", label: "\u6807\u9898" }),
                    React.createElement(RichTextField, { source: "content", stripTags: false, label: "\u5185\u5BB9" }),
                    React.createElement(SelectField, { className: "article_category", source: "category", label: "\u7C7B\u578B", choices: [
                            { id: 'tech', name: 'Tech' },
                            { id: 'lifestyle', name: 'Lifestyle' },
                            { id: 'people', name: 'People' },
                        ] }),
                    React.createElement(CloneButton, null)),
                React.createElement(TabbedShowLayout.Tab, { label: "\u5176\u5B83" },
                    React.createElement(NumberField, { source: "support_count", label: "\u70B9\u8D5E\u6570" }),
                    React.createElement(NumberField, { source: "views_count", label: "\u6D4F\u89C8\u91CF" }),
                    React.createElement(DateField, { source: "created_at", label: "\u521B\u5EFA\u65E5\u671F" }),
                    React.createElement(DateField, { source: "updated_at", label: "\u66F4\u65B0\u65E5\u671F" }),
                    React.createElement(CloneButton, null)),
                React.createElement(TabbedShowLayout.Tab, { label: "\u8BC4\u8BBA" },
                    React.createElement(ReferenceManyField, { reference: "comments", target: "num", sort: { field: 'created_at', order: 'DESC' } },
                        React.createElement(Datagrid, null,
                            React.createElement(DateField, { source: "created_at" }),
                            React.createElement(TextField, { source: "author.name" }),
                            React.createElement(TextField, { source: "body" }),
                            React.createElement(EditButton, null))),
                    React.createElement(CreateRelatedComment, null)))))
    // <ShowContextProvider value={}>
    //         <TabbedShowLayout>
    //             Show
    //             {/* <TabbedShowLayout.Tab label="post.form.summary">
    //                 <TextField source="id" />
    //                 <TextField source="title" />
    //                 {controllerProps.record &&
    //                     controllerProps.record.title ===
    //                         'Fusce massa lorem, pulvinar a posuere ut, accumsan ac nisi' && (
    //                         <TextField source="teaser" />
    //                     )}
    //                 <ArrayField source="backlinks">
    //                     <Datagrid bulkActionButtons={false}>
    //                         <DateField source="date" />
    //                         <UrlField source="url" />
    //                     </Datagrid>
    //                 </ArrayField>
    //             </TabbedShowLayout.Tab>
    //             <TabbedShowLayout.Tab label="post.form.body">
    //                 <RichTextField
    //                     source="body"
    //                     stripTags={false}
    //                     label={false}
    //                 />
    //             </TabbedShowLayout.Tab>
    //             <TabbedShowLayout.Tab label="post.form.miscellaneous">
    //                 <ReferenceArrayField
    //                     reference="tags"
    //                     source="tags"
    //                     sort={{ field: `name.${locale}`, order: 'ASC' }}
    //                 >
    //                     <SingleFieldList>
    //                         <ChipField
    //                             source={`name.${locale}`}
    //                             size="small"
    //                             clickable
    //                         />
    //                     </SingleFieldList>
    //                 </ReferenceArrayField>
    //                 <DateField source="published_at" />
    //                 <SelectField
    //                     source="category"
    //                     choices={[
    //                         { name: 'Tech', id: 'tech' },
    //                         { name: 'Lifestyle', id: 'lifestyle' },
    //                     ]}
    //                 />
    //                 <NumberField source="average_note" />
    //                 <BooleanField source="commentable" />
    //                 <TextField source="views" />
    //                 <CloneButton />
    //             </TabbedShowLayout.Tab>
    //             <TabbedShowLayout.Tab
    //                 label="post.form.comments"
    //                 count={
    //                     <ReferenceManyCount
    //                         reference="comments"
    //                         target="post_id"
    //                         sx={{ lineHeight: 'inherit' }}
    //                     />
    //                 }
    //             >
    //                 <ReferenceManyField
    //                     reference="comments"
    //                     target="post_id"
    //                     sort={{ field: 'created_at', order: 'DESC' }}
    //                 >
    //                     <Datagrid>
    //                         <DateField source="created_at" />
    //                         <TextField source="author.name" />
    //                         <TextField source="body" />
    //                         <EditButton />
    //                     </Datagrid>
    //                 </ReferenceManyField>
    //                 <CreateRelatedComment />
    //             </TabbedShowLayout.Tab> */}
    //         </TabbedShowLayout>
    // </ShowContextProvider>
    );
};
export default ArticleShow;
