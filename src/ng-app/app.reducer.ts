import * as fromSiteData from './site-data/site-data.reducer';
import * as fromPostData from './post-data/posts.reducer';
import { combineReducers, ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import {AppState} from './app.state';

const reducers = {
	siteData: fromSiteData.reducer,
	posts: fromPostData.reducer
};

//export const reducer:ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);;
//export const reducer:ActionReducer<AppState> = combineReducers(reducers);;
export function reducer(){
	return combineReducers(reducers);
}

