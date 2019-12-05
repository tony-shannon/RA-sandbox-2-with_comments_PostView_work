//import { withStyles } from '@material-ui/core/styles';
//import React from 'react';
import {
    Button,
    Datagrid,
    List,
    Responsive,
    CardActions,
    CreateButton,
    EditButton,
    ShowButton,
    SimpleList,
    TextField
} from 'react-admin';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { Drawer } from '@material-ui/core';
import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
/*
import {
    Datagrid,
    List,
    TextField,
    CardActions,
    CreateButton,
    EditButton
} from 'react-admin';
*/
//import TagCreate from './TagCreate';
//import TagEdit from './TagEdit';
import PostShow from './PostShow';
import PostCreate from './PostCreate';


const styles = theme => ({
    title: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    drawerContent: {
        width: 400
    }
});



const PostListActions = ({ basePath }) => (
    <CardActions>
        {console.log("basePath is " + JSON.stringify(basePath))}
        <CreateButton basePath={basePath} />
    </CardActions>
);

class PostList2 extends React.Component {
    render() {
        const { push, classes, ...props } = this.props;
        return (
            <Fragment>
                <List 
                {...props} 
                sort={{ field: 'published_at', order: 'DESC' }}
                actions={<PostListActions />}  
                > 
                    <Responsive
                        small={
                            <SimpleList linkType="show" primaryText={record => record.title} />
                        }
                        medium={
                            <Datagrid>
                                <TextField source="id" />
                                <TextField source="title" cellClassName={classes.title} />
                                <ShowButton />
                            </Datagrid>
                        }
                    />
                </List>
              
                <Route path="/posts/create">
                    {({ match }) => (
                        <Drawer
                            open={!!match}
                            anchor="right"
                            onClose={this.handleClose}
                        >
                            <PostCreate
                                className={classes.drawerContent}
                                onCancel={this.handleClose}
                                {...props}
                            />
                        </Drawer>
                    )}
                </Route>
                <Route path="/posts/:id">
                    {({ match }) => {
                        const isMatch =
                            match &&
                            match.params &&
                            match.params.id !== 'create';
                        console.log("setting up Tag Drawer");
                        console.log("DrawerProps are " + JSON.stringify({ ...props }))
                        console.log("Drawer Props.match is " + JSON.stringify({ ...props.match }))
                        console.log("IsMatch1 is " + JSON.stringify(isMatch));
                        console.log("match is " + JSON.stringify(match));
                        console.log("classes are " + JSON.stringify(classes));
                        
                        return (
                          
                            <Drawer
                                open={isMatch}
                                anchor="right"
                                onClose={this.handleClose}
                            >
                                {console.log("IsMatch2 is " + JSON.stringify(isMatch))}
                                {isMatch ? (
                                   
                                    <PostShow

                                        className={classes.drawerContent}
                                        id={isMatch ? match.params.id : null}
                                        onCancel={this.handleClose}
                                        {...props}
                                    />
                                ) : (
                                        <div className={classes.drawerContent} />
                                    )}
                            </Drawer>
                        );
                    }}
                </Route>
            </Fragment>
        );
    }

    handleClose = () => {
        this.props.push('/tags');
    };
}

export default compose(
    connect(
        undefined,
        { push }
    ),
    withStyles(styles)
)(PostList2);
