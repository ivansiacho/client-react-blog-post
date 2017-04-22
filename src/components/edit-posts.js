import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { editPosts, fetchPost } from '../actions/index';
import { Link } from 'react-router';

class EditPosts extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onSubmitForm(formProps) {
		this.props.editPosts(formProps, this.props.params.id).then(() => {
			this.context.router.push(`/posts/${this.props.params.id}`);
		});
	}

	render() {
		const { fields: {title, categories, content}, handleSubmit, postItem } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }>
				<h3>Edit Post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input className="form-control" type="text" {...title} />
					<div className="text-danger">
						{title.touched ? title.error : ''}
					</div>
				</div>
				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input className="form-control" type="text" {...categories} />
					<div className="text-danger">
						{categories.touched ? categories.error : ''}
					</div>
				</div>
				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className="form-control" {...content} />
					<div className="text-danger">
						{content.touched ? content.error : ''}
					</div>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title || values.title.trim() === '') {
		errors.title = 'Enter a username';
	}

	if (!values.categories || values.categories.trim() === '') {
		errors.categories = 'Enter a category';
	}

	if (!values.content || values.content.trim() === '') {
		errors.content = 'Enter a content';
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		// initialValues is a defined key used for redux form
		// will put all the defined values into the form
		initialValues: state.posts.post
	}
}

function mapDispatchToProps(dispatch) {
	return {
		editPosts: (formProps, idPost) => dispatch(editPosts(formProps, idPost)),
		fetchPost: (idPost) => dispatch(fetchPost(idPost))
	};
}

export default reduxForm({
	form: 'EditPosts',
	fields: ['title', 'categories', 'content'],
	validate
}, mapStateToProps, mapDispatchToProps)(EditPosts);