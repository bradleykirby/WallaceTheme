import { Action } from '@ngrx/store';
import { type } from '../app.util';
import { Page } from './pages.model';

export const ActionTypes = {
  SELECT_PAGE:   type('[Pages] Select Page'),
  LOAD_PAGE_PREVIEWS: type('[Pages] Load Pages'), 
  LOAD_PAGE_PREVIEWS_COMPLETE: type('[Pages] Load Pages Complete') ,
  ALL_PAGE_PREVIEWS_LOADED: type('[Pages] All Pages Loaded'),
  LOAD_PAGE_CONTENT: type('[Pages] Load Page Content'),
  DISPLAY_IMAGE_PREVIEW: type('[Pages] Preview New Featured Image'),
  SHOW_EDIT_MENU: type('[Pages] Show Edit Page Menu'),
  UPLOAD_FEATURED_IMAGE: type('[Pages] Upload Featured Image'),
  UPLOAD_FEATURED_IMAGE_FAILED: type('[Pages] Upload Featured Image Failed'),
  UPLOAD_FEATURED_IMAGE_COMPLETE: type('[Pages] Upload Featured Image Complete'),
  ASSOCIATE_FEATURED_IMAGE_FAILED: type('[Pages] Associate Featured Image Complete'),
  ASSOCIATE_FEATURED_IMAGE_COMPLETE: type('[Pages] Associate Featured Image Failed'),
  UPDATE_FEATURED_IMAGE_REF: type('[Pages] Update Source References to Featured Image')
};

export class SelectPageAction implements Action {
  type = ActionTypes.SELECT_PAGE;
  constructor(public payload: Page){}
}

export class LoadPagePreviewsAction implements Action {
	type = ActionTypes.LOAD_PAGE_PREVIEWS;
	constructor(public payload: {apiPage: number, getFeatured: boolean}) {}
}

export class LoadPagePreviewsCompleteAction implements Action {
	type = ActionTypes.LOAD_PAGE_PREVIEWS_COMPLETE;
	constructor(public payload: Page[]) {}
}

export class AllPagesLoadedAction implements Action {
  type = ActionTypes.ALL_PAGE_PREVIEWS_LOADED;
  constructor(public payload:null = null){}
  
}

export class LoadPageContentAction implements Action {
  type = ActionTypes.LOAD_PAGE_CONTENT;
  constructor(public payload: {id: string, content: string}) {}
}

export class DisplayImagePreviewAction implements Action {
  type = ActionTypes.DISPLAY_IMAGE_PREVIEW;
  constructor(public payload: {pageId: string, imgUrl: string}){}
}

export class ShowEditPageMenuAction implements Action {
  type = ActionTypes.SHOW_EDIT_MENU;
  constructor(public payload: {pageId: string, editing: {active: boolean, target: string, error: string}}){}
}

export class UploadFeaturedImageAction implements Action {
  type = ActionTypes.UPLOAD_FEATURED_IMAGE;
  constructor(public payload: {pageId: string, file: File}){}
}

export class UploadFeaturedImageFailedAction implements Action {
  type = ActionTypes.UPLOAD_FEATURED_IMAGE_FAILED;
  constructor(public payload: string){}
}

export class AssociateFeaturedImageFailedAction implements Action {
  type = ActionTypes.ASSOCIATE_FEATURED_IMAGE_FAILED;
  constructor(public payload: string){}
}

export class UploadFeaturedImageCompleteAction implements Action {
  type = ActionTypes.UPLOAD_FEATURED_IMAGE_COMPLETE;
  constructor(public payload: {pageId: string, mediaSources: {id: string, loRes: string, hiRes: string}}){}
}

export class AssociateFeaturedImageCompleteAction implements Action {
  type = ActionTypes.ASSOCIATE_FEATURED_IMAGE_COMPLETE;
  constructor(public payload: string){}
}

export class UpdateFeaturedImageRef implements Action {
  type = ActionTypes.UPDATE_FEATURED_IMAGE_REF;
  constructor(public payload: string){}
}

export type Actions
  = SelectPageAction
  | LoadPagePreviewsAction
  | LoadPagePreviewsCompleteAction
  | AllPagesLoadedAction
  | LoadPageContentAction
  | DisplayImagePreviewAction
  | ShowEditPageMenuAction
  | UploadFeaturedImageAction
  | UploadFeaturedImageFailedAction
  | UploadFeaturedImageCompleteAction
  | AssociateFeaturedImageFailedAction
  | AssociateFeaturedImageCompleteAction
  | UpdateFeaturedImageRef;
