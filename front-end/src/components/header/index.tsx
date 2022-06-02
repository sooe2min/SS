import React from 'react'
import Logo from './logo'
import Nav from './nav'

export default function Header() {
	return (
		<header>
			<div className="h-[160px] max-w-[700px] m-auto flex justify-center text-[20px] md:items-center md:justify-between">
				<Logo />
				<Nav />
			</div>
		</header>
	)
}
