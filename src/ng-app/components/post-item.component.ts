import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, AnimationTransitionEvent} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


import {Post, Posts} from '../post-data/posts.model';
import {RouterLink, Router} from '@angular/router';
import {animations} from './post-list.animations';

@Component({
	selector: 'wal-post-item',
	templateUrl: 'post-item.component.html',
	animations: animations,
	host: {
     '[@itemSelected]': 'fireAnimation',
      '(@itemSelected.done)': "animationDone($event)",
      '[@fadeOut]': 'fade',
      '(@fadeOut.done)': 'fadeDone($event)',
     '[class.change-opacity-transform]':'prepareAnimation'
   },
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class PostItemComponent{
	@Input() post: Post;
	@Input() isAdminActive: boolean;
	@Output() itemClickedEvent = new EventEmitter<Post>();
	@Output() itemAnimationDoneEvent = new EventEmitter();

	fireAnimation: boolean;
	prepareAnimation: boolean;
	safeTitle: SafeHtml;
	safeExcerpt: SafeHtml;
	safeCategoryTag: SafeHtml;
	timerSub: Subscription;
	timerSub2: Subscription;
	fade: string;

	constructor(private ds: DomSanitizer, private _ngZone: NgZone){

	}

	ngOnInit(){
		this.fireAnimation = false;
		this.prepareAnimation = false;
		this.safeTitle = this.ds.bypassSecurityTrustHtml(this.post.title);
		this.safeExcerpt = this.ds.bypassSecurityTrustHtml(this.post.excerpt);
		this.safeCategoryTag = this.ds.bypassSecurityTrustHtml(this.post.categoryString);
		if(this.post.loadedAfterBootstrap){
			this.fade = 'out';
			this.prepareAnimation = true;
		}
		else{
			this.fade = 'in';
		}
	}

	ngAfterViewInit(){
		if(this.post.loadedAfterBootstrap){
			this.timerSub2 = Observable.timer(50).subscribe(() => {
				this.fade = 'in';
			});
		}
	}

	ngOnChanges(){

	}

	

	// ngOnChanges(){
	// 	console.log(this.fireAnimation);
	// }

	postItemClick($event: Event){

		$event.preventDefault();
		this.prepareAnimation = true;
		this.timerSub = Observable.timer(50).subscribe(() => {
			this.fireAnimation = true;
			this.itemClickedEvent.emit(this.post);
		});
		


	}

	postImageClick($event: Event){
		if(this.isAdminActive){
			console.log('open file prompt');
		}
		else{
			this.prepareAnimation = true;
			this.timerSub = Observable.timer(50).subscribe(() => {
				this.fireAnimation = true;
				this.itemClickedEvent.emit(this.post);
			});
		}		
	}
	animationDone($event: AnimationTransitionEvent){

		if($event.fromState !== 'void'){
			this.prepareAnimation = false;
			this.itemAnimationDoneEvent.emit($event);
		}

	}

	fadeDone($event: AnimationTransitionEvent){
		if($event.fromState !== 'void'){
			this.prepareAnimation = false;
		}
	}

	ngOnDestroy(){
		if(this.timerSub){
			this.timerSub.unsubscribe();
		}
		if(this.timerSub2){
			this.timerSub2.unsubscribe();
		}
	}
	
}

