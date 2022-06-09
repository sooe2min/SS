import React from 'react'
import { Children } from '../../types'

export default function MusicPlayer({ children }: Children) {
	return (
		<div className="border-t bg-[#191919] px-10 flex justify-between items-center fixed bottom-0 w-full h-[8vh]">
			{children}
		</div>
	)
}
