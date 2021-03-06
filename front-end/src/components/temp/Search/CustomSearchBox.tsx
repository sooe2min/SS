import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

interface CustomSearchBoxProps {
	refine: any
}

const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({ refine }) => {
	return (
		<div className="relative flex">
			<svg
				className="absolute text-yellow-200 w-[28px] h-[28px] top-[28px] left-[16px]"
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
				className="w-full px-[64px] text-[20px] outline-none py-[28px]"
				autoFocus
				type="search"
				placeholder="search"
				onChange={e => refine(e.currentTarget.value)}
			/>
		</div>
	)
}

export default connectSearchBox(CustomSearchBox)
