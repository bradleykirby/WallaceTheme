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
import * as siteActions from '../site-data/site-data.actions';


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
	showEditPostMenu: boolean = false;
	adminIcon = 'thin-x';
	flash = 'off';
	flashGreen = 'off';
	previewImgRep: string;
	localFile: File;
	IMAGE_VALIDATION_ERROR: string = 'Invalid File Type. Please use an image with extention: jpg, jpeg, png, gif, or ico';
	IMAGE_UPLOAD_ERROR: string = 'Image Upload Failed. Check your Internet connection. If error persists, try using the regular wp-admin dashboard';
	IMAGE_ASSOCIATE_ERROR: string = "Image uploaded successfully, but failed to attach to post. If error persists, try using the regular wp-admin dashboard";

	constructor(private ds: DomSanitizer, private _ngZone: NgZone, private store: Store<AppState>, private changeRef: ChangeDetectorRef){
		
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
		if(this.post.editing.active){
			this.showEditPostMenu = true;
		}

	}

	ngOnChanges(){
		if(this.post.editing.target === 'FEATURED_IMAGE_ACTION'){
			this.adminIcon = 'gear';
		}
		else if(this.post.editing.target === 'FEATURED_IMAGE_PREVIEW'){
			this.adminIcon = 'eye';
		}
		else if(this.post.editing.target === 'FEATURED_IMAGE_UPLOAD'){
			this.adminIcon = 'cloud';
		}
		else if(this.post.editing.target ==='FEATURED_IMAGE_ERROR'){
			this.adminIcon = 'error';
        	this.flash = 'on-red';
        	if(this.post.editing.error === 'UPLOAD_FAILED'){
				this.post.editing.error = this.IMAGE_UPLOAD_ERROR;
			}
			else if(this.post.editing.error === "ASSOCIATE_FAILED"){
				this.post.editing.error = this.IMAGE_ASSOCIATE_ERROR;
			}
		}
			
		
		if(this.post.editing.active){
			this.showEditPostMenu = true;
		}
		else{
			this.showEditPostMenu = false;
			this.adminIcon = 'thin-x';
		}
	}

	postImageUrl(){
		if(this.post.newImageURL === 'null' || !this.adminState.adminMode || !this.showEditPostMenu){
			return this.post.featured == true ? this.post.imageURLHiRes : this.post.imageURLLowRes;
		}
		else{
			return this.post.newImageURL;
		}

	}

	calcProgressTransform(){
		switch(this.post.newImageUploadProgress){
			case 0: {return '0'}
			case 0.3: {return '1'}
			case 0.7: {return '2'}
			case 1: {return '3'}
			default: {return '0'}
		}
	}

	progressSlideDone($event: AnimationTransitionEvent){
		if($event.toState === '3'){
			console.log('progress complete');
			var newImage = new Image();
			newImage.onload = (() => {
				console.log(this);
				this.flash = 'on-white';
				this.flashGreen = 'on';
	        	this.changeRef.markForCheck();
				
			});
			if(this.post.featured){
				newImage.src = this.post.newImageSources.hiRes;
			}
			else{
				newImage.src = this.post.newImageSources.loRes;
			}

			

		}
	}

	flashGreenDone($event: AnimationTransitionEvent){
		if($event.toState === 'on'){

			this.flashGreen = 'off';
			this.store.dispatch(new postActions.ShowEditPostMenuAction({postId: this.post.id, editing: {active: false, target: 'null', error: ''}}));
			this.store.dispatch(new postActions.UpdateFeaturedImageRef(this.post.id));

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
			let editingTarget = this.post.editing.target === 'null'? 'FEATURED_IMAGE_ACTION' : this.post.editing.target;
			let editingActive = !this.post.editing.active;
			this.store.dispatch(new postActions.ShowEditPostMenuAction({postId: this.post.id, editing: {active: editingActive, target: editingTarget, error: ''}}));
		}
		else{
			this.prepareAnimation = true;
			this.timerSub = Observable.timer(50).subscribe(() => {
		console.log('click');
				
				this.fireAnimation = true;
				this.itemClickedEvent.emit(this.post);
			});
		}		
	}

	activateFilePicker(){
		this.filePicker.nativeElement.value = null;
		this.filePicker.nativeElement.click();
	}

	startImageUpload(){
		this.store.dispatch(new postActions.ShowEditPostMenuAction({postId: this.post.id, editing: {active: true, target: 'FEATURED_IMAGE_UPLOAD', error: ''}}));
    	this.store.dispatch(new postActions.UploadFeaturedImageAction({postId: this.post.id, file: this.localFile}));
    	// setTimeout(() => {
    	// 	// this.changeRef.markForCheck();
    	// }, 1000);

	}

	cancelPreview(){
		this.store.dispatch(new postActions.ShowEditPostMenuAction({postId: this.post.id, editing: {active: true, target: 'FEATURED_IMAGE_ACTION', error: ''}}));
    	this.store.dispatch(new postActions.DisplayImagePreviewAction({postId: this.post.id, imgUrl: 'null'}));
    	this.flash = 'off';

	}

	previewNewImage(fileInput: any){
		var acceptedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'ico'];

		if (fileInput.target.files && fileInput.target.files[0]) {

			var file = fileInput.target.files[0];
			this.localFile = file;
			var extension = fileInput.target.files[0].name.split('.').pop().toLowerCase();  //file extension from input file
            var acceptable = acceptedFileTypes.indexOf(extension) > -1;

		   if(acceptable){
		        var reader = new FileReader();
		        reader.onload = (e:any) => {
		        	this.previewImgRep = e.target.result;
		        	this.flash = 'on-white';
		        	this.changeRef.markForCheck();
	        	}
		        reader.readAsDataURL(fileInput.target.files[0]);
		   }
		   else{
		   	console.log('invalid file type');
		   	this.store.dispatch(new postActions.ShowEditPostMenuAction(
				{postId: this.post.id, editing: {active: true, target: 'FEATURED_IMAGE_ERROR', error: this.IMAGE_VALIDATION_ERROR}}
				));

		   }
	        
    	}
	}

	onFlash(event){
		if(event.toState === 'on-white'){

			if(this.post.editing.target != 'FEATURED_IMAGE_ACTION'){


				this.flash = 'off';
	        	this.changeRef.markForCheck();

			}
			else{
	        	this.store.dispatch(new postActions.DisplayImagePreviewAction({postId: this.post.id, imgUrl: this.previewImgRep}));
				this.store.dispatch(new postActions.ShowEditPostMenuAction(
					{postId: this.post.id, editing: {active: true, target: 'FEATURED_IMAGE_PREVIEW', error: ''}}
					));
				this.flash = 'off';
	        	
	        	this.changeRef.markForCheck();
			}
        	
		}
		else if(event.toState ==='off'){
			
		}
	}
	showAdminActionMenu(){
		if(this.adminState.adminMode && (this.showEditPostMenu)){
			return true;
		}
		else{
			return false;
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
		console.log(this.post.id + ' destroyed');
		if(this.timerSub){
			this.timerSub.unsubscribe();
		}
		if(this.timerSub2){
			this.timerSub2.unsubscribe();
		}
	}
	
}

