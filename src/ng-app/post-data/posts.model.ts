
export interface Post {
	id: string,
	title: string,
	excerpt: string,
	featured: boolean,
	content: string,
	contentLoaded: boolean,
	date: string,
	path: string,
	imageURLLowRes: string,
	imageURLHiRes: string,
	itemVisible: string,
	navigatingTo: boolean	
}

export interface Posts {
	ids: string[],
	entities: { [id: string]: Post},
	selectedPostId: string | null,
	loadingPostPreviews: boolean,
	featuredPostLoaded: boolean,
	currentAPIPage: number,
	allPostPreviewsLoaded: boolean
}