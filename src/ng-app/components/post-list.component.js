var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, ViewChild, ElementRef, NgZone, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { animations } from './post-list.animations';
import * as siteDataActions from '../site-data/site-data.actions';
import * as appSelectors from '../app.selectors';
var PostListComponent = (function () {
    function PostListComponent(cd, store, _ngZone) {
        var _this = this;
        this.cd = cd;
        this.store = store;
        this._ngZone = _ngZone;
        this.endOfListReachedEvent = new EventEmitter();
        this.activatePostPreviewEvent = new EventEmitter();
        this.prepareAnimation = false;
        this.animSub = store.let(appSelectors.getAnimationData).subscribe(function (data) {
            _this.activeTransitionAnimation = data.pageTransitionActive;
        });
    }
    PostListComponent.prototype.ngOnInit = function () {
        if (this.activeTransitionAnimation) {
            this.fireTransition = 'out';
        }
        else {
            this.fireTransition = 'in';
        }
    };
    PostListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.activeTransitionAnimation) {
            this.fireTransition = 'in';
        }
        this._ngZone.runOutsideAngular(function () {
            _this.timer = Observable.timer(0, 500);
            _this.scrollCheck = _this.timer.subscribe(function () {
                var viewportTop = window.pageYOffset;
                var viewportBottom = window.innerHeight + viewportTop;
                if (_this.postLoadStatus.nativeElement.offsetTop < viewportBottom) {
                    _this._ngZone.run(function () {
                        _this.endOfListReachedEvent.emit();
                    });
                }
            });
        });
    };
    PostListComponent.prototype.handleItemClick = function (selectedPost) {
        this.cd.detach();
        //for this component
        this.store.dispatch(new siteDataActions.AddBlockingAnimationAction());
        //for child component
        this.store.dispatch(new siteDataActions.AddBlockingAnimationAction());
        this.fireTransition = 'out';
        this.cd.detectChanges();
        this.activatePostPreviewEvent.emit(selectedPost);
    };
    PostListComponent.prototype.handleTransitionDone = function ($event) {
        if ($event.fromState !== 'void') {
            if ($event.toState === 'out') {
                this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction());
            }
        }
    };
    PostListComponent.prototype.handleItemAnimationDone = function ($event) {
        if ($event.fromState !== 'void') {
            this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction());
        }
    };
    PostListComponent.prototype.ngOnDestroy = function () {
        this.animSub.unsubscribe();
        this.scrollCheck.unsubscribe();
    };
    return PostListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], PostListComponent.prototype, "posts", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PostListComponent.prototype, "allPreviewsLoaded", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PostListComponent.prototype, "postsLoading", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PostListComponent.prototype, "endOfListReachedEvent", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PostListComponent.prototype, "activatePostPreviewEvent", void 0);
__decorate([
    ViewChild('postLoadStatus'),
    __metadata("design:type", ElementRef)
], PostListComponent.prototype, "postLoadStatus", void 0);
PostListComponent = __decorate([
    Component({
        selector: 'wal-post-list',
        templateUrl: 'post-list.component.html',
        animations: animations,
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, Store, NgZone])
], PostListComponent);
export { PostListComponent };
//# sourceMappingURL=post-list.component.js.map