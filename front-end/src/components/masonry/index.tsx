import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TrackI } from '../../types'

export default function Masonry() {
	const [tracks, setTracks] = useState<TrackI[]>([])

	useEffect(() => {
		async function getTracks() {
			const response = await fetch('http://localhost:1337/api/tracks')

			if (response.ok) {
				const { data } = await response.json()
				setTracks(data)
			} else {
				alert('HTTP-Error: ' + response.status)
			}
		}

		getTracks()
	}, [])

	return (
		<main>
			<div className="grid md:grid-cols-4 lg:grid-cols-7">
				{tracks &&
					tracks.map(track => {
						const { cover_hash } = track.attributes
						return (
							<Image
								src={`http://localhost:1337/uploads/${cover_hash}`}
								layout="responsive"
								width="100%"
								height="100%"
							/>
						)
					})}
			</div>
		</main>
	)
}
