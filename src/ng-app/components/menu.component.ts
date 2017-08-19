import {Component, Input, Output, NgZone, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';

import {AppState} from '../app.state';

@Component({
	selector: 'wal-menu',
	templateUrl: 'menu.component.html'
})

export class MenuComponent{

	@Input() menus: {id : number, parent: number, title: string}[];
	@Output() activatePageEvent = new EventEmitter<number>();

	constructor(private cd: ChangeDetectorRef, private store: Store<AppState>, private _ngZone: NgZone) { }
	
	handleItemClick(id: number){
		this.activatePageEvent.emit(id);
	}
}