import {Routes } from '@angular/router';

import {HomeViewComponent} from './views/home.view';
import {PostViewComponent} from './views/post.view';
import {CanDeactivateHomeGuard, CanDeactivatePostGuard} from './views/guards';
declare var walInitialState: any;
const pathToIndex = walInitialState.site_data.pathToIndex

	export const initialRoutes: Routes = [
	  { path: pathToIndex, component: HomeViewComponent, canDeactivate: [CanDeactivateHomeGuard] },	 
	  { path: '**', component: PostViewComponent, canDeactivate: [CanDeactivatePostGuard] },	  

	];

