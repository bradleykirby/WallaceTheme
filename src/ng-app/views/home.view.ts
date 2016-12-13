import 'rxjs/add/operator/let';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.state';
import * as appSelectors from '../app.selectors';
import * as postActions from '../post-data/posts.actions';
import { SiteData } from '../site-data/site-data.model';
import { Post, Posts } from '../post-data/posts.model';
import { animations } from './post.animations';

@Component({
	selector: 'wal-home-view',
	templateUrl: 'home.view.html', 
	animations: animations
})

export class HomeViewComponent {

	logoSrc$: Observable<string>;
	siteTitle$: Observable<string>;
	posts$: Observable<Post[]>;
	allPreviewsLoaded$: Observable<boolean>;
	selectedPostId$: Observable<string>;
	postsLoading$: Observable<boolean>;

	allPreviewsLoaded: boolean;
	loadingPostPreviews: boolean;
	featuredPostLoaded: boolean;
	currentAPIPage: number;
	selectedPostId: string;
	postEntities: { [id: string]: Post};

	flyOut: boolean = false;

	constructor(private store: Store<AppState>, private router: Router){
		this.logoSrc$ = store.let(appSelectors.getSiteIconSrc);
		this.siteTitle$ = store.let(appSelectors.getSiteTitle);
		this.posts$ = store.let(appSelectors.getPosts);	
		this.postsLoading$ = store.let(appSelectors.getPostsLoading);
		this.allPreviewsLoaded$ = store.let(appSelectors.getAllPostPreviewsLoadedStatus);
		this.selectedPostId$ = store.let(appSelectors.getSelectedPostId);
		store.let(appSelectors.getPostPreviewsLoadingStatus).subscribe( status => {
			this.loadingPostPreviews = status;
		});

		store.let(appSelectors.getCurrentAPIPage).subscribe( page => {
			this.currentAPIPage = page;
		})

		this.allPreviewsLoaded$.subscribe( status => {
			this.allPreviewsLoaded = status;
		})

		store.let(appSelectors.getFeaturedPostLoaded).subscribe( loaded => {
			this.featuredPostLoaded = loaded;
		})

		this.selectedPostId$.subscribe( id => {
			this.selectedPostId = id;
		})

		store.let(appSelectors.getPostEntities).subscribe( entities => {
			this.postEntities = entities;
		})
		
	}

	endOfListReachedEvent(){
		if(!this.loadingPostPreviews && !this.allPreviewsLoaded){

			this.store.dispatch(new postActions.LoadPostPreviewsAction({apiPage: this.currentAPIPage, getFeatured: !this.featuredPostLoaded}));
		}
	}

	navigateToPost(post: Post){
		this.flyOut = true;
		var t1 = setTimeout((t1) => {
			this.store.dispatch(new postActions.SelectPostAction(post));
			this.router.navigateByUrl(post.path);
			window.clearTimeout(t1);

		}, 550);

	}


	//todo: make this reactive?
	

}