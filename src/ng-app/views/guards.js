var CanDeactivateHomeGuard = (function () {
    function CanDeactivateHomeGuard() {
    }
    CanDeactivateHomeGuard.prototype.canDeactivate = function (homeView) {
        // var header = homeView.elemRef.nativeElement.children[0];
        // //lock viewport
        // var scrollPos = window.scrollY;
        // homeView.elemRef.nativeElement.style.position = 'fixed';
        // homeView.elemRef.nativeElement.style.top = '-'+scrollPos.toString()+'px';
        // console.log('guard');
        // var deactivateDelay = 0;
        // var postListAnimating = false;
        // homeView.postListAnimating$.subscribe( (val) => {
        // 	console.log(val);
        // 	postListAnimating = val;
        // });
        // if(postListAnimating){
        // 	deactivateDelay = 600;
        // 	if(window.innerWidth > 1150){
        // 		deactivateDelay = 800;
        // 	}
        // }
        // return new Promise( (resolve, reject) => {
        // 	var headerAnimation = header.animate({opacity: [1, 0]}, {duration: deactivateDelay/2});
        // 	header.style.setProperty('opacity', 0);
        // 	setTimeout( () => {
        // 		homeView.animationOver();
        // 		resolve(true);
        // 	}, deactivateDelay);	
        // });
        return true;
    };
    return CanDeactivateHomeGuard;
}());
export { CanDeactivateHomeGuard };
var CanDeactivatePostGuard = (function () {
    function CanDeactivatePostGuard() {
    }
    CanDeactivatePostGuard.prototype.canDeactivate = function (postView) {
        // var header = homeView.elemRef.nativeElement.children[0];
        // //lock viewport
        // var scrollPos = window.scrollY;
        // homeView.elemRef.nativeElement.style.position = 'fixed';
        // homeView.elemRef.nativeElement.style.top = '-'+scrollPos.toString()+'px';
        // console.log('guard');
        // var deactivateDelay = 0;
        // var postListAnimating = false;
        // homeView.postListAnimating$.subscribe( (val) => {
        // 	console.log(val);
        // 	postListAnimating = val;
        // });
        // if(postListAnimating){
        // 	deactivateDelay = 600;
        // 	if(window.innerWidth > 1150){
        // 		deactivateDelay = 800;
        // 	}
        // }
        // return new Promise( (resolve, reject) => {
        // 	var headerAnimation = header.animate({opacity: [1, 0]}, {duration: deactivateDelay/2});
        // 	header.style.setProperty('opacity', 0);
        // 	setTimeout( () => {
        // 		homeView.animationOver();
        // 		resolve(true);
        // 	}, deactivateDelay);	
        // });
        return true;
    };
    return CanDeactivatePostGuard;
}());
export { CanDeactivatePostGuard };
//# sourceMappingURL=guards.js.map