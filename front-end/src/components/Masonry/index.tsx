import React, { useEffect, useState } from 'react'
import { TrackI } from '../../types'
import Brick from './brick'

export default function Masonry() {
	const [tracks, setTracks] = useState<TrackI[]>([])

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

	return (
		<main>
			<div className="grid md:grid-cols-2 lg:grid-cols-[repeat(4,_1fr)]">
				{tracks &&
					tracks.map(track => (
						<Brick key={track.id} videoId={track.attributes!.video_id} />
					))}
			</div>
		</main>
	)
}
