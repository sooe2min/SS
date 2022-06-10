import React, { useEffect, useState } from 'react'
import MusicPlayer from '../../../components/MusicPlayer'
import MusicInfo from '../../../components/MusicPlayer/MusicInfo'
import MusicVideo from '../../../components/MusicVideo'
import useGetRouter from '../../../hooks/useGetRouter'
import { TrackI } from '../../../types'

export default function PlayListPage() {
	const { query } = useGetRouter()
	const [track, setTrack] = useState<TrackI>()

	const getTrack = async () => {
		if (query && query.slug) {
			const response = await fetch(
				`http://localhost:1337/api/tracks/${query.slug[0]}`
			)

			if (response.ok) {
				const { data } = await response.json()
				setTrack(prev => ({
					...prev,
					attributes: data?.attributes,
					id: data?.id
				}))
			} else {
				alert('HTTP-Error: ' + response.status)
			}
		}
	}

	useEffect(() => {
		getTrack()
	}, [query])

	return (
		<>
			<MusicVideo video_id={track?.attributes?.video_id} />
			<MusicPlayer>
				<MusicInfo
					cover_url={track?.attributes?.cover_url}
					track_name={track?.attributes?.track_name}
					artists={track?.attributes?.artists}
				/>
			</MusicPlayer>
		</>
	)
}
