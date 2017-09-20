import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { of } from 'rxjs/observable/of';


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
	updatePostTitle$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.UPDATE_POST_TITLE)
		.map((action: postActions.UpdatePostTitleAction) => action.payload)
		.mergeMap( data => {
			return this.postService.updatePostTitle(data.postId, data.postTitle)
			.map(postId => {
				console.log(postId);
				return new postActions.UpdatePostTitleCompleteAction(data.postId);
			}).catch(err => {
				console.log(err);
				return of(new postActions.UpdatePostTitleFailedAction(data.postId));
			})
		});
		
	@Effect()
	updatePostExcerpt$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.UPDATE_POST_EXCERPT)
		.map((action: postActions.UpdatePostExcerptAction) => action.payload)
		.mergeMap( data => {
			return this.postService.updatePostExcerpt(data.postId, data.postExcerpt)
			.map(postId => {
				console.log(postId);
				return new postActions.UpdatePostExcerptCompleteAction(data.postId);
			}).catch(err => {
				console.log(err);
				return of(new postActions.UpdatePostExcerptFailedAction(data.postId));
			})
		});
		
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

	@Effect()
	uploadFeaturedImage$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.UPLOAD_FEATURED_IMAGE)
		.map((action: postActions.UploadFeaturedImageAction) => action.payload)
		.mergeMap( data => {
			return this.postService.uploadMedia(data.file)
			.map(resp => {
				console.log(resp);
				return new postActions.UploadFeaturedImageCompleteAction({postId: data.postId, mediaSources: resp});
			})
			.catch(err => {
				console.log(err);
				return of(new postActions.UploadFeaturedImageFailedAction(data.postId));
			})
		});

	@Effect()
	uploadFeaturedImageComplete$: Observable<Action> = this.actions$
		.ofType(postActions.ActionTypes.UPLOAD_FEATURED_IMAGE_COMPLETE)
		.map((action: postActions.UploadFeaturedImageCompleteAction) => action.payload)
		.mergeMap( data => {
			return this.postService.associateMedia(data.postId, data.mediaSources.id)
			.map(postId => {
				console.log(postId);
				return new postActions.AssociateFeaturedImageCompleteAction(data.postId);
			})
			.catch(err => {
				console.log(err);
				return of(new postActions.AssociateFeaturedImageFailedAction(data.postId));
			})
		});

	
		

		
	


	
		// .map(posts => new post.LoadPostPreviewsCompleteAction(posts));
}
