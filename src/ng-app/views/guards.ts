import { Injectable } from '@angular/core';

import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { HomeViewComponent } from './home.view';
import { PostViewComponent } from './post.view';
import { PageViewComponent } from './page.view';
import * as postActions from '../post-data/posts.actions';
import * as pageActions from '../page-data/pages.actions';

import { Observable } from 'rxjs/Observable';
import * as appSelectors from '../app.selectors';

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

@Injectable ()
export class CanActivatePostGuard implements CanActivate {
	
	constructor (private store: Store<AppState>){ }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		let isPost:boolean = false;
		this.store.let(appSelectors.getPosts).subscribe(posts => {
			posts.forEach(post => {
				if ( state.url == '/'+post.path ){
					isPost = true;
				}
			})
		});
		
		return isPost;
	}
}

@Injectable ()
export class CanActivatePageGuard implements CanActivate {
	
	constructor (private store: Store<AppState>){ }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		let isPost:boolean = true;
		this.store.let(appSelectors.getPosts).subscribe(posts => {
			posts.forEach(post => {
				if ( state.url == '/'+post.path ){
					isPost = false;
				}
			})
		});
		
		return isPost;
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

export class CanDeactivatePageGuard implements CanDeactivate<PageViewComponent> {
	canDeactivate(pageView: PageViewComponent){
		// var header = homeView.elemRef.nativeElement.children[0];
		// //lock viewport
		// var scrollPos = window.scrollY;
		// homeView.elemRef.nativeElement.style.position = 'fixed';
		// homeView.elemRef.nativeElement.style.top = '-'+scrollPos.toString()+'px';

		// console.log('guard');
		// var deactivateDelay = 0;
		// var pageListAnimating = false;
		// homeView.pageListAnimating$.subscribe( (val) => {
		// 	console.log(val);
		// 	pageListAnimating = val;
		// });
		// if(pageListAnimating){
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