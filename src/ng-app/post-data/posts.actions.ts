import { Action } from '@ngrx/store';
import { type } from '../app.util';
import { Post } from './posts.model';

export const ActionTypes = {
  SELECT_POST:   type('[Posts] Select Post'),
  LOAD_POST_PREVIEWS: type('[Posts] Load Posts'), 
  LOAD_POST_PREVIEWS_COMPLETE: type('[Posts] Load Posts Complete') ,
  ALL_POST_PREVIEWS_LOADED: type('[Posts] All Posts Loaded'),
  LOAD_POST_CONTENT: type('[Posts] Load Post Content'),
  DISPLAY_IMAGE_PREVIEW: type('[Posts] Preview New Featured Image'),
  SHOW_EDIT_MENU: type('[Posts] Show Edit Post Menu'),
  UPLOAD_FEATURED_IMAGE: type('[Posts] Upload Featured Image'),
  UPLOAD_FEATURED_IMAGE_FAILED: type('[Posts] Upload Featured Image Failed'),
  UPLOAD_FEATURED_IMAGE_COMPLETE: type('[Posts] Upload Featured Image Complete'),
  ASSOCIATE_FEATURED_IMAGE_FAILED: type('[Posts] Associate Featured Image Complete'),
  ASSOCIATE_FEATURED_IMAGE_COMPLETE: type('[Posts] Associate Featured Image Failed'),
  UPDATE_FEATURED_IMAGE_REF: type('[Posts] Update Source References to Featured Image')
};


export class SelectPostAction implements Action {
  type = ActionTypes.SELECT_POST;
  constructor(public payload: Post){}
}

export class LoadPostPreviewsAction implements Action {
	type = ActionTypes.LOAD_POST_PREVIEWS;
	constructor(public payload: {apiPage: number, getFeatured: boolean}) {}
}

export class LoadPostPreviewsCompleteAction implements Action {
	type = ActionTypes.LOAD_POST_PREVIEWS_COMPLETE;
	constructor(public payload: Post[]) {}
}

export class AllPostsLoadedAction implements Action {
  type = ActionTypes.ALL_POST_PREVIEWS_LOADED;
  constructor(public payload:null = null){}
  
}

export class LoadPostContentAction implements Action {
  type = ActionTypes.LOAD_POST_CONTENT;
  constructor(public payload: {id: string, content: string}) {}
}

export class DisplayImagePreviewAction implements Action {
  type = ActionTypes.DISPLAY_IMAGE_PREVIEW;
  constructor(public payload: {postId: string, imgUrl: string}){}
}

export class ShowEditPostMenuAction implements Action {
  type = ActionTypes.SHOW_EDIT_MENU;
  constructor(public payload: {postId: string, editing: {active: boolean, target: string, error: string}}){}
}

export class UploadFeaturedImageAction implements Action {
  type = ActionTypes.UPLOAD_FEATURED_IMAGE;
  constructor(public payload: {postId: string, file: File}){}
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
  constructor(public payload: {postId: string, mediaSources: {id: string, loRes: string, hiRes: string}}){}
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
  = SelectPostAction
  | LoadPostPreviewsAction
  | LoadPostPreviewsCompleteAction
  | AllPostsLoadedAction
  | LoadPostContentAction
  | DisplayImagePreviewAction
  | ShowEditPostMenuAction
  | UploadFeaturedImageAction
  | UploadFeaturedImageFailedAction
  | UploadFeaturedImageCompleteAction
  | AssociateFeaturedImageFailedAction
  | AssociateFeaturedImageCompleteAction
  | UpdateFeaturedImageRef;
