import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Post } from '../post-data/posts.model';
import {AppState} from '../app.state';
import * as appSelectors from '../app.selectors';
import {animations} from './post.animations';
@Component({
	selector: 'wal-post-view',
	templateUrl: 'post.view.html',
	animations: animations
})



export class PostViewComponent {
	post: Post;
	logoSrc$: Observable<string>;

	private timer: NodeJS.Timer;
	private startup: boolean;
	private toHome: boolean = false;
	constructor(private store: Store<AppState>, private router: Router){
		store.let(appSelectors.getSelectedPost).subscribe(selectedPost => {
			this.post = selectedPost;
		});
		this.logoSrc$ = store.let(appSelectors.getSiteIconSrc);

	}

	goHome($event: Event){
		$event.preventDefault();
		this.toHome = true;
		var t1 = setTimeout((t1) => {
			this.router.navigateByUrl('/');
			window.clearTimeout(t1);
		}, 500);
	}

	ngAfterViewInit(){
		window.scrollTo(0,0);
		var t2 = this.timer = setTimeout((t2) => {
			this.startup = true;
			window.clearTimeout(t2);
			
		}, 10);
	}
}