import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Playlist() {
	const [tracks, setTracks] = useState<any>([])

	useEffect(() => {
		async function getTracks() {
			const response = await fetch('http://localhost:1337/api/tracks')

			if (response.ok) {
				const tracks = await response.json()
				setTracks(tracks)
				console.log(tracks)
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
				{tracks.data &&
					tracks.data.map(track => {
						const { cover_hash } = track.attributes
						return (
							<Image
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
