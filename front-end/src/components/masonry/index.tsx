import Image from 'next/image'
import Link from 'next/link'
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
			<div className="grid md:grid-cols-2 lg:grid-cols-[repeat(4,_1fr)]">
				{tracks &&
					tracks.map(track => {
						const { video_id } = track.attributes
						return (
							<Link key={track.id} href="/">
								<a className="relative group">
									<Image
										className="group-hover:blur-[2px]"
										src={`https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`}
										layout="responsive"
										width="160%"
										height="90%"
									/>
									<svg
										className="absolute w-2/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4.79 2.093A.5.5 0 004 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5z"
											fill="currentColor"
											stroke-linejoin="round"></path>
									</svg>
								</a>
							</Link>
						)
					})}
			</div>
		</main>
	)
}
