import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, AnimationTransitionEvent} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';


import { Post, Posts } from '../post-data/posts.model';
import { RouterLink, Router } from '@angular/router';
import { animations } from './post-list.animations';
import * as postActions from '../post-data/posts.actions';

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
	@Input() adminState: {adminMode: boolean, editMode: boolean};
	@Output() itemClickedEvent = new EventEmitter<Post>();
	@Output() itemAnimationDoneEvent = new EventEmitter();
	@ViewChild('filePicker') filePicker: ElementRef;

	fireAnimation: boolean;
	prepareAnimation: boolean;
	safeTitle: SafeHtml;
	safeExcerpt: SafeHtml;
	safeCategoryTag: SafeHtml;
	timerSub: Subscription;
	timerSub2: Subscription;
	fade: string;


	constructor(private ds: DomSanitizer, private _ngZone: NgZone, private store: Store<AppState>){
		
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

	postImageUrl(){
		if(this.post.newImageURL === 'null' || !this.adminState.adminMode){
			return this.post.featured == true ? this.post.imageURLHiRes : this.post.imageURLLowRes;
		}
		else{
			return this.post.newImageURL;
		}

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
		if(this.adminState.adminMode){
			console.log('open file prompt');
			this.filePicker.nativeElement.click();
		}
		else{
			this.prepareAnimation = true;
			this.timerSub = Observable.timer(50).subscribe(() => {
				this.fireAnimation = true;
				this.itemClickedEvent.emit(this.post);
			});
		}		
	}

	previewNewImage(fileInput: any){
		if (fileInput.target.files && fileInput.target.files[0]) {

			var file = fileInput.target.files[0];
		    console.log(file);
		   

	        var reader = new FileReader();

	        reader.onload = (e:any) => {
	        	var imgRep: string;
	        	imgRep = e.target.result;
	        	this.store.dispatch(new postActions.DisplayImagePreviewAction({postId: this.post.id, imgUrl: imgRep}));
        	}
	        reader.readAsDataURL(fileInput.target.files[0]);

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

