import { AppService } from '../app.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SiteDataService{
	wp: any;

	constructor(private appService: AppService){
		this.wp = this.appService.getApiInstance();
	}

	isUserAdmin(){
		this.wp.users().me().update({}, (err, data) => {
			if (err){
				return false;
			}
			else{
				if(data.role.contains('administrator')){
					return true;
				}
				else{
					return false;
				}
			}
		});
	}
}

