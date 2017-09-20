


export interface Post {
	id: string,
	title: string,
	excerpt: string,
	featured: boolean,
	categoryString: string,
	content: string,
	contentLoaded: boolean,
	date: string,
	path: string,
	imageURLLowRes: string,
	imageURLHiRes: string,
	itemVisible: string,
	navigatingTo: boolean,
	loadedAfterBootstrap: boolean,
	newTitle: string,
	newExcerpt: string,
	newImageURL: string,
	newImageSources: {loRes: string, hiRes: string},
	newImageUploadProgress: number,
	editing: {active: boolean, target: string, error: string}
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