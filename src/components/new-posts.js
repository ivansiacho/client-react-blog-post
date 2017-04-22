import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPosts } from '../actions/index';
import { Link } from 'react-router';

class NewPosts extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmitForm(formProps) {
		this.props.createPosts(formProps).then(() => {
			this.context.router.push('/');
		});
	}

	render() {
		const { fields: {title, categories, content}, handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }>
				<h3>Create New Post</h3>
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

function mapDispatchToProps(dispatch) {
	return {
		createPosts: (formProps) => dispatch(createPosts(formProps))
	};
}

export default reduxForm({
	form: 'NewPosts',
	fields: ['title', 'categories', 'content'],
	validate
}, null, mapDispatchToProps)(NewPosts);