import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './posts.model';
import { AppService } from '../app.service';


declare var walInitialState: any;
var pathToIndex = walInitialState.site_data.pathToIndex === '/' ? '' : walInitialState.site_data.pathToIndex;
@Injectable()
export class PostService{
	private POSTS_PATH: string = walInitialState.site_data.pathToIndex + '/wp-json/wallace/v1/posts';

	wp: any;

	constructor(private appService: AppService, private http:Http){
		this.wp = this.appService.getApiInstance();
	}

	loadPostPreviews(apiPage: number, getFeaturedPost){
		var target:string;

		if(getFeaturedPost){
			target = `${this.POSTS_PATH}?page=${apiPage}&featured=true`;
		}
		else{
			target = `${this.POSTS_PATH}?page=${apiPage}`;
		}

		return this.http.get(target).map(res => {
			return res.json().posts;
			
		});	

	}

	loadPostContent(id: string){
		return this.http.get(`${this.POSTS_PATH}/${id}`).map(res => {
			return res.json().posts[0].content;
		});
	}

	uploadMedia(file: File){
		console.log(file);

		var uploadFilePromise = new Promise<string>((resolve, reject) => {
				this.wp.media().file('notafile').create().then(resp => {
					console.log(resp);
					resolve(resp.id);
				}).catch(err => {
					console.log(typeof(err));
					reject(err);
				});
		});

		return Observable.from(uploadFilePromise);
			
	}

	associateMedia(postId: string, mediaId: string){
		return Observable.fromPromise(<Promise<string>>this.wp.posts().id('-2').update({
            featured_media: mediaId
        }).then(resp => {
	    		console.log(resp);
	    		return resp.id;
        	
        }).catch(err => {
        	console.log(err);
        	return err;
        }));
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
