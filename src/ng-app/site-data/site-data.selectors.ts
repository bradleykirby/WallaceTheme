import '@ngrx/core/add/operator/select';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { SiteData, AnimationData } from './site-data.model';
import { Route } from '@angular/router';

export function getSiteIconSrc(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.iconUrl);
}

export function getSiteTitle(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.title);
}

export function getRoutes(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.routes);
}

export function getAnimationData(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.animationData);
}

export function getPathToIndex(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.pathToIndex);
}

export function getAdminState(siteData$: Observable<SiteData>){
		
	var adminMode$ = siteData$.select(siteData => siteData.adminModeActive);
	var editMode$ = siteData$.select(siteData => siteData.editModeActive);
	return adminMode$.combineLatest(editMode$).map(([admin, edit]) => 
		Object.assign({}, 
			{adminMode: admin},
			{editMode: edit})
	);
		

}

export function getSiteMenus(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.menus);
}

export function getFrontPageId(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.frontPage);
}

export function getBlogPageId(siteData$: Observable<SiteData>){
	return siteData$.select(siteData => siteData.blogPage);
}