import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Brick({
	trackId,
	videoId
}: {
	trackId: number | undefined
	videoId: string
}) {
	return (
		<Link href={`/playlist/${trackId}/${videoId}`}>
			<a className="relative group">
				<Image
					className="group-hover:blur-[2px]"
					src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
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
						strokeLinejoin="round"></path>
				</svg>
			</a>
		</Link>
	)
}
