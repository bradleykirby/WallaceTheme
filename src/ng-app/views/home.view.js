var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/let';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appSelectors from '../app.selectors';
import * as postActions from '../post-data/posts.actions';
import * as siteDataActions from '../site-data/site-data.actions';
import { animations } from './post.animations';
var HomeViewComponent = (function () {
    function HomeViewComponent(store, router, cd) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.cd = cd;
        this.subscriptions = [];
        this.posts$ = store.let(appSelectors.getPosts);
        this.logoSrc$ = store.let(appSelectors.getSiteIconSrc);
        this.siteTitle$ = store.let(appSelectors.getSiteTitle);
        this.postsLoading$ = store.let(appSelectors.getPostsLoading);
        this.allPreviewsLoaded$ = store.let(appSelectors.getAllPostPreviewsLoadedStatus);
        //this.selectedPostId$ = store.let(appSelectors.getSelectedPostId);
        this.subscriptions.push(this.store.let(appSelectors.getPostPreviewsLoadingStatus).subscribe(function (status) {
            _this.loadingPostPreviews = status;
        }));
        this.subscriptions.push(store.let(appSelectors.getCurrentAPIPage).subscribe(function (page) {
            _this.currentAPIPage = page;
        }));
        this.subscriptions.push(this.allPreviewsLoaded$.subscribe(function (status) {
            _this.allPreviewsLoaded = status;
        }));
        this.subscriptions.push(store.let(appSelectors.getFeaturedPostLoaded).subscribe(function (loaded) {
            _this.featuredPostLoaded = loaded;
        }));
        this.subscriptions.push(store.let(appSelectors.getPostEntities).subscribe(function (entities) {
            _this.postEntities = entities;
        }));
        this.subscriptions.push(store.let(appSelectors.getAnimationData).subscribe(function (data) {
            _this.activeTransitionAnimation = data.pageTransitionActive;
        }));
    }
    HomeViewComponent.prototype.ngOnInit = function () {
        if (this.activeTransitionAnimation) {
            this.fireTransition = 'out';
        }
        else {
            this.fireTransition = 'in';
        }
    };
    HomeViewComponent.prototype.ngAfterViewInit = function () {
        if (this.activeTransitionAnimation) {
            this.fireTransition = 'in';
        }
    };
    HomeViewComponent.prototype.endOfListReachedEvent = function () {
        if (!this.loadingPostPreviews && !this.allPreviewsLoaded) {
            this.store.dispatch(new postActions.LoadPostPreviewsAction({ apiPage: this.currentAPIPage, getFeatured: !this.featuredPostLoaded }));
        }
    };
    HomeViewComponent.prototype.navigateToPost = function (post) {
        var _this = this;
        this.store.dispatch(new siteDataActions.SetTransitionAction(true));
        this.store.dispatch(new postActions.SelectPostAction(post));
        this.fireTransition = 'out';
        this.store.dispatch(new siteDataActions.AddBlockingAnimationAction());
        this.subscriptions.push(this.store.let(appSelectors.getAnimationData).subscribe(function (data) {
            if (data.blockingAnimations === 0) {
                _this.router.navigateByUrl(post.path);
            }
        }));
    };
    HomeViewComponent.prototype.animationDone = function ($event) {
        if ($event.fromState !== 'void') {
            if ($event.toState === 'in') {
                this.store.dispatch(new siteDataActions.SetTransitionAction(false));
            }
            else if ($event.toState === 'out') {
                this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction());
            }
        }
    };
    HomeViewComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) {
            sub.unsubscribe();
        });
    };
    return HomeViewComponent;
}());
HomeViewComponent = __decorate([
    Component({
        selector: 'wal-home-view',
        templateUrl: 'home.view.html',
        animations: animations
    }),
    __metadata("design:paramtypes", [Store, Router, ChangeDetectorRef])
], HomeViewComponent);
export { HomeViewComponent };
//# sourceMappingURL=home.view.js.map