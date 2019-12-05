import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm,
    required,
    SaveButton,
    Toolbar,
    translate
} from 'react-admin';
import Button from '@material-ui/core/Button';

const PostCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

const PostCreate = ({ onCancel, ...props }) => (
    <Create title=" " {...props}>
        <SimpleForm toolbar={<PostCreateToolbar onCancel={onCancel} />}>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

export default PostCreate;