import React from 'react'
import Logo from './logo'
import Nav from './nav'

export default function Header() {
	return (
		<header className="sticky top-0 z-[10] text-[22px]">
			<div className="h-[170px] max-w-[700px] m-auto flex items-center justify-between">
				<Logo />
				<Nav />
			</div>
		</header>
	)
}
