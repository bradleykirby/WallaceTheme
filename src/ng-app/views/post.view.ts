import { Component, AnimationTransitionEvent } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { Page, Pages } from '../page-data/pages.model';
import { Post } from '../post-data/posts.model';
import {AppState} from '../app.state';
import * as appSelectors from '../app.selectors';
import { animations } from './post.animations';
import * as siteDataActions from '../site-data/site-data.actions';
import * as pageActions from '../page-data/pages.actions';

import Prism from 'prismjs';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-typescript';

@Component({
	selector: 'wal-post-view',
	templateUrl: 'post.view.html',
	animations: animations
})

export class PostViewComponent {
	post: Post;
	pages$: Observable<Page[]>;
	logoSrc$: Observable<string>;
	siteTitle$: Observable<string>;
	siteFrontPage$: Observable<number>;
	siteMenus$: Observable<{id : number, parent: number, title: string}[]>;
	hasMenus: Boolean;
	menuIsVisible: boolean;

	private timer: NodeJS.Timer;
	private activeLocalAnimation$: Subject<boolean> = new Subject();
	private activeLocalAnimation: boolean;
	private fireAnimation: string;
	private deferredPost:Post;
	private activeTransitionAnimation: boolean;
	private pathToIndex: string;

	subscriptions: Subscription[] = [];

	postSub: Subscription;
	animSub: Subscription;
	animSub2: Subscription;

	safeTitle: SafeHtml;
	safeContent: SafeHtml

	constructor(private store: Store<AppState>, private router: Router, private ds: DomSanitizer){
		this.menuIsVisible = false;
		this.siteTitle$ = store.let(appSelectors.getSiteTitle);
		this.siteMenus$ = this.store.let(appSelectors.getSiteMenus);
		this.siteMenus$.subscribe(menus => {
			this.hasMenus = menus.length > 0;
		});
	}
	
	ngOnInit(){

		this.animSub = this.store.let(appSelectors.getAnimationData).subscribe(animationData => {
			this.activeTransitionAnimation = animationData.pageTransitionActive;
		});

		this.postSub = this.store.let(appSelectors.getSelectedPost).subscribe(selectedPost => {
			if((!this.activeTransitionAnimation) || this.post==undefined){
				this.post = selectedPost;
				this.safeTitle = this.ds.bypassSecurityTrustHtml(this.post.title);
				this.safeContent = this.ds.bypassSecurityTrustHtml(this.post.content);
			}
			else{
				this.animSub2 = this.store.let(appSelectors.getAnimationData).subscribe(animationData => {
					this.activeTransitionAnimation = animationData.pageTransitionActive;
					if(!this.activeTransitionAnimation){
						this.post = selectedPost;
						this.safeTitle = this.ds.bypassSecurityTrustHtml(this.post.title);
						this.safeContent = this.ds.bypassSecurityTrustHtml(this.post.content);
						
					}
				});
					
			}
		});
		this.logoSrc$ = this.store.let(appSelectors.getSiteIconSrc);
		this.pages$ = this.store.let(appSelectors.getPages);
		this.siteFrontPage$ = this.store.let(appSelectors.getFrontPageId);
		this.store.let(appSelectors.getPathToIndex).subscribe(_pathToIndex => {
			this.pathToIndex = _pathToIndex;
		})

		if(this.activeTransitionAnimation){
			this.fireAnimation = 'out';
		}
		else{
			this.fireAnimation = 'in';
		 }
		
	}

	ngAfterViewInit(){

		if(this.activeTransitionAnimation){
			window.scrollTo(0,0);
			this.fireAnimation = 'in';			
		}
		Prism.highlightAll();
		
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

		this.fireAnimation = 'out';
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
			if(data.blockingAnimations === 0){
				this.router.navigateByUrl(pageToNavigate.path);
			}
		}));
	}
	
	goHome($event: Event){
		let frontPageId:number;
		this.siteFrontPage$.subscribe( id => {frontPageId = id;});
	
		$event.preventDefault();
		this.fireAnimation = 'out';
		this.store.dispatch(new siteDataActions.SetTransitionAction(true));
		if (this.hasMenus){
			this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
		}
		if (frontPageId !== 0){
			let frontPage:Page;
		
			this.pages$.subscribe(pages => {
				pages.forEach(page => {
					if ( frontPageId == parseInt( page.id ) ){
						frontPage = page;
					}
				});
			});
			
			this.store.dispatch(new pageActions.SelectPageAction(frontPage));
			this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
			
			this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
				if(data.blockingAnimations === 0){
					this.router.navigateByUrl(frontPage.path);
				}
			}));
		}
		else {
			this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
			this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe( data => {
				if(data.blockingAnimations === 0){
					this.router.navigateByUrl(this.pathToIndex);
				}
			}));
		}
	}
	
	showMenu($event: Event){
		this.menuIsVisible = !this.menuIsVisible;
	}

	animationComplete($event: AnimationTransitionEvent){

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
		this.postSub.unsubscribe();
		this.animSub.unsubscribe();
		this.subscriptions.map(sub => {
			sub.unsubscribe();
		});
	}
}