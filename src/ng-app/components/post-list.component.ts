import {Component, Input, Output, ViewChild, ElementRef, NgZone, SimpleChange,
	EventEmitter,  trigger, state, style, transition, animate, ChangeDetectionStrategy, ChangeDetectorRef, AnimationTransitionEvent} from '@angular/core';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

import {Post, Posts} from '../post-data/posts.model';
import {AppState} from '../app.state';
import {animations} from './post-list.animations';
import * as siteDataActions from '../site-data/site-data.actions';
import * as appSelectors from '../app.selectors';

@Component({
	selector: 'wal-post-list',
	templateUrl: 'post-list.component.html',
	animations: animations,


})

export class PostListComponent{

	@Input() posts: Post[];
	@Input() allPreviewsLoaded: boolean;
	@Input() postsLoading: boolean;
	@Input() willNavigateToPage: boolean;
	@Input() adminState: Observable<{adminMode: boolean, editMode: boolean}>;
	@Output() endOfListReachedEvent = new EventEmitter();
	@Output() activatePostPreviewEvent = new EventEmitter<Post>();
	@ViewChild('postLoadStatus') postLoadStatus: ElementRef;

	private timer: Observable<number>;
	private scrollCheck: Subscription;
	private fireTransition: string;
	private startup: string;
	private prepareAnimation: boolean = false;
	private activeTransitionAnimation: boolean;
	private animSub: Subscription;

	constructor(private cd: ChangeDetectorRef, private store: Store<AppState>, private _ngZone: NgZone) {
		this.animSub = store.let(appSelectors.getAnimationData).subscribe( data => {
			this.activeTransitionAnimation = data.pageTransitionActive;
		});
		this.startup = 'void';
	}
	ngOnInit(){

		if(this.activeTransitionAnimation){
			this.fireTransition = 'out';
		}
		else{
			this.fireTransition = 'in';
		}
		
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}){
		if (typeof changes['willNavigateToPage'] !== "undefined" && !changes['willNavigateToPage'].isFirstChange()) {
			this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
			this.prepareAnimation = true;
			this.startup = 'true';
			this.fireTransition = 'out';
		}
	}

	

	ngAfterViewInit(){
		if(this.activeTransitionAnimation){
			this.fireTransition = 'in';
		}
		this._ngZone.runOutsideAngular(() => {
			this.timer = Observable.timer(0,500);
			this.scrollCheck = this.timer.subscribe(() => {
				var viewportTop = window.pageYOffset;
					var viewportBottom = window.innerHeight + viewportTop;
					if (this.postLoadStatus.nativeElement.offsetTop < viewportBottom){
						this._ngZone.run(() => {
							this.endOfListReachedEvent.emit();
						});	
					}
			});
		});	
	}

	getPostId(index, item){
		return item.id;
	}

	handleItemClick(selectedPost: Post){
		this.cd.detach();

		//for this component
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		//for child component
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));
		
		this.fireTransition = 'out';
		this.cd.detectChanges();
		this.activatePostPreviewEvent.emit(selectedPost);
	}

	handleTransitionDone($event: AnimationTransitionEvent){
		if($event.fromState !== 'void'){
			if($event.toState === 'out'){
				this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
			}
		}
	}

	handleItemAnimationDone($event: AnimationTransitionEvent){
		if($event.fromState !== 'void'){
			this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
		}
	}

	ngOnDestroy(){
		this.animSub.unsubscribe();
		this.scrollCheck.unsubscribe();
	}
}