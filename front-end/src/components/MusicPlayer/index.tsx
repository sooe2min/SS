import React, { useState } from 'react'
import { Children } from '../../types'
import Playlist from '../Playlist'
import MusicMenu from './MusicMenu'

export default React.memo(function MusicPlayer({ children }: Children) {
	const [showPlayList, setShowPlayList] = useState(false)

	const handleClick = () => {
		setShowPlayList(prev => !prev)
	}

	return (
		<div className="md:h-[8.6vh] h-[8.5vh] border-t-[#4b4b4b] bg-[#191919] px-10 flex justify-between items-center fixed bottom-0 w-full">
			{children}
			<MusicMenu onClick={handleClick} />
			<Playlist showPlayList={showPlayList} />
		</div>
	)
})
