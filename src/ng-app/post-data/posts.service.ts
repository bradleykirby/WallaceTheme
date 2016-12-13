import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './posts.model';



@Injectable()
export class PostService{
	private POSTS_PATH: string = '/wp-json/wallace/v1/posts';
	constructor(private http: Http){}

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
		})
	}

	
}
