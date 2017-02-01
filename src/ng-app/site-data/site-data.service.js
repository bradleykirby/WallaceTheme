var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppService } from '../app.service';
import { Injectable } from '@angular/core';
var SiteDataService = (function () {
    function SiteDataService(appService) {
        this.appService = appService;
        this.wp = this.appService.getApiInstance();
    }
    SiteDataService.prototype.isUserAdmin = function () {
        this.wp.users().me().update({}, function (err, data) {
            if (err) {
                return false;
            }
            else {
                if (data.role.contains('administrator')) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    };
    return SiteDataService;
}());
SiteDataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppService])
], SiteDataService);
export { SiteDataService };
//# sourceMappingURL=site-data.service.js.map