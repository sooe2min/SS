import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import MusicVideo from '../../../components/MusicVideo'
import useGetRouter from '../../../hooks/useGetRouter'
import { TrackI } from '../../../types'

export default function PlayListPage() {
	const { query } = useGetRouter()
	const [track, setTrack] = useState<TrackI>()

	useEffect(() => {
		async function getTrack() {
			let trackId
			if (query && query.slug) {
				trackId = +query.slug[0]
			}

			const response = await fetch(
				`http://localhost:1337/api/tracks/${trackId}`
			)

			if (response.ok) {
				const { data } = await response.json()

				setTrack(prev => ({
					...prev,
					attributes: data.attributes,
					id: data.id
				}))
			} else {
				alert('HTTP-Error: ' + response.status)
			}
		}

		getTrack()
	}, [])

	return (
		<>
			<Header />
			<MusicVideo attributes={track?.attributes} id={track?.id} />
			{/* <Playlist tracks={tracks}></Playlist> */}
		</>
	)
}
