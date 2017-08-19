import * as fromSiteData from './site-data/site-data.reducer';
import * as fromPostData from './post-data/posts.reducer';
import * as fromPageData from './page-data/pages.reducer';
import { combineReducers, ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';

import {AppState} from './app.state';

const reducers = {
	siteData: fromSiteData.reducer,
	posts: fromPostData.reducer,
	pages: fromPageData.reducer
};

//export const reducer:ActionReducer<AppState> = ;;
//export const reducer:ActionReducer<AppState> = combineReducers(reducers);;
export function reducer(){
	return combineReducers(reducers);
}

