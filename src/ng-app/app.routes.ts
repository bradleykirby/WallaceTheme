import { Routes } from '@angular/router';

import { HomeViewComponent } from './views/home.view';
import { PostViewComponent } from './views/post.view';
import { PageViewComponent } from './views/page.view';
import { CanDeactivateHomeGuard, CanActivatePostGuard, CanActivatePageGuard, CanDeactivatePostGuard, CanDeactivatePageGuard} from './views/guards';
import { ComplexUrlMatcher } from './complex.url.matcher';
declare var walInitialState: any;
var pathToIndex = walInitialState.site_data.pathToIndex;

	export const initialRoutes: Routes = [
	  { path: pathToIndex, component: HomeViewComponent, canDeactivate: [CanDeactivateHomeGuard] },
	  { matcher: ComplexUrlMatcher("id", /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/), component: PostViewComponent, data:{type: 'PostViewComponent', selectedPostId: walInitialState.selectedPostId}, canDeactivate: [CanDeactivatePostGuard] }, //canActivate: [ CanActivatePostGuard ],
	  { path: '**', component: PageViewComponent, data:{type: 'PageViewComponent', selectedPostId: walInitialState.selectedPageId}, canDeactivate: [CanDeactivatePageGuard] } //canActivate: [ CanActivatePageGuard ],

	];

