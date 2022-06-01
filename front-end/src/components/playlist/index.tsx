import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TrackI } from '../../types'

export default function Playlist() {
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
			{}
			<div className="grid grid-cols-7 m-auto items-center">
				{tracks &&
					tracks.map(track => {
						const { cover_hash } = track.attributes
						return (
							<Image
								key={track.id}
								src={`http://localhost:1337/uploads/${cover_hash}`}
								width="280px"
								height="280px"
							/>
						)
					})}
			</div>
		</main>
	)
}
