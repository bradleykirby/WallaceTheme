import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';

import {AppState} from './app.state';
import * as fromSiteData from './site-data/site-data.selectors';
import * as fromPosts from './post-data/posts.selectors';

export function getSiteDataState(state$: Observable<AppState>){
	return state$.select(state => state.siteData);
}

export function getPostsState(state$: Observable<AppState>){
	return state$.select(state => state.posts);
}

export const getSiteIconSrc = compose(fromSiteData.getSiteIconSrc, getSiteDataState);
export const getSiteTitle = compose(fromSiteData.getSiteTitle, getSiteDataState);
export const getRoutes = compose(fromSiteData.getRoutes, getSiteDataState);
export const getAnimationData = compose(fromSiteData.getAnimationData, getSiteDataState);
export const getPathToIndex = compose(fromSiteData.getPathToIndex, getSiteDataState);


export const getPostEntities = compose(fromPosts.getPostEntities, getPostsState);
export const getPosts = compose(fromPosts.getPosts, getPostsState);
export const getPostPreviewsLoadingStatus = compose(fromPosts.getPostPreviewsLoadingStatus, getPostsState);
export const getCurrentAPIPage = compose(fromPosts.getCurrentAPIPage, getPostsState);
export const getAllPostPreviewsLoadedStatus = compose(fromPosts.getAllPostPreviewsLoadedStatus, getPostsState);
export const getSelectedPostId = compose(fromPosts.getSelectedPostId, getPostsState);
export const getSelectedPost = compose(fromPosts.getSelectedPost, getPostsState);
export const getFeaturedPostLoaded = compose(fromPosts.getFeaturedPostLoaded, getPostsState);
export const getPostsLoading = compose(fromPosts.getPostsLoading, getPostsState);
