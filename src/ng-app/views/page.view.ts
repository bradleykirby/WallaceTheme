import { Component, AnimationTransitionEvent } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Router, NavigationStart } from '@angular/router';

import { Page, Pages } from '../page-data/pages.model';
import { AppState } from '../app.state';
import * as appSelectors from '../app.selectors';
import { animations } from './post.animations';
import * as siteDataActions from '../site-data/site-data.actions';
import * as pageActions from '../page-data/pages.actions';

import Prism from 'prismjs';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-typescript';

@Component({
	selector: 'wal-page-view',
	templateUrl: 'page.view.html',
	animations: animations
})

export class PageViewComponent {
	page: Page;
	pages$: Observable<Page[]>;
	logoSrc$: Observable<string>;
	siteTitle$: Observable<string>;
	siteFrontPage$: Observable<number>;
	siteMenus$: Observable<{id : number, parent: number, title: string}[]>;
	hasMenus: Boolean;

	private timer: NodeJS.Timer;
	private activeLocalAnimation$: Subject<boolean> = new Subject();
	private activeLocalAnimation: boolean;
	private fireAnimation: string;
	private deferredPage:Page;
	private activeTransitionAnimation: boolean;
	private pathToIndex: string;
	private currentUrl: string;

	subscriptions: Subscription[] = [];

	pageSub: Subscription;
	paramSub: Subscription;
	animSub: Subscription;
	animSub2: Subscription;

	safeTitle: SafeHtml;
	safeContent: SafeHtml

	constructor(private store: Store<AppState>, private router: Router, private ds: DomSanitizer){
		this.paramSub = router.events.subscribe(event => {
			if(event instanceof NavigationStart) {
				this.currentUrl = event.url;
				
				let pageNavigatedTo:Page;
				this.pages$.subscribe(pages => {
					pages.forEach(page => {
						if ( this.currentUrl == '/' + page.path ){
							pageNavigatedTo = page;
						}
					});
				});
				
				if (pageNavigatedTo != undefined){
					this.store.dispatch(new pageActions.SelectPageAction(pageNavigatedTo));
				}
			}
		});	
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

		this.pageSub = this.store.let(appSelectors.getSelectedPage).subscribe(selectedPage => {
			if((!this.activeTransitionAnimation) || this.page==undefined){
				this.page = selectedPage;
				this.safeTitle = this.ds.bypassSecurityTrustHtml(this.page.title);
				this.safeContent = this.ds.bypassSecurityTrustHtml(this.page.content);
			}
			else{
				this.animSub2 = this.store.let(appSelectors.getAnimationData).subscribe(animationData => {
					this.activeTransitionAnimation = animationData.pageTransitionActive;
					if(!this.activeTransitionAnimation){
						this.page = selectedPage;
						this.safeTitle = this.ds.bypassSecurityTrustHtml(this.page.title);
						this.safeContent = this.ds.bypassSecurityTrustHtml(this.page.content);
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
		
		if (parseInt(this.page.id) !== id){

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
	}

	goHome($event: Event){
		let frontPageId:number;
		this.siteFrontPage$.subscribe( id => {frontPageId = id;});
	
		if (parseInt(this.page.id) !== frontPageId){
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
		this.pageSub.unsubscribe();
		this.animSub.unsubscribe();
		this.paramSub.unsubscribe();
		if (typeof this.animSub2 !== "undefined"){
			this.animSub2.unsubscribe();
		}
		
		this.subscriptions.map(sub => {
			sub.unsubscribe();
		});
	}
}