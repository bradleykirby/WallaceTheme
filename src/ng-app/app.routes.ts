import {Routes } from '@angular/router';

import {HomeViewComponent} from './views/home.view';
import {PostViewComponent} from './views/post.view';
import {CanDeactivateHomeGuard, CanDeactivatePostGuard} from './views/guards';

	export const initialRoutes: Routes = [
	  { path: '', component: HomeViewComponent, canDeactivate: [CanDeactivateHomeGuard] },	 
	  { path: '**', component: PostViewComponent, canDeactivate: [CanDeactivatePostGuard] },	  

	];

