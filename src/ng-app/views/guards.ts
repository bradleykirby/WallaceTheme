import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { HomeViewComponent } from './home.view';
import { PostViewComponent } from './post.view';
import * as postActions from '../post-data/posts.actions';

export class CanDeactivateHomeGuard implements CanDeactivate<HomeViewComponent> {
	canDeactivate(homeView: HomeViewComponent){

		// var header = homeView.elemRef.nativeElement.children[0];
		// //lock viewport
		// var scrollPos = window.scrollY;
		// homeView.elemRef.nativeElement.style.position = 'fixed';
		// homeView.elemRef.nativeElement.style.top = '-'+scrollPos.toString()+'px';

		// console.log('guard');
		// var deactivateDelay = 0;
		// var postListAnimating = false;
		// homeView.postListAnimating$.subscribe( (val) => {
		// 	console.log(val);
		// 	postListAnimating = val;
		// });
		// if(postListAnimating){
		// 	deactivateDelay = 600;
		// 	if(window.innerWidth > 1150){
		// 		deactivateDelay = 800;
		// 	}
		// }
		
		// return new Promise( (resolve, reject) => {
		// 	var headerAnimation = header.animate({opacity: [1, 0]}, {duration: deactivateDelay/2});
		// 	header.style.setProperty('opacity', 0);
		// 	setTimeout( () => {
		// 		homeView.animationOver();
		// 		resolve(true);
		// 	}, deactivateDelay);	
		// });

		return true;
	}
}

export class CanDeactivatePostGuard implements CanDeactivate<PostViewComponent> {
	canDeactivate(postView: PostViewComponent){
		// var header = homeView.elemRef.nativeElement.children[0];
		// //lock viewport
		// var scrollPos = window.scrollY;
		// homeView.elemRef.nativeElement.style.position = 'fixed';
		// homeView.elemRef.nativeElement.style.top = '-'+scrollPos.toString()+'px';

		// console.log('guard');
		// var deactivateDelay = 0;
		// var postListAnimating = false;
		// homeView.postListAnimating$.subscribe( (val) => {
		// 	console.log(val);
		// 	postListAnimating = val;
		// });
		// if(postListAnimating){
		// 	deactivateDelay = 600;
		// 	if(window.innerWidth > 1150){
		// 		deactivateDelay = 800;
		// 	}
		// }
		
		// return new Promise( (resolve, reject) => {
		// 	var headerAnimation = header.animate({opacity: [1, 0]}, {duration: deactivateDelay/2});
		// 	header.style.setProperty('opacity', 0);
		// 	setTimeout( () => {
		// 		homeView.animationOver();
		// 		resolve(true);
		// 	}, deactivateDelay);	
		// });

		return true;
	}
}