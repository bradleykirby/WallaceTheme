import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import '@ngrx/core/add/operator/select';


import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import {Post, Posts} from './posts.model';


export function getPostEntities(posts$: Observable<Posts>){
	return posts$.select(posts => posts.entities);
}

export function getPostIds(posts$: Observable<Posts>){
	return posts$.select(posts => posts.ids);
}

export function getPosts(posts$: Observable<Posts>){
	return combineLatest<{ [id: string]: Post }, string[]>(
	  	posts$.let(getPostEntities),
	  	posts$.let(getPostIds)
  	)
    .map(([ entities, ids ]) => ids.map(id => entities[id]));
}

export function getSelectedPost(posts$: Observable<Posts>){
	return combineLatest<{ [id: string]: Post }, string>(
		posts$.let(getPostEntities),
  		posts$.let(getSelectedPostId)
	)
	.map(([ entities, id ]) => entities[id]);
}


export function getPostPreviewsLoadingStatus(posts$: Observable<Posts>){
	return posts$.select(posts => posts.loadingPostPreviews);
}

export function getCurrentAPIPage(posts$: Observable<Posts>){
	return posts$.select(posts => posts.currentAPIPage);
}

export function getAllPostPreviewsLoadedStatus(posts$: Observable<Posts>){
	return posts$.select(posts => posts.allPostPreviewsLoaded);
}

export function getSelectedPostId(posts$: Observable<Posts>){
	return posts$.select(posts => posts.selectedPostId);
}

export function getFeaturedPostLoaded(posts$: Observable<Posts>){
	return posts$.select(posts => posts.featuredPostLoaded);
}

export function getPostsLoading(posts$: Observable<Posts>){
	return posts$.select(posts => posts.loadingPostPreviews);
}

