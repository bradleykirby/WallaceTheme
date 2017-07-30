import { Component, AnimationTransitionEvent } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { Page } from '../page-data/pages.model';
import { AppState } from '../app.state';
import * as appSelectors from '../app.selectors';
import { animations } from './post.animations';
import * as siteDataActions from '../site-data/site-data.actions';

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
	logoSrc$: Observable<string>;

	private timer: NodeJS.Timer;
	private activeLocalAnimation$: Subject<boolean> = new Subject();
	private activeLocalAnimation: boolean;
	private fireAnimation: string;
	private deferredPage:Page;
	private activeTransitionAnimation: boolean;
	private pathToIndex: string;

	subscriptions: Subscription[] = [];

	pageSub: Subscription;
	animSub: Subscription;
	animSub2: Subscription;

	safeTitle: SafeHtml;
	safeContent: SafeHtml

	constructor(private store: Store<AppState>, private router: Router, private ds: DomSanitizer){}
	
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

	goHome($event: Event){
		$event.preventDefault();
		this.fireAnimation = 'out';
		this.store.dispatch(new siteDataActions.SetTransitionAction(true));
	}

	animationComplete($event: AnimationTransitionEvent){

		if($event.fromState !== 'void'){
			if($event.toState === 'in'){
				this.store.dispatch(new siteDataActions.SetTransitionAction(false));
			}
			else if($event.toState === 'out'){
		 		this.router.navigateByUrl(this.pathToIndex);
			}
		}
	}

	ngOnDestroy(){
		this.pageSub.unsubscribe();
		this.animSub.unsubscribe();
		
	}
}