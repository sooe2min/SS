import React, { useEffect, useState } from 'react'
import MusicPlayer from '../../../components/MusicPlayer'
import MusicInfo from '../../../components/MusicPlayer/MusicInfo'
import MusicMenuButton from '../../../components/MusicPlayer/MusicMenuButton'
import MusicVideo from '../../../components/MusicVideo'
import Playlist from '../../../components/Playlist'
import useGetRouter from '../../../hooks/useGetRouter'
import { TrackI } from '../../../types'

export default function PlayListPage() {
	const { query } = useGetRouter()
	const [track, setTrack] = useState<TrackI>()
	const [isPlayList, setIsPlayList] = useState(false)

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

	const handleClick = () => {
		setIsPlayList(true)
	}

	useEffect(() => {
		getTrack()
	}, [])

	return (
		<>
			{/* <Header /> */}
			<MusicVideo />
			{isPlayList ? (
				<Playlist />
			) : (
				<MusicPlayer>
					<MusicInfo attributes={track?.attributes} id={track?.id} />
					<MusicMenuButton onClick={handleClick} />
				</MusicPlayer>
			)}
		</>
	)
}
