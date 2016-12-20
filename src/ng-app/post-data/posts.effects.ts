import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Route} from '@angular/router';

import * as postActions from './posts.actions';
import * as siteData from '../site-data/site-data.actions';
import {PostService} from './posts.service';
import {PostViewComponent} from '../views/post.view';
import { Post } from './posts.model';

declare const walInitialState: any;
const initialPosts: Post[] = walInitialState.posts;

@Injectable()
export class PostEffects {
	constructor(private actions$: Actions, private postService: PostService){}

	@Effect()
	loadPostPreviews$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.LOAD_POST_PREVIEWS)
		.map((action: postActions.LoadPostPreviewsAction) => action.payload)
		.mergeMap( options => {
			return this.postService.loadPostPreviews(options.apiPage, options.getFeatured) 
				.map(posts => {
					if(posts.length < 1){
						return new postActions.AllPostsLoadedAction();
					}
					else{
						return new postActions.LoadPostPreviewsCompleteAction(posts);
					}
				})
	});

	@Effect()
	loadPostPreviewsComplete$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE)
		.startWith( new postActions.LoadPostPreviewsCompleteAction(initialPosts))
		.map((action: postActions.LoadPostPreviewsCompleteAction) => {
			const posts = action.payload;
			const routes = posts.map(post => {
				return Object.assign({}, {
					path: post.path,
					component: PostViewComponent
				})
			});
			return new siteData.AddRoutesAction(routes)
		});

	@Effect()
	selectPost: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.SELECT_POST)
		.map((action: postActions.SelectPostAction) => action.payload)
		.mergeMap( post => {
			if(post.contentLoaded){
				return Observable.of(new postActions.LoadPostContentAction({id: post.id, content: post.content}));
			}
			else{
				return this.postService.loadPostContent(post.id)
					.map(content => {
						return new postActions.LoadPostContentAction({id: post.id, content: content});
					})
			}
			
		});
		

		
	


	
		// .map(posts => new post.LoadPostPreviewsCompleteAction(posts));
}
