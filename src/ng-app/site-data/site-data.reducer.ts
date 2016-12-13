import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import {AppState} from '../app.state';
import {SiteData} from './site-data.model';
import * as siteData from './site-data.actions';
import { initialRoutes } from '../app.routes';
//from server-side php (index.php, single.php) 
//TODO: shard this into just initialSiteData
declare var walInitialState: any;
const initialState: SiteData = {
	title: walInitialState.site_data.title,
	iconUrl: walInitialState.site_data.iconUrl,
	routes: initialRoutes
}

export function reducer(state = initialState, action: siteData.Actions): SiteData {
	switch(action.type) {
		case siteData.ActionTypes.ADD_ROUTES: {
			return Object.assign({}, state, {
				routes: [...state.routes, ...action.payload]
			});
		}
		default: {
    		return state;
		}
	}

}

