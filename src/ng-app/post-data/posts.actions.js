import { type } from '../app.util';
export var ActionTypes = {
    SELECT_POST: type('[Posts] Select Post'),
    LOAD_POST_PREVIEWS: type('[Posts] Load Posts'),
    LOAD_POST_PREVIEWS_COMPLETE: type('[Posts] Load Posts Complete'),
    ALL_POST_PREVIEWS_LOADED: type('[Posts] All Posts Loaded'),
    LOAD_POST_CONTENT: type('[Posts} Load Post Content')
};
var SelectPostAction = (function () {
    function SelectPostAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.SELECT_POST;
    }
    return SelectPostAction;
}());
export { SelectPostAction };
var LoadPostPreviewsAction = (function () {
    function LoadPostPreviewsAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.LOAD_POST_PREVIEWS;
    }
    return LoadPostPreviewsAction;
}());
export { LoadPostPreviewsAction };
var LoadPostPreviewsCompleteAction = (function () {
    function LoadPostPreviewsCompleteAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.LOAD_POST_PREVIEWS_COMPLETE;
    }
    return LoadPostPreviewsCompleteAction;
}());
export { LoadPostPreviewsCompleteAction };
var AllPostsLoadedAction = (function () {
    function AllPostsLoadedAction(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = ActionTypes.ALL_POST_PREVIEWS_LOADED;
    }
    return AllPostsLoadedAction;
}());
export { AllPostsLoadedAction };
var LoadPostContentAction = (function () {
    function LoadPostContentAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.LOAD_POST_CONTENT;
    }
    return LoadPostContentAction;
}());
export { LoadPostContentAction };
//# sourceMappingURL=posts.actions.js.map