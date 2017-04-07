import 'rxjs/add/operator/let';
import {WPAPI} from './vendor';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, Route} from '@angular/router'; 
import { Store } from '@ngrx/store';

import * as appSelectors from './app.selectors';
import * as postActions from './post-data/posts.actions';
import * as siteActions from './site-data/site-data.actions';
import { AppState } from './app.state';
import { SiteDataService } from './site-data/site-data.service';
import { animations } from './app.animations';

@Component({
  selector: 'wallace',
  animations: animations,

  //changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div id='admin-button-container' *ngIf='isAdmin'>
	  <button 
	  	 [style.background-color]="adminButtonBackground" 
	  	(click)='toggleAdmin()' id='admin-button'>
	  		{{adminButtonMessage}}
	  		
	  </button>
	  <button id='customize-button' *ngIf='adminModeActive' [@simpleSlide]='true'>
		  <svg class="customize-container">
		      <use xlink:href="#customize"></use>
		  </svg>
	  </button>
</div>

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
			// this.adminModeActive = siteData.adminModeActive;
			// console.log(this.adminModeActive);
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
