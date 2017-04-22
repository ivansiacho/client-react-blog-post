import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class ShowPosts extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDelete() {
		this.props.deletePost(this.props.params.id).then(() => {
			this.context.router.push('/');
		});
	}

    onEdit() {
        this.context.router.push(`/posts/edit/${this.props.params.id}`);
    }

    render() {
    	const { postItem } = this.props;

    	if (!postItem) {
    		return <div>Loading...</div>;
    	}

        return (
        	<div>
                <Link to="/">
                    Back to Index
                </Link>
                <div className="jumbotron">
                    <div className="page-header">
                      <h1>{postItem.title} <small>{postItem.categories}</small></h1>
                    </div>
                    <p>{postItem.content}</p>
                    <div className="button-section">
                        <button
                            onClick={this.onDelete.bind(this)}
                            className="btn btn-danger pull-xs-right">
                                Delete Post
                        </button>
                        <button
                            onClick={this.onEdit.bind(this)}
                            className="btn btn-primary pull-xs-right">
                                Edit Post
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		postItem: state.posts.post
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPost: (idPost) => dispatch(fetchPost(idPost)),
		deletePost: (idPost) => dispatch(deletePost(idPost))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
