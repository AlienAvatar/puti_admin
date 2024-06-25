import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CloneButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    NumberField,
    ReferenceArrayField,
    ReferenceManyCount,
    RichTextField,
    SelectField,
    ShowContextProvider,
    ShowView,
    SingleFieldList,
    TabbedShowLayout,
    TextField,
    UrlField,
    useLocaleState,
    useRecordContext,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    useShowController,
    ShowActionsProps,
    TopToolbar,
    CreateButton,
    DeleteButton,
} from 'react-admin';
import ArticleTitle from './ArticleTitle';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from "../config";
import { getParameterFromUrl } from '../utils';
// import { ReferenceManyField } from "../components/iReferenceManyField"
const CreateRelatedComment = () => {
    const record = useRecordContext();
    
    return (
        <CloneButton
            resource="comments"
            label="添加评论"
            record={{ article_id: record.id }}
        />
    );
};

const ShowActions = () => (
    <TopToolbar>
        <CloneButton label="复制" className="button-clone" />
        <EditButton label="编辑"/>
        <DeleteButton label="删除"/>
    </TopToolbar>
);
/**
 * 展示文章详情
 *
 * @returns 文章详情页面组件
 */
const ArticleShow = () => {
    const id = getParameterFromUrl(window.location.hash, 'articles');
    const controllerProps = useShowController({ resource: 'articles', id: id });

    return (
        <ShowContextProvider value={controllerProps} >
            <ShowView title={<ArticleTitle />} actions={ShowActions()}>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="主体">
                        <TextField source="id" label="文件编号"/>
                        <TextField source="title" label="标题"/>
                        <TextField source="author" label="标题"/>
                        <RichTextField
                                    source="content"
                                    stripTags={false}
                                    label="内容"
                                />
                        <SelectField 
                            className="article_category"
                            source="category"
                            label="类型" 
                            choices={[
                                { id: '公告', name: '公告' },
                                { id: '古佛降世', name: '古佛降世' },
                                { id: '羌佛说法', name: '羌佛说法' },
                                { id: '羌佛公告', name: '羌佛公告' },
                                { id: '认证恭贺', name: '认证恭贺' },
                                { id: '羌佛圣量', name: '羌佛圣量' },
                                { id: '羌佛圣迹', name: '羌佛圣迹' },
                                { id: '圆满佛格', name: '圆满佛格' },
                                { id: '妙谙五明', name: '妙谙五明' },
                                { id: '渡生成就', name: '渡生成就' },
                            ]}
                        />
                       <CloneButton label="复制" />
                    </TabbedShowLayout.Tab>
                    <TabbedShowLayout.Tab label="其它">
                        <NumberField source="support_count" label="点赞数"/>
                        <NumberField source="views_count" label="浏览量"/>
                        <DateField source="created_at" label="创建日期"/>
                        <DateField source="updated_at" label="更新日期"/>
                        <CloneButton label="复制" />
                    </TabbedShowLayout.Tab>
                    <TabbedShowLayout.Tab label="评论"
                        count={
                            <ReferenceManyCount
                                reference="comments"
                                target="id"
                                sx={{ lineHeight: 'inherit' }}
                                sort={{ field: 'id', order: 'DESC' }}
                            />
                        }
                        >
                        <ReferenceManyField
                            reference="comments"
                            target="id"
                            sort={{ field: 'created_at', order: 'DESC' }}
                        >
                            <Datagrid>
                                <DateField source="created_at" label="创建日期"/>
                                <TextField source="author" label="作者" />
                                <TextField source="content" label="内容"/>
                                <NumberField source="support_count" label="点赞数"/>
                                <BooleanField source="is_delete" label="是否删除"/>
                                <EditButton label="编辑"/>
                            </Datagrid>
                        </ReferenceManyField>
                        <CreateRelatedComment />
                    </TabbedShowLayout.Tab>    
                </TabbedShowLayout>
            </ShowView>
        </ShowContextProvider>
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
