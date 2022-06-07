import { ReactNode } from 'react'

export interface ChildrenI {
	children: ReactNode
}

export interface AttributesI {
	album_name: string
	artists: string
	cover_hash: string
	cover_url: string
	createdAt: string
	name: string
	publishedAt: string
	release_date: string
	updatedAt: string
	video_id: string
}

export interface TrackI {
	attributes: AttributesI | undefined
	id: number | undefined
}

export interface TracksI {
	tracks: TrackI[]
}

export interface IPost {
	[key: string]: string
}
