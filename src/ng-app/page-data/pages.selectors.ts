import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import '@ngrx/core/add/operator/select';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import {Page, Pages} from './pages.model';

export function getPageEntities(pages$: Observable<Pages>){
	return pages$.select(pages => pages.entities);
}

export function getPageIds(pages$: Observable<Pages>){
	return pages$.select(pages => pages.ids);
}

export function getPages(pages$: Observable<Pages>){
	return combineLatest<{ [id: string]: Page }, string[]>(
	  	pages$.let(getPageEntities),
	  	pages$.let(getPageIds)
  	)
    .map(([ entities, ids ]) => ids.map(id => entities[id]));
}

export function getSelectedPage(pages$: Observable<Pages>){
	return combineLatest<{ [id: string]: Page }, string>(
		pages$.let(getPageEntities),
  		pages$.let(getSelectedPageId)
	)
	.map(([ entities, id ]) => entities[id]);
}

export function getPagePreviewsLoadingStatus(pages$: Observable<Pages>){
	return pages$.select(pages => pages.loadingPagePreviews);
}

export function getCurrentAPIPage(pages$: Observable<Pages>){
	return pages$.select(pages => pages.currentAPIPage);
}

export function getAllPagePreviewsLoadedStatus(pages$: Observable<Pages>){
	return pages$.select(pages => pages.allPagePreviewsLoaded);
}

export function getSelectedPageId(pages$: Observable<Pages>){
	return pages$.select(pages => pages.selectedPageId);
}

export function getFeaturedPageLoaded(pages$: Observable<Pages>){
	return pages$.select(pages => pages.featuredPageLoaded);
}

export function getPagesLoading(pages$: Observable<Pages>){
	return pages$.select(pages => pages.loadingPagePreviews);
}

