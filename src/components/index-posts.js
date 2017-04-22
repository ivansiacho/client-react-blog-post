import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class IndexPosts extends React.Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.postsList.map((post) => {
			return (
				<li className="list-group-item" key={post._id}>
					<Link to={`posts/${post._id}`}>
						<span className="pull-xs-right">{post.categories}</span> <strong>{post.title}</strong>
					</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
				<div className="button-section">
					<Link to="posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		postsList: state.posts.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPosts);