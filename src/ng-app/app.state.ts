import { SiteData } from './site-data/site-data.model';
import { Posts } from './post-data/posts.model';
import { Pages } from './page-data/pages.model';

export interface AppState {
	siteData: SiteData,
	posts: Posts,
	pages: Pages
}