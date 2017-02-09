import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';


import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import {AppState} from '../app.state';
import {Post, Posts} from './posts.model';
import * as posts from './posts.actions';
import { PostViewComponent } from '../views/post.view';

//from server-side php (index.php, single.php) 
//TODO: shard this into just initialSiteData
declare const walInitialState: any;
const initialPosts: Post[] = walInitialState.posts;

const initialState: Posts = {
	ids: initialPosts.map( post => post.id),
	entities: getPostEntitiesFromPostArray(initialPosts),
	selectedPostId: walInitialState.selectedPostId,
	loadingPostPreviews: false,
	featuredPostLoaded: false,
	currentAPIPage: 1,
	allPostPreviewsLoaded: false,
}

export function reducer(state = initialState, action: posts.Actions): Posts {
	switch(action.type) {

		case posts.ActionTypes.SELECT_POST: {
			return Object.assign({}, state, {
				selectedPostId: action.payload.id
			});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS: {
			return Object.assign({}, state, {
		        loadingPostPreviews: true
	      	});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE: {

			const posts = action.payload;
			const newPosts = posts.filter(post => !state.entities[post.id]).map(post => {
				return Object.assign({}, post, {loadedAfterBootstrap: true});
			});
			const featuredPostIncluded = posts.filter(post => post.featured).length > 0 ? true : false;
			const newPostIds = newPosts.map(post => post.id);
			const newPostEntities = newPosts.reduce((entities: { [id: string]: Post}, post:Post) => {
				return Object.assign(entities, {
					[post.id]: post
				});
			}, {});
			return {
				ids: [...state.ids, ...newPostIds ],
				entities: Object.assign({}, state.entities, newPostEntities),
				selectedPostId: state.selectedPostId,
				loadingPostPreviews: false,
				featuredPostLoaded: state.featuredPostLoaded ? true : featuredPostIncluded,
				currentAPIPage: state.currentAPIPage + 1,
				allPostPreviewsLoaded: false
			};
		}
		case posts.ActionTypes.ALL_POST_PREVIEWS_LOADED: {
			return Object.assign({}, state, {
				loadingPostPreviews: false,
				allPostPreviewsLoaded: true
			});
		}
		case posts.ActionTypes.LOAD_POST_CONTENT: {
			const idOfPostToLoad = action.payload.id;
			const content = action.payload.content;
			const postEntityToUpdate = state.entities[idOfPostToLoad];
			const updatedPost = Object.assign({}, postEntityToUpdate, {content: content, contentLoaded: true});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPostToLoad]: updatedPost
				})
			});
		}
		case posts.ActionTypes.DISPLAY_IMAGE_PREVIEW: {
			const idOfPost = action.payload.postId;
			const newImgUrl = action.payload.imgUrl;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {newImageURL: newImgUrl});
			console.log(updatedPost);
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		default: {
      		return state;
		}
	}
}


function getPostEntitiesFromPostArray(posts: Post[]){

	return posts.reduce((entities: { [id: string]: Post}, post: Post) => {
		return Object.assign(entities, {
			[post.id]: Object.assign({}, post, {newImageURL: 'null'})
		});
	}, {});
}





