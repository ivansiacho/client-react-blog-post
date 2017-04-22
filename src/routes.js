import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import IndexPosts from './components/index-posts';
import NewPosts from './components/new-posts';
import ShowPosts from './components/show-posts';
import EditPosts from './components/edit-posts';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={IndexPosts}/>
		<Route path="/posts/new" component={NewPosts}/>
		<Route path="/posts/:id" component={ShowPosts}/>
		<Route path="/posts/edit/:id" component={EditPosts} />
	</Route>
);