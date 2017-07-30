import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';

import {AppState} from './app.state';
import * as fromSiteData from './site-data/site-data.selectors';
import * as fromPosts from './post-data/posts.selectors';
import * as fromPages from './page-data/pages.selectors';

export function getSiteDataState(state$: Observable<AppState>){
	return state$.select(state => state.siteData);
}

export function getPostsState(state$: Observable<AppState>){
	return state$.select(state => state.posts);
}

export function getPagesState(state$: Observable<AppState>){
	return state$.select(state => state.pages);
}

export const getSiteIconSrc = compose(fromSiteData.getSiteIconSrc, getSiteDataState);
export const getSiteTitle = compose(fromSiteData.getSiteTitle, getSiteDataState);
export const getRoutes = compose(fromSiteData.getRoutes, getSiteDataState);
export const getAnimationData = compose(fromSiteData.getAnimationData, getSiteDataState);
export const getPathToIndex = compose(fromSiteData.getPathToIndex, getSiteDataState);
export const getAdminState = compose(fromSiteData.getAdminState, getSiteDataState);

export const getPostEntities = compose(fromPosts.getPostEntities, getPostsState);
export const getPosts = compose(fromPosts.getPosts, getPostsState);
export const getPostPreviewsLoadingStatus = compose(fromPosts.getPostPreviewsLoadingStatus, getPostsState);
export const getCurrentAPIPage = compose(fromPosts.getCurrentAPIPage, getPostsState);
export const getAllPostPreviewsLoadedStatus = compose(fromPosts.getAllPostPreviewsLoadedStatus, getPostsState);
export const getSelectedPostId = compose(fromPosts.getSelectedPostId, getPostsState);
export const getSelectedPost = compose(fromPosts.getSelectedPost, getPostsState);
export const getFeaturedPostLoaded = compose(fromPosts.getFeaturedPostLoaded, getPostsState);
export const getPostsLoading = compose(fromPosts.getPostsLoading, getPostsState);

export const getPageEntities = compose(fromPages.getPageEntities, getPagesState);
export const getPages = compose(fromPages.getPages, getPagesState);
export const getPagePreviewsLoadingStatus = compose(fromPages.getPagePreviewsLoadingStatus, getPagesState);
//export const getCurrentAPIPage = compose(fromPage.getCurrentAPIPage, getPagesState);
export const getAllPagePreviewsLoadedStatus = compose(fromPages.getAllPagePreviewsLoadedStatus, getPagesState);
export const getSelectedPageId = compose(fromPages.getSelectedPageId, getPagesState);
export const getSelectedPage = compose(fromPages.getSelectedPage, getPagesState);
export const getFeaturedPageLoaded = compose(fromPages.getFeaturedPageLoaded, getPagesState);
export const getPagesLoading = compose(fromPages.getPagesLoading, getPagesState);
