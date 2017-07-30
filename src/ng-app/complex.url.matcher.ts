import { UrlSegment, UrlSegmentGroup, Route } from '@angular/router';

export function ComplexUrlMatcher(paramName: string, regex: RegExp) {

    return (
        segments: UrlSegment[],
        segmentGroup: UrlSegmentGroup,
        route: Route) => {

        const posParams: { [key: string]: UrlSegment } = {};
        const consumed: UrlSegment[] = [];

        let currentIndex = 0,
        	path = segments.join('/');
        	
        if (!regex.test(path)) {
            return null;
        }
        
        segments.forEach( (seg, index) => {
        	if (index >= segments.length) {
                return null;
            }
            const current = segments[index];

            posParams[paramName] = current;
            consumed.push(current);
        });

        if (route.pathMatch === 'full' &&
            (segmentGroup.hasChildren() || currentIndex < segments.length)) {
            return null;
        }

        return { consumed, posParams };
    }
}