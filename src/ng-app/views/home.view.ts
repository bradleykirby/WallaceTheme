import 'rxjs/add/operator/let';

import { Component, ViewChild, ElementRef, NgZone, AnimationTransitionEvent, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.state';
import * as appSelectors from '../app.selectors';
import * as postActions from '../post-data/posts.actions';
import * as pageActions from '../page-data/pages.actions';
import * as siteDataActions from '../site-data/site-data.actions';
import { SiteData } from '../site-data/site-data.model';
import { Post, Posts } from '../post-data/posts.model';
import { Page, Pages } from '../page-data/pages.model';
import { animations } from './post.animations';

@Component({
	selector: 'wal-home-view',
	templateUrl: 'home.view.html', 
	animations: animations
})

export class HomeViewComponent {

	pathToIndex: string;
	siteBlogPage$: Observable<number>;
	siteFrontPage$: Observable<number>;
	shouldNavigate
	
	logoSrc$: Observable<string>;
	siteTitle$: Observable<string>;
	posts$: Observable<Post[]>;
	pages$: Observable<Page[]>;
	allPreviewsLoaded$: Observable<boolean>;
	selectedPostId$: Observable<string>;
	postsLoading$: Observable<boolean>;
	getAdminState$: Observable<{adminMode: boolean, editMode: boolean}>;
	siteMenus$: Observable<{id : number, parent: number, title: string}[]>;

	allPreviewsLoaded: boolean;
	loadingPostPreviews: boolean;
	featuredPostLoaded: boolean;
	currentAPIPage: number;
	selectedPostId: string;
	postEntities: { [id: string]: Post};
	activeTransitionAnimation: boolean;

	subscriptions: Subscription[] = [];
	fireTransition: string;

	constructor(private store: Store<AppState>, private router: Router, private cd: ChangeDetectorRef){
		this.posts$ = store.let(appSelectors.getPosts);
		this.pages$ = store.let(appSelectors.getPages);
		this.siteMenus$ = store.let(appSelectors.getSiteMenus);

		this.store.let(appSelectors.getPathToIndex).subscribe(_pathToIndex => {
			this.pathToIndex = _pathToIndex;
		});
		this.siteBlogPage$ = this.store.let(appSelectors.getBlogPageId);
		this.siteFrontPage$ = this.store.let(appSelectors.getFrontPageId);
		this.logoSrc$ = store.let(appSelectors.getSiteIconSrc);
		this.siteTitle$ = store.let(appSelectors.getSiteTitle);
		this.postsLoading$ = store.let(appSelectors.getPostsLoading);
		this.allPreviewsLoaded$ = store.let(appSelectors.getAllPostPreviewsLoadedStatus);
		this.getAdminState$ = store.let(appSelectors.getAdminState);
		//this.selectedPostId$ = store.let(appSelectors.getSelectedPostId);
		this.subscriptions.push(this.store.let(appSelectors.getPostPreviewsLoadingStatus).subscribe( status => {
			this.loadingPostPreviews = status;
		}));

		this.subscriptions.push(store.let(appSelectors.getCurrentAPIPage).subscribe( page => {
			this.currentAPIPage = page;
		}));

		this.subscriptions.push(this.allPreviewsLoaded$.subscribe( status => {
			this.allPreviewsLoaded = status;
		}));

		this.subscriptions.push(store.let(appSelectors.getFeaturedPostLoaded).subscribe( loaded => {
			this.featuredPostLoaded = loaded;
		}));

		this.subscriptions.push(store.let(appSelectors.getPostEntities).subscribe( entities => {
			this.postEntities = entities;
		}));
		
		this.subscriptions.push(store.let(appSelectors.getAnimationData).subscribe( data => {
			this.activeTransitionAnimation = data.pageTransitionActive;
		}));

	}

	ngOnInit(){
		if(this.activeTransitionAnimation){
			this.fireTransition = 'out';
		}
		else{
			this.fireTransition = 'in';
		}
	}

	ngOnChanges(){
		console.log('tick');
	}

	ngAfterViewInit(){

		if(this.activeTransitionAnimation){
			this.fireTransition = 'in';			
		}
	}

	endOfListReachedEvent(){
		if(!this.loadingPostPreviews && !this.allPreviewsLoaded){
			this.store.dispatch(new postActions.LoadPostPreviewsAction({apiPage: this.currentAPIPage, getFeatured: !this.featuredPostLoaded}));
		}
	}

	navigateToPost(post: Post){

		this.store.dispatch(new siteDataActions.SetTransitionAction(true));
		this.store.dispatch(new postActions.SelectPostAction(post));

		this.fireTransition = 'out';
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
			if(data.blockingAnimations === 0){
				this.router.navigateByUrl(post.path);
			}
		}));
		
	}
	
	navigateToPage(id: number){
		let pageToNavigate:Page;
		
		this.pages$.subscribe(pages => {
			pages.forEach(page => {
				if ( id == parseInt( page.id ) ){
					pageToNavigate = page;
				}
			});
		});
		
		this.store.dispatch(new siteDataActions.SetTransitionAction(true));
		this.store.dispatch(new pageActions.SelectPageAction(pageToNavigate));

		this.fireTransition = 'out';
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
			if(data.blockingAnimations === 0){
				this.router.navigateByUrl(pageToNavigate.path);
			}
		}));
	}
	
	goHome($event: Event){
		let blogPageId:number,
			frontPageId:number;
		this.siteBlogPage$.subscribe( id => {blogPageId = id;});
		this.siteFrontPage$.subscribe( id => {frontPageId = id;});
	
		if (blogPageId !== 0 && frontPageId != 0){		
			$event.preventDefault();
			let homePage:Page;
		
			this.pages$.subscribe(pages => {
				pages.forEach(page => {
					if ( '' == page.path ){
						homePage = page;
					}
				});
			});
			
			this.store.dispatch(new siteDataActions.SetTransitionAction(true));
			this.store.dispatch(new pageActions.SelectPageAction(homePage));
			
			this.fireTransition = 'out';
			this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
			
			this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
				if(data.blockingAnimations === 0){
					this.router.navigateByUrl(homePage.path);
				}
			}));
		}
	}

	animationDone($event: AnimationTransitionEvent){
		if($event.fromState !== 'void'){
			if($event.toState === 'in'){
				this.store.dispatch(new siteDataActions.SetTransitionAction(false));
			}
			else if($event.toState === 'out'){
				this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
			}
		}
	}

	ngOnDestroy(){
		this.subscriptions.map(sub => {
			sub.unsubscribe();
		});
		
	}


	

}