import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import MusicVideo from '../../../components/MusicVideo'
import Playlist from '../../../components/Playlist'
import useGetRouter from '../../../hooks/useGetRouter'
import { TrackI } from '../../../types'

export default function PlayListPage() {
	const { query } = useGetRouter()
	const [tracks, setTracks] = useState<TrackI[]>([])
	const [track, setTrack] = useState<TrackI>()

	useEffect(() => {
		async function getTracks() {
			const response = await fetch('http://localhost:1337/api/tracks')

			if (response.ok) {
				const { data } = await response.json()
				setTracks(prev => [...prev, ...data])
			} else {
				alert('HTTP-Error: ' + response.status)
			}
		}

		getTracks()
	}, [])

	useEffect(() => {
		async function getTrack() {
			if (query && query.slug) {
				const trackBySlug = await tracks.filter(track => {
					if (query && query.slug) {
						return track.attributes?.video_id === query.slug[0]
					}
				})[0]

				setTrack(prev => ({
					...prev,
					attributes: trackBySlug?.attributes,
					id: trackBySlug?.id
				}))
			}
		}

		getTrack()
	}, [tracks])

	return (
		<>
			<Header />
			<MusicVideo attributes={track?.attributes} id={track?.id} />
			<Playlist tracks={tracks}></Playlist>
		</>
	)
}
