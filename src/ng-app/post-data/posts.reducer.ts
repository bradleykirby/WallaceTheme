import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';


import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
			const post = <Post>action.payload;
			return Object.assign({}, state, {
				selectedPostId: post.id
			});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS: {
			return Object.assign({}, state, {
		        loadingPostPreviews: true
	      	});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE: {

			const posts = <Post[]>action.payload;
			const newPosts = posts.filter(post => !state.entities[post.id]).map(post => {
				return Object.assign({}, post, {loadedAfterBootstrap: true});
			});
			const featuredPostIncluded = posts.filter(post => post.featured).length > 0 ? true : false;
			const newPostIds = newPosts.map(post => post.id);
			const newPostEntities = getPostEntitiesFromPostArray(newPosts);
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
			const post = <Post>action.payload;
			const idOfPostToLoad = post.id;
			const content = post.content;
			const postEntityToUpdate = state.entities[idOfPostToLoad];
			const updatedPost = Object.assign({}, postEntityToUpdate, {content: content, contentLoaded: true});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPostToLoad]: updatedPost
				})
			});
		}
		case posts.ActionTypes.DISPLAY_IMAGE_PREVIEW: {
			const payload = <{postId: string, imgUrl: string}>action.payload;
			const idOfPost = payload.postId;
			const newImgUrl = payload.imgUrl;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {newImageURL: newImgUrl});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		case posts.ActionTypes.SHOW_EDIT_MENU: {
			const payload = <{postId: string, editing: {active: boolean, target: string}}>action.payload;
			const idOfPost = payload.postId;
			const newEditingValue = payload.editing;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {editing: newEditingValue});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		case posts.ActionTypes.UPLOAD_FEATURED_IMAGE: {

			const payload = <{postId: string, file: File}>action.payload;
			const idOfPost = payload.postId;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {newImageUploadProgress: 0.3});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}

		case posts.ActionTypes.UPLOAD_FEATURED_IMAGE_FAILED: {

			const idOfPost = <string>action.payload;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {editing:{active: true, target: 'FEATURED_IMAGE_ERROR', error: "UPLOAD_FAILED"}, newImageUploadProgress: 0});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		case posts.ActionTypes.UPLOAD_FEATURED_IMAGE_COMPLETE: {

			const payload = <{postId: string, mediaSources: {id: string, loRes: string, hiRes: string}}>action.payload;
			const idOfPost = payload.postId;
			const postEntityToUpdate = state.entities[idOfPost];
			const newVal = postEntityToUpdate.newImageUploadProgress+0.1;
			const updatedPost = Object.assign({}, postEntityToUpdate, {
				newImageUploadProgress: 0.7, 
				newImageSources: {loRes: payload.mediaSources.loRes, hiRes: payload.mediaSources.hiRes}
			});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		case posts.ActionTypes.ASSOCIATE_FEATURED_IMAGE_FAILED: {
			const idOfPost = <string>action.payload;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {editing:{active: true, target: 'FEATURED_IMAGE_ERROR', error: "ASSOCIATE_FAILED"}, newImageUploadProgress: 0});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}
		case posts.ActionTypes.ASSOCIATE_FEATURED_IMAGE_COMPLETE: {
			const idOfPost = <string>action.payload;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {newImageUploadProgress: 1});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPost]: updatedPost
				})
			});
		}

		case posts.ActionTypes.UPDATE_FEATURED_IMAGE_REF: {
			const idOfPost = <string>action.payload;
			const postEntityToUpdate = state.entities[idOfPost];
			const updatedPost = Object.assign({}, postEntityToUpdate, {
				imageURLLowRes: postEntityToUpdate.newImageSources.loRes,
				imageURLHiRes: postEntityToUpdate.newImageSources.hiRes,
				newImageSources: {loRes: '', hiRes: ''},
				newImageUploadProgress: 0,
				newImageURL: 'null'
			});
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
			[post.id]: Object.assign({}, post, {newImageURL: 'null', 
				editing: {active: false, target: 'null', error: 'null'}, 
				newImageUploadProgress: 0, 
				newImageSources: {loRes: '', hiRes: ''}
			})
		});
	}, {});
}





