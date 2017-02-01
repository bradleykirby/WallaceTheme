import '@ngrx/core/add/operator/select';
import * as siteData from './site-data.actions';
import { initialRoutes } from '../app.routes';
var initialState = {
    title: walInitialState.site_data.title,
    iconUrl: walInitialState.site_data.iconUrl,
    routes: initialRoutes,
    animationData: {
        pageTransitionActive: false,
        blockingAnimations: 0
    },
    pathToIndex: walInitialState.site_data.pathToIndex,
    isAdmin: window.WP_API_Settings.isAdmin,
    adminMode: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case siteData.ActionTypes.ADD_ROUTES: {
            return Object.assign({}, state, {
                routes: state.routes.concat(action.payload)
            });
        }
        case siteData.ActionTypes.ADD_ANIMATION: {
            return Object.assign({}, state, {
                animationData: {
                    blockingAnimations: state.animationData.blockingAnimations + 1,
                    pageTransitionActive: state.animationData.pageTransitionActive
                }
            });
        }
        case siteData.ActionTypes.REMOVE_ANIMATION: {
            return Object.assign({}, state, {
                animationData: {
                    blockingAnimations: state.animationData.blockingAnimations - 1,
                    pageTransitionActive: state.animationData.pageTransitionActive
                }
            });
        }
        case siteData.ActionTypes.SET_TRANSITION: {
            return Object.assign({}, state, {
                animationData: {
                    blockingAnimations: state.animationData.blockingAnimations,
                    pageTransitionActive: action.payload
                }
            });
        }
        case siteData.ActionTypes.SET_ADMIN: {
            return Object.assign({}, state, {
                adminMode: true
            });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=site-data.reducer.js.map