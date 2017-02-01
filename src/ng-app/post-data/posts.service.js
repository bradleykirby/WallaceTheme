var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
var pathToIndex = walInitialState.site_data.pathToIndex === '/' ? '' : walInitialState.site_data.pathToIndex;
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.POSTS_PATH = walInitialState.site_data.pathToIndex + '/wp-json/wallace/v1/posts';
    }
    PostService.prototype.loadPostPreviews = function (apiPage, getFeaturedPost) {
        var target;
        if (getFeaturedPost) {
            target = this.POSTS_PATH + "?page=" + apiPage + "&featured=true";
        }
        else {
            target = this.POSTS_PATH + "?page=" + apiPage;
        }
        return this.http.get(target).map(function (res) {
            return res.json().posts;
        });
    };
    PostService.prototype.loadPostContent = function (id) {
        return this.http.get(this.POSTS_PATH + "/" + id).map(function (res) {
            return res.json().posts[0].content;
        });
    };
    return PostService;
}());
PostService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], PostService);
export { PostService };
//# sourceMappingURL=posts.service.js.map