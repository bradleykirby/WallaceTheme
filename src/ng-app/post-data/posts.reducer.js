import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import * as posts from './posts.actions';
var initialPosts = walInitialState.posts;
var initialState = {
    ids: initialPosts.map(function (post) { return post.id; }),
    entities: getPostEntitiesFromPostArray(initialPosts),
    selectedPostId: walInitialState.selectedPostId,
    loadingPostPreviews: false,
    featuredPostLoaded: false,
    currentAPIPage: 1,
    allPostPreviewsLoaded: false,
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case posts.ActionTypes.SELECT_POST: {
            return Object.assign({}, state, {
                selectedPostId: action.payload.id
            });
        }
        case posts.ActionTypes.LOAD_POST_PREVIEWS: {
            return Object.assign({}, state, {
                loadingPostPreviews: true
            });
        }
        case posts.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE: {
            var posts_1 = action.payload;
            var newPosts = posts_1.filter(function (post) { return !state.entities[post.id]; }).map(function (post) {
                return Object.assign({}, post, { loadedAfterBootstrap: true });
            });
            var featuredPostIncluded = posts_1.filter(function (post) { return post.featured; }).length > 0 ? true : false;
            var newPostIds = newPosts.map(function (post) { return post.id; });
            var newPostEntities = newPosts.reduce(function (entities, post) {
                return Object.assign(entities, (_a = {},
                    _a[post.id] = post,
                    _a));
                var _a;
            }, {});
            return {
                ids: state.ids.concat(newPostIds),
                entities: Object.assign({}, state.entities, newPostEntities),
                selectedPostId: state.selectedPostId,
                loadingPostPreviews: false,
                featuredPostLoaded: state.featuredPostLoaded ? true : featuredPostIncluded,
                currentAPIPage: state.currentAPIPage + 1,
                allPostPreviewsLoaded: false
            };
        }
        case posts.ActionTypes.ALL_POST_PREVIEWS_LOADED: {
            return Object.assign({}, state, {
                loadingPostPreviews: false,
                allPostPreviewsLoaded: true
            });
        }
        case posts.ActionTypes.LOAD_POST_CONTENT: {
            var idOfPostToLoad = action.payload.id;
            var content = action.payload.content;
            var postEntityToUpdate = state.entities[idOfPostToLoad];
            var updatedPost = Object.assign({}, postEntityToUpdate, { content: content, contentLoaded: true });
            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, (_a = {},
                    _a[idOfPostToLoad] = updatedPost,
                    _a))
            });
        }
        default: {
            return state;
        }
    }
    var _a;
}
function getPostEntitiesFromPostArray(posts) {
    return posts.reduce(function (entities, post) {
        return Object.assign(entities, (_a = {},
            _a[post.id] = post,
            _a));
        var _a;
    }, {});
}
//# sourceMappingURL=posts.reducer.js.map