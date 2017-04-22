import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

const API_KEY = '';
const ROOT_URL = 'http://localhost:4000/api';

export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts`);

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function createPosts(formProps) {
	const request = axios.post(`${ROOT_URL}/posts`, formProps);

	return {
		type: CREATE_POSTS,
		payload: request
	}
}

export function fetchPost(idPost) {
	const request = axios.get(`${ROOT_URL}/posts/${idPost}`);

	return {
		type: FETCH_POST,
		payload: request
	}
}

export function deletePost(idPost) {
	const request = axios.delete(`${ROOT_URL}/posts/${idPost}`);

	return {
		type: DELETE_POST,
		payload: request
	}
}

export function editPosts(formProps, idPost) {
	const request = axios.put(`${ROOT_URL}/posts/${idPost}`, formProps);

	return {
		type: EDIT_POST,
		payload: request
	}
}