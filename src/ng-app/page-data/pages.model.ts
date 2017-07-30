export interface Page {
	id: string,
	title: string,
	excerpt: string,
	featured: boolean,
	//categoryString: string,
	content: string,
	contentLoaded: boolean,
	date: string,
	path: string,
	imageURLLowRes: string,
	imageURLHiRes: string,
	itemVisible: string,
	navigatingTo: boolean,
	loadedAfterBootstrap: boolean,
	newImageURL: string,
	newImageSources: {loRes: string, hiRes: string},
	newImageUploadProgress: number,
	editing: {active: boolean, target: string, error: string}
}

export interface Pages {
	ids: string[],
	entities: { [id: string]: Page },
	selectedPageId: string | null,
	loadingPagePreviews: boolean,
	featuredPageLoaded: boolean,
	currentAPIPage: number,
	allPagePreviewsLoaded: boolean
}