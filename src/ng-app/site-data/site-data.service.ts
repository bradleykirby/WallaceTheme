import { AppService } from '../app.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SiteDataService{
	wp: any;

	constructor(private appService: AppService){
		this.wp = this.appService.getApiInstance();
	}

	getUserName(){
		return Observable.from(this.wp.users().me().get().then(function(resp){
			return resp.name;
		}));
	}	
}

