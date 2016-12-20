import {Component, AnimationTransitionEvent} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { Post } from '../post-data/posts.model';
import {AppState} from '../app.state';
import * as appSelectors from '../app.selectors';
import {animations} from './post.animations';
import * as siteDataActions from '../site-data/site-data.actions';

@Component({
	selector: 'wal-post-view',
	templateUrl: 'post.view.html',
	animations: animations
})


export class PostViewComponent {
	post: Post;
	logoSrc$: Observable<string>;

	private timer: NodeJS.Timer;
	private activeLocalAnimation$: Subject<boolean> = new Subject();
	private activeLocalAnimation: boolean;
	private fireAnimation: string;
	private deferredPost:Post;
	private activeTransitionAnimation: boolean;
	subscriptions: Subscription[] = [];

	postSub: Subscription;
	animSub: Subscription;
	animSub2: Subscription;

	safeTitle: SafeHtml;
	safeContent: SafeHtml

	constructor(private store: Store<AppState>, private router: Router, private ds: DomSanitizer){}
		

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
		 		this.router.navigateByUrl('/');
			}
		}
	}

	ngOnDestroy(){
		this.postSub.unsubscribe();
		this.animSub.unsubscribe();
		
	}
}