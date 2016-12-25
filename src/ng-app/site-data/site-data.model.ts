import { Route } from '@angular/router';

export interface SiteData {
	title: string,
	iconUrl: string,
	routes: Route[],
	animationData: AnimationData,
	pathToIndex: string
	
}

export interface AnimationData {
	pageTransitionActive: boolean,
	blockingAnimations: number

}