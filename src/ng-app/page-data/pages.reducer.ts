import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {AppState} from '../app.state';
import {Page, Pages} from './pages.model';
import * as pages from './pages.actions';
import { PageViewComponent } from '../views/page.view';

//from server-side php (index.php, single.php, page.php) 
//TODO: shard this into just initialSiteData
declare const walInitialState: any;
const initialPages: Page[] = walInitialState.pages;

const initialState: Pages = {
	ids: initialPages.map( page => page.id),
	entities: getPageEntitiesFromPageArray(initialPages),
	selectedPageId: walInitialState.selectedPageId,
	loadingPagePreviews: false,
	featuredPageLoaded: false,
	currentAPIPage: 1,
	allPagePreviewsLoaded: false,
	
}

export function reducer(state = initialState, action: pages.Actions): Pages {
	switch(action.type) {

		case pages.ActionTypes.SELECT_PAGE: {
			const page = <Page>action.payload;
			return Object.assign({}, state, {
				selectedPageId: page.id
			});
		}
		case pages.ActionTypes.LOAD_PAGE_PREVIEWS: {
			return Object.assign({}, state, {
		        loadingPagePreviews: true
	      	});
		}
		case pages.ActionTypes.LOAD_PAGE_PREVIEWS_COMPLETE: {

			const pages = <Page[]>action.payload;
			const newPages = pages.filter(page => !state.entities[page.id]).map(page => {
				return Object.assign({}, page, {loadedAfterBootstrap: true});
			});
			const featuredPageIncluded = pages.filter(page => page.featured).length > 0 ? true : false;
			const newPageIds = newPages.map(page => page.id);
			const newPageEntities = getPageEntitiesFromPageArray(newPages);
			return {
				ids: [...state.ids, ...newPageIds ],
				entities: Object.assign({}, state.entities, newPageEntities),
				selectedPageId: state.selectedPageId,
				loadingPagePreviews: false,
				featuredPageLoaded: state.featuredPageLoaded ? true : featuredPageIncluded,
				currentAPIPage: state.currentAPIPage + 1,
				allPagePreviewsLoaded: false
			};
		}
		case pages.ActionTypes.ALL_PAGE_PREVIEWS_LOADED: {
			return Object.assign({}, state, {
				loadingPagePreviews: false,
				allPagePreviewsLoaded: true
			});
		}
		case pages.ActionTypes.LOAD_PAGE_CONTENT: {
			const page = <Page>action.payload;
			const idOfPageToLoad = page.id;
			const content = page.content;
			const pageEntityToUpdate = state.entities[idOfPageToLoad];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {content: content, contentLoaded: true});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPageToLoad]: updatedPage
				})
			});
		}
		case pages.ActionTypes.DISPLAY_IMAGE_PREVIEW: {
			const payload = <{pageId: string, imgUrl: string}>action.payload;
			const idOfPage = payload.pageId;
			const newImgUrl = payload.imgUrl;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {newImageURL: newImgUrl});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}
		case pages.ActionTypes.SHOW_EDIT_MENU: {
			const payload = <{pageId: string, editing: {active: boolean, target: string}}>action.payload;
			const idOfPage = payload.pageId;
			const newEditingValue = payload.editing;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {editing: newEditingValue});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}
		case pages.ActionTypes.UPLOAD_FEATURED_IMAGE: {

			const payload = <{pageId: string, file: File}>action.payload;
			const idOfPage = payload.pageId;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {newImageUploadProgress: 0.3});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}

		case pages.ActionTypes.UPLOAD_FEATURED_IMAGE_FAILED: {

			const idOfPage = <string>action.payload;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {editing:{active: true, target: 'FEATURED_IMAGE_ERROR', error: "UPLOAD_FAILED"}, newImageUploadProgress: 0});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}
		case pages.ActionTypes.UPLOAD_FEATURED_IMAGE_COMPLETE: {

			const payload = <{pageId: string, mediaSources: {id: string, loRes: string, hiRes: string}}>action.payload;
			const idOfPage = payload.pageId;
			const pageEntityToUpdate = state.entities[idOfPage];
			const newVal = pageEntityToUpdate.newImageUploadProgress+0.1;
			const updatedPage = Object.assign({}, pageEntityToUpdate, {
				newImageUploadProgress: 0.7, 
				newImageSources: {loRes: payload.mediaSources.loRes, hiRes: payload.mediaSources.hiRes}
			});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}
		case pages.ActionTypes.ASSOCIATE_FEATURED_IMAGE_FAILED: {
			const idOfPage = <string>action.payload;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {editing:{active: true, target: 'FEATURED_IMAGE_ERROR', error: "ASSOCIATE_FAILED"}, newImageUploadProgress: 0});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}
		case pages.ActionTypes.ASSOCIATE_FEATURED_IMAGE_COMPLETE: {
			const idOfPage = <string>action.payload;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {newImageUploadProgress: 1});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}

		case pages.ActionTypes.UPDATE_FEATURED_IMAGE_REF: {
			const idOfPage = <string>action.payload;
			const pageEntityToUpdate = state.entities[idOfPage];
			const updatedPage = Object.assign({}, pageEntityToUpdate, {
				imageURLLowRes: pageEntityToUpdate.newImageSources.loRes,
				imageURLHiRes: pageEntityToUpdate.newImageSources.hiRes,
				newImageSources: {loRes: '', hiRes: ''},
				newImageUploadProgress: 0,
				newImageURL: 'null'
			});
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPage]: updatedPage
				})
			});
		}

		default: {
      		return state;
		}
	}
}


function getPageEntitiesFromPageArray(pages: Page[]){

	return pages.reduce((entities: { [id: string]: Page}, page: Page) => {
		return Object.assign(entities, {
			[page.id]: Object.assign({}, page, {newImageURL: 'null', 
				editing: {active: false, target: 'null', error: 'null'}, 
				newImageUploadProgress: 0, 
				newImageSources: {loRes: '', hiRes: ''}
			})
		});
	}, {});
}





