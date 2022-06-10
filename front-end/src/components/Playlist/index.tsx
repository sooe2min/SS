import { useEffect, useState } from 'react'
import { TrackI } from '../../types'
import PlayListInfo from './PlayListInfo'

export default function Playlist({
	showPlayList
}: {
	showPlayList: boolean
}) {
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
		<div
			className={`flex bg-[#111] fixed inset-0 bottom-[8vh] z-20 h-[calc(100%-8vh)] overflow-y-scroll ${
				showPlayList ? 'visible' : 'hidden'
			}`}>
			<section className="cover_section"></section>
			<section className="playlist_section">
				<div className="p-10">
					<div className="pb-3">
						<h2 className="text-white text-[20px] font-bold">PLAYLIST</h2>
					</div>
					<ul className="flex flex-col">
						{tracks &&
							tracks.map(track => {
								return (
									<PlayListInfo
										attributes={track.attributes}
										id={track.id}
									/>
								)
							})}
					</ul>
				</div>
			</section>
		</div>
	)
}
