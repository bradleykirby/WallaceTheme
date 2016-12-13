import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Post, Posts} from '../post-data/posts.model';
import {RouterLink, Router} from '@angular/router';
import {animations} from './post-list.animations';

@Component({
	selector: 'wal-post-item',
	templateUrl: 'post-item.component.html',
	animations: animations,
	host: {
     '[@itemSelected]': 'selected'
   },
})

export class PostItemComponent{
	@Input() post: Post;
	@Output() itemClickedEvent = new EventEmitter<Post>();

	imgUrl: string;
	selected: boolean = false;

	postItemClick($event: Event){
		//prevent static href link from firing
		$event.preventDefault();
		this.selected = true;
		this.itemClickedEvent.emit(this.post);
	}
}

