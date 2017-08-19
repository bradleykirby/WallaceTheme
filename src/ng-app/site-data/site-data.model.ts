import { Route } from '@angular/router';

export interface SiteData {
	title: string,
	iconUrl: string,
	routes: Route[],
	animationData: AnimationData,
	pathToIndex: string,
	isAdmin: boolean,
	adminModeActive: boolean,
	editModeActive: boolean,
	menus: {id: number, parent: number, title: string}[],
	frontPage: number,
	blogPage: number
}

export interface AnimationData {
	pageTransitionActive: boolean,
	blockingAnimations: number

}