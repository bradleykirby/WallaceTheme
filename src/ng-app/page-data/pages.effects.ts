import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { of } from 'rxjs/observable/of';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Route } from '@angular/router';

import * as pageActions from './pages.actions';
import * as siteData from '../site-data/site-data.actions';
import { PageService } from './pages.service';
import { PageViewComponent } from '../views/page.view';
import { Page } from './pages.model';

declare const walInitialState: any;
const initialPages: Page[] = walInitialState.pages;

@Injectable()
export class PageEffects {
	constructor(private actions$: Actions, private pageService: PageService){}

	@Effect()
	loadPagePreviews$: Observable<Action> = this.actions$
		.ofType(pageActions.ActionTypes.LOAD_PAGE_PREVIEWS)
		.map((action: pageActions.LoadPagePreviewsAction) => action.payload)
		.mergeMap( options => {
			return this.pageService.loadPagePreviews(options.apiPage, options.getFeatured) 
				.map(pages => {
					if(pages.length < 1){
						return new pageActions.AllPagesLoadedAction();
					}
					else{
						return new pageActions.LoadPagePreviewsCompleteAction(pages);
					}
				})
	});

	@Effect()
	loadPagePreviewsComplete$: Observable<Action> = this.actions$
		.ofType(pageActions.ActionTypes.LOAD_PAGE_PREVIEWS_COMPLETE)
		.startWith( new pageActions.LoadPagePreviewsCompleteAction(initialPages))
		.map((action: pageActions.LoadPagePreviewsCompleteAction) => {
			const pages = action.payload;
			const routes = pages.map(page => {
				return Object.assign({}, {
					path: page.path,
					component: PageViewComponent
				})
			});
			return new siteData.AddRoutesAction(routes)
		});

	@Effect()
	selectPage: Observable<Action> = this.actions$
		.ofType(pageActions.ActionTypes.SELECT_PAGE)
		.map((action: pageActions.SelectPageAction) => action.payload)
		.mergeMap( page => {
			if(page.contentLoaded){
				return Observable.of(new pageActions.LoadPageContentAction({id: page.id, content: page.content}));
			}
			else{
				return this.pageService.loadPageContent(page.id)
					.map(content => {
						return new pageActions.LoadPageContentAction({id: page.id, content: content});
					})
			}
			
		});

	@Effect()
	uploadFeaturedImage$: Observable<Action> = this.actions$
		.ofType(pageActions.ActionTypes.UPLOAD_FEATURED_IMAGE)
		.map((action: pageActions.UploadFeaturedImageAction) => action.payload)
		.mergeMap( data => {
			return this.pageService.uploadMedia(data.file)
			.map(resp => {
				console.log(resp);
				return new pageActions.UploadFeaturedImageCompleteAction({pageId: data.pageId, mediaSources: resp});
			})
			.catch(err => {
				console.log(err);
				return of(new pageActions.UploadFeaturedImageFailedAction(data.pageId));
			})
		});

	@Effect()
	uploadFeaturedImageComplete$: Observable<Action> = this.actions$
		.ofType(pageActions.ActionTypes.UPLOAD_FEATURED_IMAGE_COMPLETE)
		.map((action: pageActions.UploadFeaturedImageCompleteAction) => action.payload)
		.mergeMap( data => {
			return this.pageService.associateMedia(data.pageId, data.mediaSources.id)
			.map(pageId => {
				console.log(pageId);
				return new pageActions.AssociateFeaturedImageCompleteAction(data.pageId);
			})
			.catch(err => {
				console.log(err);
				return of(new pageActions.AssociateFeaturedImageFailedAction(data.pageId));
			})
		});

		// .map(pages => new page.LoadPagePreviewsCompleteAction(pages));
}
