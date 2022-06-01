export interface AttributesI {
	album_name: string
	artists: string
	cover_hash: string
	createdAt: string
	name: string
	publishedAt: string
	release_date: string
	updatedAt: string
	video_url: string
}

export interface TrackI {
	attributes: AttributesI
	id: number
}

export interface IPost {
	[key: string]: string
}
