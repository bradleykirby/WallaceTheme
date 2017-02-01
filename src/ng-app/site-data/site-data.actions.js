import { type } from '../app.util';
export var ActionTypes = {
    EDIT_TITLE: type('[SiteData] Edit Title'),
    ADD_ROUTES: type('[SiteData] Add Routes'),
    ADD_ANIMATION: type('[Animation] Add Animation'),
    REMOVE_ANIMATION: type('[Animation] Remove Animation'),
    SET_TRANSITION: type('[Animation] Set Animation Transition State'),
    SET_ADMIN: type('[SiteData] Set Admin Mode')
};
var EditSiteTitleAction = (function () {
    function EditSiteTitleAction(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = ActionTypes.EDIT_TITLE;
    }
    return EditSiteTitleAction;
}());
export { EditSiteTitleAction };
var AddRoutesAction = (function () {
    function AddRoutesAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.ADD_ROUTES;
    }
    return AddRoutesAction;
}());
export { AddRoutesAction };
var AddBlockingAnimationAction = (function () {
    function AddBlockingAnimationAction() {
        this.type = ActionTypes.ADD_ANIMATION;
    }
    return AddBlockingAnimationAction;
}());
export { AddBlockingAnimationAction };
var RemoveBlockingAnimationAction = (function () {
    function RemoveBlockingAnimationAction() {
        this.type = ActionTypes.REMOVE_ANIMATION;
    }
    return RemoveBlockingAnimationAction;
}());
export { RemoveBlockingAnimationAction };
var SetTransitionAction = (function () {
    function SetTransitionAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.SET_TRANSITION;
    }
    return SetTransitionAction;
}());
export { SetTransitionAction };
var SetAdminModeAction = (function () {
    function SetAdminModeAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.SET_ADMIN;
    }
    return SetAdminModeAction;
}());
export { SetAdminModeAction };
//# sourceMappingURL=site-data.actions.js.map