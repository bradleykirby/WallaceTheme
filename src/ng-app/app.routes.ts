import { Routes } from '@angular/router';

import { HomeViewComponent } from './views/home.view';
import { PostViewComponent } from './views/post.view';
import { PageViewComponent } from './views/page.view';
import { CanDeactivateHomeGuard, CanActivatePostGuard, CanActivatePageGuard, CanDeactivatePostGuard, CanDeactivatePageGuard} from './views/guards';
declare var walInitialState: any;
var pathToIndex = walInitialState.site_data.pathToIndex;

	export const initialRoutes: Routes = [
	  { path: pathToIndex, component: (walInitialState.frontpage_id == 0 ? HomeViewComponent : PageViewComponent), canDeactivate: [CanDeactivateHomeGuard] }
	];

