import 'rxjs/add/operator/let';
import {WPAPI} from './vendor';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, Route} from '@angular/router'; 
import { Store } from '@ngrx/store';

import * as appSelectors from './app.selectors';
import * as postActions from './post-data/posts.actions';
import * as siteActions from './site-data/site-data.actions';
import {AppState} from './app.state';
import { SiteDataService } from './site-data/site-data.service';

@Component({
  selector: 'wallace',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <button *ngIf='isAdmin' [style.background-color]="adminButtonBackground" (click)='toggleAdmin()' id='admin-button'>{{adminButtonMessage}}</button>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
	private isAdmin: boolean;
	private adminModeActive: boolean;
	private adminButtonMessage: string;
	private adminButtonBackground: string;

	constructor(private store: Store<AppState>, private router: Router, private cd: ChangeDetectorRef,
		private siteDataService: SiteDataService){
		
		store.let(appSelectors.getRoutes).subscribe(routes => {
			console.log(routes);
			router.resetConfig(routes);
		});

		store.let(appSelectors.getSiteDataState).subscribe(siteData => {
			this.isAdmin = siteData.isAdmin;
		});

		store.let(appSelectors.getSiteDataState).subscribe(siteData => {
			this.adminModeActive = siteData.adminModeActive;
			if(this.adminModeActive){
				this.adminButtonMessage = 'Admin Mode: On';
				this.adminButtonBackground = 'green';
			}
			else{
				this.adminButtonMessage = 'Admin Mode: Off';
				this.adminButtonBackground = '';

			}
		});
		
	}

	ngOnInit(){
		if(this.isAdmin){
			this.siteDataService.getUserName().subscribe( name => {
				console.log(name);
			});
		}
	}

	toggleAdmin(){

		this.store.dispatch(new siteActions.ToggleAdminAction(!this.adminModeActive));
	}
}
