var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { animations } from './post-list.animations';
var PostItemComponent = (function () {
    function PostItemComponent(ds, _ngZone) {
        this.ds = ds;
        this._ngZone = _ngZone;
        this.itemClickedEvent = new EventEmitter();
        this.itemAnimationDoneEvent = new EventEmitter();
    }
    PostItemComponent.prototype.ngOnInit = function () {
        this.fireAnimation = false;
        this.prepareAnimation = false;
        this.safeTitle = this.ds.bypassSecurityTrustHtml(this.post.title);
        this.safeExcerpt = this.ds.bypassSecurityTrustHtml(this.post.excerpt);
        this.safeCategoryTag = this.ds.bypassSecurityTrustHtml(this.post.categoryString);
        if (this.post.loadedAfterBootstrap) {
            this.fade = 'out';
            this.prepareAnimation = true;
        }
        else {
            this.fade = 'in';
        }
    };
    PostItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.post.loadedAfterBootstrap) {
            this.timerSub2 = Observable.timer(50).subscribe(function () {
                _this.fade = 'in';
            });
        }
    };
    // ngOnChanges(){
    // 	console.log(this.fireAnimation);
    // }
    PostItemComponent.prototype.postItemClick = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.prepareAnimation = true;
        this.timerSub = Observable.timer(50).subscribe(function () {
            _this.fireAnimation = true;
            _this.itemClickedEvent.emit(_this.post);
        });
    };
    PostItemComponent.prototype.animationDone = function ($event) {
        if ($event.fromState !== 'void') {
            this.prepareAnimation = false;
            this.itemAnimationDoneEvent.emit($event);
        }
    };
    PostItemComponent.prototype.fadeDone = function ($event) {
        if ($event.fromState !== 'void') {
            this.prepareAnimation = false;
        }
    };
    PostItemComponent.prototype.ngOnDestroy = function () {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
        if (this.timerSub2) {
            this.timerSub2.unsubscribe();
        }
    };
    return PostItemComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PostItemComponent.prototype, "post", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PostItemComponent.prototype, "itemClickedEvent", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PostItemComponent.prototype, "itemAnimationDoneEvent", void 0);
PostItemComponent = __decorate([
    Component({
        selector: 'wal-post-item',
        templateUrl: 'post-item.component.html',
        animations: animations,
        host: {
            '[@itemSelected]': 'fireAnimation',
            '(@itemSelected.done)': "animationDone($event)",
            '[@fadeOut]': 'fade',
            '(@fadeOut.done)': 'fadeDone($event)',
            '[class.change-opacity-transform]': 'prepareAnimation'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [DomSanitizer, NgZone])
], PostItemComponent);
export { PostItemComponent };
//# sourceMappingURL=post-item.component.js.map