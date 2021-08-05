import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

interface CustomSearchBoxProps {
	refine: any
}

const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({ refine }) => {
	return (
		<div className="relative flex">
			<svg
				className="absolute text-yellow-200 w-7 h-7 top-7 left-4"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<input
				className="w-full px-16 text-lg outline-none py-7"
				autoFocus
				type="search"
				placeholder="search"
				onChange={e => refine(e.currentTarget.value)}
			/>
		</div>
	)
}

export default connectSearchBox(CustomSearchBox)
