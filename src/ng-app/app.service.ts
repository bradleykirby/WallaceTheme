import { Injectable } from '@angular/core';
import { WPAPI } from './vendor';
declare var window: any;

@Injectable()
export class AppService{

	getApiInstance(){
		if(window.WP_API_Settings.isAdmin){
			return new WPAPI({
				endpoint: window.WP_API_Settings.endpoint,
			    nonce: window.WP_API_Settings.nonce
			});
		}
		else{
			return new WPAPI({
				endpoint: window.WP_API_Settings.endpoint
			});
		}
		
	}
}