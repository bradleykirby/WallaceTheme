import { Action } from '@ngrx/store';
import { type } from '../app.util';
import { Route } from '@angular/router';


export const ActionTypes = {
  EDIT_TITLE:   type('[SiteData] Edit Title'),
  ADD_ROUTES: 	type('[SiteData] Add Routes')
};


export class EditSiteTitleAction implements Action {
  type = ActionTypes.EDIT_TITLE;
  constructor(public payload:null = null){}
}

export class AddRoutesAction implements Action {
	type = ActionTypes.ADD_ROUTES;
	constructor(public payload: Route[]){}
}


export type Actions
  = EditSiteTitleAction
  | AddRoutesAction;
