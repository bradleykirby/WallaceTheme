import '@ngrx/core/add/operator/select';
export function getSiteIconSrc(siteData$) {
    return siteData$.select(function (siteData) { return siteData.iconUrl; });
}
export function getSiteTitle(siteData$) {
    return siteData$.select(function (siteData) { return siteData.title; });
}
export function getRoutes(siteData$) {
    return siteData$.select(function (siteData) { return siteData.routes; });
}
export function getAnimationData(siteData$) {
    return siteData$.select(function (siteData) { return siteData.animationData; });
}
export function getPathToIndex(siteData$) {
    return siteData$.select(function (siteData) { return siteData.pathToIndex; });
}
//# sourceMappingURL=site-data.selectors.js.map