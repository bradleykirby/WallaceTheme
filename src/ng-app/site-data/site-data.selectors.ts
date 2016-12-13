import '@ngrx/core/add/operator/select';

import { Observable } from 'rxjs/Observable';
import {SiteData} from './site-data.model';
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