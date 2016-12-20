import { Action } from '@ngrx/store';
import { type } from '../app.util';
import { Route } from '@angular/router';


export const ActionTypes = {
  EDIT_TITLE:   type('[SiteData] Edit Title'),
  ADD_ROUTES: 	type('[SiteData] Add Routes'),
  ADD_ANIMATION: type('[Animation] Add Animation'),
  REMOVE_ANIMATION: type('[Animation] Remove Animation'),
  SET_TRANSITION: type('[Animation] Set Animation Transition State'),
};


export class EditSiteTitleAction implements Action {
  type = ActionTypes.EDIT_TITLE;
  constructor(public payload:null = null){}
}

export class AddRoutesAction implements Action {
	type = ActionTypes.ADD_ROUTES;
	constructor(public payload: Route[]){}
}

export class AddBlockingAnimationAction implements Action {
	type = ActionTypes.ADD_ANIMATION;
	constructor(){}
}

export class RemoveBlockingAnimationAction implements Action {
	type = ActionTypes.REMOVE_ANIMATION;
	constructor(){}
}

export class SetTransitionAction implements Action {
	type = ActionTypes.SET_TRANSITION;
	constructor(public payload: boolean){}
}





export type Actions
  = EditSiteTitleAction
  | AddRoutesAction
  | AddBlockingAnimationAction
  | RemoveBlockingAnimationAction
  | SetTransitionAction;
