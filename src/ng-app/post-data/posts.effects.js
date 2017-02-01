var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as postActions from './posts.actions';
import * as siteData from '../site-data/site-data.actions';
import { PostService } from './posts.service';
import { PostViewComponent } from '../views/post.view';
var initialPosts = walInitialState.posts;
var PostEffects = (function () {
    function PostEffects(actions$, postService) {
        var _this = this;
        this.actions$ = actions$;
        this.postService = postService;
        this.loadPostPreviews$ = this.actions$
            .ofType(postActions.ActionTypes.LOAD_POST_PREVIEWS)
            .map(function (action) { return action.payload; })
            .mergeMap(function (options) {
            return _this.postService.loadPostPreviews(options.apiPage, options.getFeatured)
                .map(function (posts) {
                if (posts.length < 1) {
                    return new postActions.AllPostsLoadedAction();
                }
                else {
                    return new postActions.LoadPostPreviewsCompleteAction(posts);
                }
            });
        });
        this.loadPostPreviewsComplete$ = this.actions$
            .ofType(postActions.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE)
            .startWith(new postActions.LoadPostPreviewsCompleteAction(initialPosts))
            .map(function (action) {
            var posts = action.payload;
            var routes = posts.map(function (post) {
                return Object.assign({}, {
                    path: post.path,
                    component: PostViewComponent
                });
            });
            return new siteData.AddRoutesAction(routes);
        });
        this.selectPost = this.actions$
            .ofType(postActions.ActionTypes.SELECT_POST)
            .map(function (action) { return action.payload; })
            .mergeMap(function (post) {
            if (post.contentLoaded) {
                return Observable.of(new postActions.LoadPostContentAction({ id: post.id, content: post.content }));
            }
            else {
                return _this.postService.loadPostContent(post.id)
                    .map(function (content) {
                    return new postActions.LoadPostContentAction({ id: post.id, content: content });
                });
            }
        });
    }
    return PostEffects;
}());
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], PostEffects.prototype, "loadPostPreviews$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], PostEffects.prototype, "loadPostPreviewsComplete$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Observable)
], PostEffects.prototype, "selectPost", void 0);
PostEffects = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Actions, PostService])
], PostEffects);
export { PostEffects };
//# sourceMappingURL=posts.effects.js.map