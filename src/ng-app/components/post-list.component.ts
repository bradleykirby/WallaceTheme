import {Component, Input, Output, ViewChild, ElementRef, 
	EventEmitter,  trigger, state, style, transition, animate} from '@angular/core';
import {Post, Posts} from '../post-data/posts.model';
import {AppState} from '../app.state';
import {animations} from './post-list.animations';
@Component({
	selector: 'wal-post-list',
	templateUrl: 'post-list.component.html',
	animations: animations
})

export class PostListComponent{
	@Input() posts: Post[]; 
	@Input() allPreviewsLoaded: boolean;
	@Input() postsLoading: boolean;
	@Output() endOfListReachedEvent = new EventEmitter();
	@Output() activatePostPreviewEvent = new EventEmitter<Post>();
	@ViewChild('postLoadStatus') postLoadStatus: ElementRef;
	private timer: NodeJS.Timer;
	private timer2: NodeJS.Timer;
	private leave: boolean = false;
	private startup: boolean = false; 
	constructor() {}

	ngAfterViewInit(){

		this.timer = setInterval(() => {
			var viewportTop = window.pageYOffset;
			var viewportBottom = window.innerHeight + viewportTop;
			if (this.postLoadStatus.nativeElement.offsetTop < viewportBottom){	

				this.endOfListReachedEvent.emit();
			}
		}, 500);

		this.timer2 = setTimeout(() => {
			this.startup = true;
		}, 10);

	}

	handleItemClick(selectedPost: Post){
		this.leave = true;
		this.activatePostPreviewEvent.emit(selectedPost);
	}

	ngOnDestroy(){
		clearInterval(this.timer);
		clearTimeout(this.timer2);
	}
}