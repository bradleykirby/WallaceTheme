import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import { combineLatest } from 'rxjs/observable/combineLatest';
export function getPostEntities(posts$) {
    return posts$.select(function (posts) { return posts.entities; });
}
export function getPostIds(posts$) {
    return posts$.select(function (posts) { return posts.ids; });
}
export function getPosts(posts$) {
    return combineLatest(posts$.let(getPostEntities), posts$.let(getPostIds))
        .map(function (_a) {
        var entities = _a[0], ids = _a[1];
        return ids.map(function (id) { return entities[id]; });
    });
}
export function getSelectedPost(posts$) {
    return combineLatest(posts$.let(getPostEntities), posts$.let(getSelectedPostId))
        .map(function (_a) {
        var entities = _a[0], id = _a[1];
        return entities[id];
    });
}
export function getPostPreviewsLoadingStatus(posts$) {
    return posts$.select(function (posts) { return posts.loadingPostPreviews; });
}
export function getCurrentAPIPage(posts$) {
    return posts$.select(function (posts) { return posts.currentAPIPage; });
}
export function getAllPostPreviewsLoadedStatus(posts$) {
    return posts$.select(function (posts) { return posts.allPostPreviewsLoaded; });
}
export function getSelectedPostId(posts$) {
    return posts$.select(function (posts) { return posts.selectedPostId; });
}
export function getFeaturedPostLoaded(posts$) {
    return posts$.select(function (posts) { return posts.featuredPostLoaded; });
}
export function getPostsLoading(posts$) {
    return posts$.select(function (posts) { return posts.loadingPostPreviews; });
}
//# sourceMappingURL=posts.selectors.js.map