import React from 'react'
import Logo from './logo'
import Nav from './nav'

export default function Header() {
	return (
		<header>
			<div className="h-[160px] max-w-[700px] m-auto flex items-center justify-between text-[20px]">
				<Logo />
				<Nav />
			</div>
		</header>
	)
}
