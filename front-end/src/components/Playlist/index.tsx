import { useEffect, useState } from 'react'
import useGetRouter from '../../hooks/useGetRouter'
import { TrackI } from '../../types'
import PlayListInfo from './PlayListInfo'

export default function Playlist({
	showPlayList
}: {
	showPlayList: boolean
}) {
	const { query } = useGetRouter()
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
			className={`bg-[#111] fixed inset-0 bottom-[8vh] z-20 h-[calc(100%-8vh)] overflow-y-scroll ${
				showPlayList ? 'md:flex' : 'hidden'
			}`}>
			<section className="md:visible cover_section hidden"></section>
			<section className="playlist_section">
				<div className="py-10">
					<div className="pb-3 px-8">
						<h2 className="md:text-[20px] text-white text-[24px] font-bold">
							PLAYLIST
						</h2>
					</div>
					<ul className="flex flex-col">
						{tracks &&
							tracks.map(track => {
								return (
									<PlayListInfo
										slug={query.slug && query.slug[0]}
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
