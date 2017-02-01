var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as appSelectors from '../app.selectors';
import { animations } from './post.animations';
import * as siteDataActions from '../site-data/site-data.actions';
var PostViewComponent = (function () {
    function PostViewComponent(store, router, ds) {
        this.store = store;
        this.router = router;
        this.ds = ds;
        this.activeLocalAnimation$ = new Subject();
        this.subscriptions = [];
    }
    PostViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.animSub = this.store.let(appSelectors.getAnimationData).subscribe(function (animationData) {
            _this.activeTransitionAnimation = animationData.pageTransitionActive;
        });
        this.postSub = this.store.let(appSelectors.getSelectedPost).subscribe(function (selectedPost) {
            if ((!_this.activeTransitionAnimation) || _this.post == undefined) {
                _this.post = selectedPost;
                _this.safeTitle = _this.ds.bypassSecurityTrustHtml(_this.post.title);
                _this.safeContent = _this.ds.bypassSecurityTrustHtml(_this.post.content);
            }
            else {
                _this.animSub2 = _this.store.let(appSelectors.getAnimationData).subscribe(function (animationData) {
                    _this.activeTransitionAnimation = animationData.pageTransitionActive;
                    if (!_this.activeTransitionAnimation) {
                        _this.post = selectedPost;
                        _this.safeTitle = _this.ds.bypassSecurityTrustHtml(_this.post.title);
                        _this.safeContent = _this.ds.bypassSecurityTrustHtml(_this.post.content);
                    }
                });
            }
        });
        this.logoSrc$ = this.store.let(appSelectors.getSiteIconSrc);
        this.store.let(appSelectors.getPathToIndex).subscribe(function (_pathToIndex) {
            _this.pathToIndex = _pathToIndex;
        });
        if (this.activeTransitionAnimation) {
            this.fireAnimation = 'out';
        }
        else {
            this.fireAnimation = 'in';
        }
    };
    PostViewComponent.prototype.ngAfterViewInit = function () {
        if (this.activeTransitionAnimation) {
            window.scrollTo(0, 0);
            this.fireAnimation = 'in';
        }
    };
    PostViewComponent.prototype.goHome = function ($event) {
        $event.preventDefault();
        this.fireAnimation = 'out';
        this.store.dispatch(new siteDataActions.SetTransitionAction(true));
    };
    PostViewComponent.prototype.animationComplete = function ($event) {
        if ($event.fromState !== 'void') {
            if ($event.toState === 'in') {
                this.store.dispatch(new siteDataActions.SetTransitionAction(false));
            }
            else if ($event.toState === 'out') {
                this.router.navigateByUrl(this.pathToIndex);
            }
        }
    };
    PostViewComponent.prototype.ngOnDestroy = function () {
        this.postSub.unsubscribe();
        this.animSub.unsubscribe();
    };
    return PostViewComponent;
}());
PostViewComponent = __decorate([
    Component({
        selector: 'wal-post-view',
        templateUrl: 'post.view.html',
        animations: animations
    }),
    __metadata("design:paramtypes", [Store, Router, DomSanitizer])
], PostViewComponent);
export { PostViewComponent };
//# sourceMappingURL=post.view.js.map