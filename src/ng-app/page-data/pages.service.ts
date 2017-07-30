import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Page } from './pages.model';
import { AppService } from '../app.service';

declare var walInitialState: any;
var pathToIndex = walInitialState.site_data.pathToIndex === '/' ? '' : walInitialState.site_data.pathToIndex;
@Injectable()
export class PageService{
	private PAGES_PATH: string = walInitialState.site_data.pathToIndex + '/wp-json/wallace/v1/pages';

	wp: any;

	constructor(private appService: AppService, private http:Http){
		this.wp = this.appService.getApiInstance();
	}

	loadPagePreviews(apiPage: number, getFeaturedPage){
		var target:string;

		if(getFeaturedPage){
			target = `${this.PAGES_PATH}?page=${apiPage}&featured=true`;
		}
		else{
			target = `${this.PAGES_PATH}?page=${apiPage}`;
		}

		return this.http.get(target).map(res => {
			return res.json().pages;
		});	

	}

	loadPageContent(id: string){
		return this.http.get(`${this.PAGES_PATH}/${id}`).map(res => {
			return res.json().pages[0].content;
		});
	}

	uploadMedia(file: File){
		console.log(file);

		var uploadFilePromise = new Promise<{id: string, loRes: string, hiRes: string}>((resolve, reject) => {
				this.wp.media().file(file).create().then(resp => {
					console.log(resp);
					var mediaSources = {
						id: resp.id,
						loRes: resp.media_details.sizes.medium.source_url,
						hiRes: typeof resp.media_details.sizes.large === 'undefined' ? resp.media_details.sizes.medium.source_url: resp.media_details.sizes.large.source_url
					}
					resolve(mediaSources);
				}).catch(err => {
					console.log(typeof(err));
					reject(err);
				});
		});

		return Observable.from(uploadFilePromise);
			
	}

	associateMedia(pageId: string, mediaId: string){

		var associateMediaPromise = new Promise<string>((resolve, reject) => {
			this.wp.pages().id(pageId).update({
				featured_media: mediaId
			}).then(resp => {
				resolve(resp.id);
			}).catch(err => {
				reject(err);
			})
		});

		return Observable.from(associateMediaPromise);
	}

	testService1(){
		return Observable.of('1');
	}

	testService2(){
		var myFirstPromise = new Promise<string>(function(resolve, reject){
		    //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
		    //In this example, we use setTimeout(...) to simulate async code. 
		    //In reality, you will probabally using something like XHR or an HTML5 API.
		    setTimeout(function(){
		    	console.log('async resolve');
		        resolve('3'); //Yay! Everything went well!
		    }, 250);
		});

		return Observable.from(myFirstPromise);
	}

}
