import {Component, Input, Output, NgZone, EventEmitter, ChangeDetectorRef, SimpleChange, AnimationTransitionEvent} from '@angular/core';
import { Store } from '@ngrx/store';

import {AppState} from '../app.state';
import { animations } from './post-list.animations';

import * as siteDataActions from '../site-data/site-data.actions';

@Component({
	selector: 'wal-menu',
	templateUrl: 'menu.component.html',
	animations: animations
})

export class MenuComponent{
	
	@Input() menuIsVisible: boolean;
	@Input() menus: {id : number, parent: number, title: string}[];
	@Output() activatePageEvent = new EventEmitter<number>();
	
	private prepareAnimation: boolean = false;
	private fireTransition: string;

	constructor(private cd: ChangeDetectorRef, private store: Store<AppState>, private _ngZone: NgZone) { }
	
	ngOnInit(){
		this.fireTransition = 'out';
	}
	
	ngOnChanges(changes: {[propKey: string]: SimpleChange}){
		if (typeof changes['menuIsVisible'] !== "undefined" && !changes['menuIsVisible'].isFirstChange()) {

			this.prepareAnimation = true;
			this.fireTransition = changes['menuIsVisible']['currentValue'] ? 'in' : 'out';
		}
	}
	
	handleItemClick(id: number){
		this.activatePageEvent.emit(id);
	}
	
	handleTransitionDone($event: AnimationTransitionEvent){ }
}