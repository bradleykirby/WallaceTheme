import { SiteData } from './site-data/site-data.model';
import { Posts } from './post-data/posts.model';

export interface AppState {
	siteData: SiteData,
	posts: Posts
}