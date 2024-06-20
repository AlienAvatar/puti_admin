import * as React from 'react';
import {
    Box,
    Card,
    Typography,
    Dialog,
    DialogContent,
    TextField as MuiTextField,
    DialogActions,
    Button,
} from '@mui/material';
import {
    AutocompleteInput,
    CreateButton,
    DateInput,
    EditContextProvider,
    useEditController,
    Link as RaLink,
    ReferenceInput,
    SimpleForm,
    TextInput,
    Title,
    minLength,
    ShowButton,
    TopToolbar,
    useCreateSuggestionContext,
    useCreate,
    useCreatePath,
    useRecordContext,
} from 'react-admin';

const LinkToRelatedPost = () => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    return (
        <RaLink
            to={createPath({
                type: 'edit',
                resource: 'articles',
                id: record?.id,
            })}
        >
            <Typography variant="caption" color="inherit" align="right">
                创建文章
            </Typography>
        </RaLink>
    );
};

const OptionRenderer = (props: any) => {
    const record = useRecordContext();
    return record.id === '@@ra-create' ? (
        <div {...props}>{record.name}</div>
    ) : (
        <div {...props}>
            {record?.title} - {record?.id}
        </div>
    );
};

const inputText = record =>
    record.id === '@@ra-create'
        ? record.name
        : `${record.title} - ${record.id}`;

const CreatePost = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        create(
            'posts',
            {
                data: {
                    title: value,
                },
            },
            {
                onSuccess: data => {
                    setValue('');
                    const choice = data;
                    onCreate(choice);
                },
            }
        );
        return false;
    };
    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <MuiTextField
                        label="New post title"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const CommentEdit = props => {
    const controllerProps = useEditController(props);
    const { resource, record, save } = controllerProps;
    
    return (
        <EditContextProvider value={controllerProps}>
            <div className="edit-page">
                <Title defaultTitle={controllerProps.defaultTitle} />
                <Box sx={{ float: 'right' }}>
                    <TopToolbar>
                        <ShowButton record={record} />
                        {/* FIXME: added because react-router HashHistory cannot block navigation induced by address bar changes */}
                        <CreateButton resource="posts" label="Create post" />
                    </TopToolbar>
                </Box>
                <Card sx={{ marginTop: '1em', maxWidth: '30em' }}>
                    {record && (
                        <SimpleForm
                            resource={resource}
                            record={record}
                            onSubmit={save}
                            warnWhenUnsavedChanges
                        >
                            <TextInput
                                source="id"
                                fullWidth
                                InputProps={{ disabled: true }}
                                label="评论编号"
                            />
                            <ReferenceInput
                                source="article_id"
                                reference="articles"
                                perPage={15}
                                sort={{ field: 'title', order: 'ASC' }}
                                label="文章标题和文章编号"
                            >
                                <AutocompleteInput
                                    label="文章标题和文章编号"
                                    matchSuggestion={(
                                        filterValue,
                                        suggestion
                                    ) => {
                                        const title = `${suggestion.title} - ${suggestion.id}`;
                                        return title.includes(filterValue);
                                    }}
                                    optionText={<OptionRenderer />}
                                    inputText={inputText}
                                    fullWidth
                                />
                            </ReferenceInput>

                            <LinkToRelatedPost />
                            <TextInput
                                source="author"
                                fullWidth
                                label="评论作者"
                            />
                            <TextInput
                                source="content"
                                fullWidth={true}
                                multiline={true}
                            />
                            <TextInput
                                source="support_count"
                            />
                            <DateInput source="created_at" fullWidth disabled/>
                        </SimpleForm>
                    )}
                </Card>
            </div>
        </EditContextProvider>
    );
};

export default CommentEdit;
